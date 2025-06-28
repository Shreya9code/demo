"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic2, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";

const StartInterview = () => {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  console.log("interviewInfo", interviewInfo);
  const [conversation, setConversation] = useState();
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);
  const startCall = () => {
    const questionList = interviewInfo.interviewData.questionList
      .map((item) => item.question)
      .join(", ");
    console.log(questionList);
    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo.interviewData.jobPosition +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "vapi",
        voiceId: "Elliot", // or "olivia", "noah", "sophia"
      },
      model: {
        provider: "openrouter",
        model: "google/gemini-1.5-flash",
        messages: [
          {
            role: "system",
            content:
              `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ` +
              interviewInfo.interviewData.jobPosition +
              ` interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are
the questions ask one by one:
Questions: ` +
              questionList +
              `
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging-use casual phrases like "Alright, next up ... " or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
Be friendly, engaging, and witty
Keep responses short and natural, Like a real conversation
Adapt based on the candidate's confidence level
Ensure the interview remains focused on React`.trim(),
          },
        ],
      },
    };
    console.log("Sending to Vapi:", JSON.stringify(assistantOptions, null, 2));
    vapi.start(assistantOptions);
    console.log("Call started with options", assistantOptions);
  };

  vapi.on("call-start", () => {
    console.log("Call started");
    toast("Call started");
  });
  vapi.on("speech-start", () => {
    console.log("Assistant speech started");
    setActiveUser(false);
  });
  vapi.on("speech-end", () => {
    console.log("Assistant speech ended");
    setActiveUser(true);
  });
  vapi.on("call-end", (data) => {
    console.log("Call ended", data);

    if (data?.conversation) {
      setConversation(data.conversation);
    }

    toast("Interview ended");
  });
  vapi.on("message", (message) => {
    console.log("Full message object", message);

    if (message?.conversation) {
      setConversation(message.conversation);
    } else {
      console.warn("Conversation data missing in message");
    }
  });
  const stopInterview = () => {
    vapi.stop();
  };
  const generateFeedback = async () => {
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });
    console.log(result.data);
    const Content = result.data.content;
    const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
    console.log(FINAL_CONTENT);
  };
  return (
    <div className="flex flex-col items-center p-4 space-y-6 text-center">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Timer /> 00:00:00
      </h2>

      <div className="flex items-center justify-center gap-10">
        <div className="flex flex-col items-center">
          {!activeUser && (
            <span className="absolute animate-spin rounded-full border-2 border-blue-500 border-t-transparent w-5 h-5" />
          )}
          <Image
            src="/ai.webp"
            width={100}
            height={100}
            alt="AI Avatar"
            className="rounded-full"
          />
          <h2 className="text-lg font-medium mt-2">AI Recruiter</h2>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src="/ai.webp"
            width={100}
            height={100}
            alt="AI Avatar"
            className="rounded-full"
          />
          <h2 className="text-lg font-medium">{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex gap-4 text-blue-600">
        <Mic2 size={28} className="cursor-pointer hover:text-blue-800" />
        <AlertConfirmation stopInterview={() => stopInterview()}>
          <Phone size={28} className="cursor-pointer hover:text-red-500" />
        </AlertConfirmation>
      </div>

      <h2 className="text-md text-gray-600 italic">Interview in progress...</h2>
    </div>
  );
};

export default StartInterview;
