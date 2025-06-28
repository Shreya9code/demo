"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Info, Loader2Icon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/app/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { useRouter } from "next/navigation";

const InterviewId = () => {
  const params = useParams();
  const interview_id = params?.interview_id;
  console.log("Interview ID:", interview_id);

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();
  useEffect(() => {
    if (interview_id) {
      getInterviewDetails(interview_id);
    }
  }, [interview_id]);
  const getInterviewDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("jobPosition, jobDescription, duration")
        .eq("interview_id", interview_id)
        .single();

      if (error || !data) {
        console.error("Supabase Error:", error?.message);
        toast.error("Interview not found. Please check the ID.");
        setInterview(null);
      } else {
        console.log("Interview Data:", data);
        setInterview(data);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
      toast.error("Failed to fetch interview details. Please try again later.");
    }
    setLoading(false);
  };
  const onJoinInterview = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("interview_id", interview_id);
      const interviewData = data[0];

      setInterviewInfo({
        userName: userName,userEmail:userEmail,
        interviewData: interviewData,
      });

      console.log("Sending to strt interviewData", interviewData);
      router.push(`/interview/${interview_id}/start`);
    } catch (error) {
      console.error("Error joining interview:", error);
      toast.error("Failed to join the interview. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <Image
        src={"/logo.jpg"}
        alt="logo"
        width={100}
        height={100}
        className="mt-4"
      />
      <h1 className="text-3xl font-bold text-center mt-4">
        AI Powered Interview Portal
      </h1>

      <Image
        src={"/interview.jpg"}
        alt="interview"
        width={500}
        height={300}
        className="mt-6 rounded-xl shadow-md"
      />

      <h2 className="text-xl font-medium text-center mt-2 text-gray-700">
        Interview ID: {interview_id || "Loading..."}
      </h2>
      {interview && (
        <div className="mt-4 max-w-2xl text-gray-800">
          <h2 className="text-2xl font-semibold text-center mt-6">
            {interview?.jobPosition || "Loading..."}
          </h2>
          <p className="mb-2">
            <span className="font-semibold">Description:</span>{" "}
            {interview.jobDescription}
          </p>
          <p>
            <span className="font-semibold">Duration:</span>{" "}
            {interview.duration} minutes
          </p>
        </div>
      )}
      <div className="mt-6 w-full max-w-md text-center">
        <h2 className="text-lg font-semibold mb-2">Enter your full name</h2>
        <Input
          type="text"
          placeholder="Enter your full name"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          required
          className="w-full"
        />
      </div><div className="mt-6 w-full max-w-md text-center">
        <h2 className="text-lg font-semibold mb-2">Enter your email</h2>
        <Input
          type="text"
          placeholder="Enter your email"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
          required
          className="w-full"
        />
      </div>

      <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <div className="flex items-center mb-4 text-blue-600">
          <Info className="mr-2" />
          <h2 className="text-lg font-semibold">Instructions</h2>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Ensure you have a stable internet connection.</li>
          <li>Keep your microphone and camera ready for the interview.</li>
          <li>
            Be prepared to answer questions related to FullStack development.
          </li>
          <li>Maintain a professional demeanor throughout the interview.</li>
        </ul>
      </div>

      <Button
        className="w-full max-w-md mt-8 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
        disabled={loading || !userName}
        onClick={() => onJoinInterview()}
      >
        <Video className="w-5 h-5" /> {loading && <Loader2Icon />}Join Interview
      </Button>
    </div>
  );
};

export default InterviewId;
