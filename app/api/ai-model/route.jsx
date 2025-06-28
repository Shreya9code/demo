import { Question_PROMPT } from "@/app/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";
function cleanJsonResponse(content) {
  // Remove Markdown code block markers if present
  return content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}
export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();
  if (!jobPosition || !jobDescription) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const FINAL_PROMPT = Question_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);
  console.log("FINAL_PROMPT", FINAL_PROMPT);
  console.log("API Key:", process.env.OPENROUTER_API_KEY);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.NEXT_PUBLIC_APP_TITLE || "my-test-app",
      },
    });
    console.log("API Key in try:", process.env.OPENROUTER_API_KEY);

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528:free", //"google/gemini-2.5-pro-exp-03-25:free", //"${Model.GPT_4_Omni}",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      response_format: "json",
    });
    //console.log("completion", completion);
    console.log(completion.choices[0].message);
    // Parse the content if it's a JSON string
    let content;
    try {
      const rawContent = completion.choices[0].message.content;
      const cleanedContent = cleanJsonResponse(rawContent);
      content = JSON.parse(cleanedContent);
    } catch (e) {
      console.error("Error parsing content:", e);
      content = {
        error: "Failed to parse response",
        rawResponse: completion.choices[0].message.content,
      };
    }
    return NextResponse.json(content);

    //return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(error);
  }
}
