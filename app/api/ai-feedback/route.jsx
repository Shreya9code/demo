import { FEEDBACK_PROMPT } from "@/app/services/Constants";
import OpenAI from "openai";

export async function POST(req) {
  const { conversation } = await req.json();
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );
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
    console.log("OpenRouter API Key in try:", process.env.OPENROUTER_API_KEY);

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528:free", //"google/gemini-2.5-pro-exp-03-25:free", //"${Model.GPT_4_Omni}",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      response_format: "json",
    });
    console.log(completion.choices[0].message);
        return NextResponse.json(completion.choices[0].message);

  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(error);
  }
}
