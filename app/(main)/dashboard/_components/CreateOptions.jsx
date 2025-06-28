import { Phone, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

function CreateOptions() {
  return (
    <div 
    className="flex flex-col items-center justify-center bg-gray-50 px-4"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Choose Interview Type
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        <div className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer border border-gray-200 hover:border-indigo-500">
        <Link href="/dashboard/create-interview"
        className="flex flex-col items-center justify-center w-full h-full"
        >
            <Video className="w-12 h-12 text-blue-600 mb-4" />
          <span className="text-xl font-semibold text-gray-700">Video Interview</span>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Conduct face-to-face interviews with real-time video.
          </p></Link>
        </div>

        <div className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer border border-gray-200 hover:border-indigo-500">
            <Phone className="w-12 h-12 text-blue-600 mb-4" />
          <span className="text-xl font-semibold text-gray-700">Phone Screening</span>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Quick audio-based screening for initial candidate check.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateOptions;
