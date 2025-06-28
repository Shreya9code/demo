"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [interview_id, setInterviewId] = useState();
  const [formData, setFormData] = useState({
    jobPosition: "",
    jobDescription: "",
    duration: "",
    type: [],
  });
  const onHandleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      return newData;
    });
  };

  // Add this useEffect to log the formData after it updates
  useEffect(() => {
    console.log("FormData:", formData);
  }, [formData]);
  const onGoToNext=()=>{
    if(formData.length<=3){
toast.error("Please fill all the fields before proceeding.");
      return;
    }setStep(step+1)
  }
const [questionCount, setQuestionCount] = useState(0);

const onCreateLink = (interview_id, count) => {
  setInterviewId(interview_id);
  setQuestionCount(count);
  setStep(step + 1);
};

  return (
    <div>
      <div>
        <ArrowLeft
          className="w-6 h-6 text-gray-500 cursor-pointer"
          onClick={() => router.back()}
        />
        <h2 className="text-2xl font-semibold text-center mt-8">
          Create a New Interview
        </h2>
        <p className="text-center">
          Fill out the form below to schedule a new interview.
        </p>
        <Progress value={step * 30} />
        {step==1?<FormContainer onHandleInputChange={onHandleInputChange}
          GoToNext={() => onGoToNext()}
         />:step==2?<QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> :
         step==3?<InterviewLink interviewId={interview_id} formData={formData} questionCount={questionCount}/>
         :null}
      </div>
    </div>
  );
}

export default CreateInterview;
