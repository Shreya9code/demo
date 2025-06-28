import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Copy,
  CheckCircle,
  List,
  Mail,
  ArrowBigLeft,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const InterviewLink = ({ interviewId, formData, questionCount }) => {
  const [isCopied, setIsCopied] = useState(false);
  const getInterviewUrl = () => {
    return `${process.env.NEXT_PUBLIC_HOST_URL}/interview/${interviewId}`;
  };//http://localhost:3000/interview/interview/53933b12-d3cd-4c84-bd21-309599ada169

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getInterviewUrl());
    toast.success("Link copied to clipboard!");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex flex-col items-center">
        <Image
          src="/check.webp"
          alt="Success checkmark"
          width={160}
          height={160}
          className="mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
          Interview Created Successfully!
        </h2>
        <p className="text-center mb-8 text-gray-600 max-w-lg">
          Your interview has been created successfully. Share the link below
          with your candidate.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Interview Link
          </h3>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <Clock className="w-4 h-4" />
            Valid for 30 days
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <Input
            value={getInterviewUrl()}
            readOnly
            className="flex-1 bg-gray-50 border-gray-200"
          />
          <Button
            onClick={copyToClipboard}
            className="gap-2 transition-colors"
            variant={isCopied ? "success" : "default"}
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
        <hr />
        <div className="flex justify-center items-center gap-2 text-gray-700">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>Duration: {formData.duration} minutes</span>
        </div>
        <div className="flex justify-center items-center gap-2 text-gray-700">
          <List className="w-5 h-5 text-gray-500" />
<span>Questions: {questionCount}</span>
        </div>
      </div>
      <div>
        <h2>Share Via</h2>
        <Button>
          <Mail />
          Email
        </Button>
        <Button>
          <Mail />
          Slack
        </Button>
        <Button>
          <Mail /> Whatsapp
        </Button>
      </div>
      <div>
        <Button><Link href="/dashboard">
          <ArrowBigLeft />
          Back to Dashboard</Link>
        </Button>
        <Button><Link href="/dashboard/create-interview">
          <Plus />
          Create New Interview</Link>
        </Button>
      </div>
      {isCopied && (
        <div className="mt-4 text-center text-sm text-green-600 animate-fade-in">
          Link copied to clipboard!
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        Need help? Contact our support team.
      </div>
    </div>
  );
};

export default InterviewLink;
