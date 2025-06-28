"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getSupabase = () => createServerComponentClient({ cookies });

export async function generateQuiz() {
  const supabase = getSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("🔒Unauthorized");

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("industry, skills")
    .eq("id", user.id)
    .single();

  if (userError || !userData) throw new Error("🚫User not found");

  const prompt = `
    Generate 10 technical interview questions for a ${userData.industry} professional${
    userData.skills?.length ? ` with expertise in ${userData.skills.join(", ")}` : ""
  }.

    Each question should be multiple choice with 4 options.

    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(text);

    return quiz.questions;
  } catch (error) {
    console.error("⚠️Error generating quiz:", error);
    throw new Error("❓Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const supabase = getSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("🔒Unauthorized");

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("industry")
    .eq("id", user.id)
    .single();

  if (userError || !userData) throw new Error("🚫User not found");

  const questionResults = questions.map((q, i) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[i],
    isCorrect: q.correctAnswer === answers[i],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${userData.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);
      improvementTip = tipResult.response.text().trim();
    } catch (error) {
      console.error("⚠️Error generating improvement tip:", error);
    }
  }

  try {
    const { data: result, error } = await supabase.from("assessment").insert([
      {
        user_id: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    ]).select().single();

    if (error) throw error;
    return result;
  } catch (error) {
    console.error("⚠️Error saving quiz result:", error);
    throw new Error("❌Failed to save quiz result");
  }
}

export async function getAssessments() {
  const supabase = getSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("🔒Unauthorized");

  try {
    const { data, error } = await supabase
      .from("assessment")
      .select("*")
      .eq("user_id", user.id)
      .order("createdAt", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("⚠️Error fetching assessments:", error);
    throw new Error("❌Failed to fetch assessments");
  }
}
