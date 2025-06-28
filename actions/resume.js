"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getSupabaseClient = () => createServerComponentClient({ cookies });

export async function saveResume(content) {
  const supabase = getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data: existing, error: fetchError } = await supabase
    .from("resume")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error checking existing resume:", fetchError);
    throw new Error("Error accessing resume");
  }

  let result;
  if (existing) {
    const { data, error } = await supabase
      .from("resume")
      .update({ content })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw new Error("Failed to update resume");
    result = data;
  } else {
    const { data, error } = await supabase
      .from("resume")
      .insert([{ content, user_id: user.id }])
      .select()
      .single();

    if (error) throw new Error("Failed to create resume");
    result = data;
  }

  revalidatePath("/resume");
  return result;
}

export async function getResume() {
  const supabase = getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("resume")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) throw new Error("Resume not found");
  return data;
}

export async function improveWithAI({ current, type }) {
  const supabase = getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data: userData, error } = await supabase
    .from("users")
    .select("*, industryInsight(*)")
    .eq("id", user.id)
    .single();

  if (error || !userData) throw new Error("User not found");

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${userData.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords

    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}
