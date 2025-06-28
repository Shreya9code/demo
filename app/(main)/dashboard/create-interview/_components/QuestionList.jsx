import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/app/services/supabaseClient";
function QuestionList({ formData,onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);
  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/ai-model", formData);

      // Handle both raw and cleaned responses
      let questions;
      if (typeof data === "string") {
        try {
          // Clean Markdown formatting if present
          const cleanedData = data
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          questions = JSON.parse(cleanedData);
        } catch (parseError) {
          console.error("Failed to parse response:", parseError);
          throw new Error("Received malformed questions data");
        }
      } else {
        questions = data;
      }
      // Validate the response structure
      if (!questions?.interviewQuestions) {
        throw new Error("Unexpected response format");
      }
      console.log("Generated Questions:", questions.interviewQuestions);
      setQuestionList(questions.interviewQuestions);
    } catch (error) {
      console.error("Error generating questions:", error);
      //setError(error.message);
      toast.error(error.message || "Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };
  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user.email,
          interview_id: interview_id,
        },
      ])
      .select();
    console.log("Inserted Interview Data:", data);
    setSaveLoading(false);
    onCreateLink(interview_id, questionList.length);
    toast.success("Interview questions generated successfully!");
  };
  return (
    <div className="p-4">
      {loading ? (
        <div className="flex items-center justify-center h-screen space-x-4">
          <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Generating Questions...
            </h2>
            <p className="text-sm text-gray-500">
              Please wait while we generate the interview questions based on
              your input.
            </p>
          </div>
        </div>
      ) : (
        questionList.length > 0 && (
          <div className="mt-8">
            <QuestionListContainer questionList={questionList} />
          </div>
        )
      )}
      <div>
        <Button onClick={() => onFinish()}>
          {saveLoading ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : null}
          {saveLoading ? "Saving..." : "Create Interview Link & Finish"}
        </Button>
      </div>
    </div>
  );
}

export default QuestionList;
