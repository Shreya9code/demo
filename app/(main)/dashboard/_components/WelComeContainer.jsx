"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

function WelComeContainer() {
  const { user } = useUser();

  return (
    <div className=" flex flex-col items-center justify-center bg-white px-4">
      {user?.picture ? (
  <div className="mb-6">
    <Image
      src={user.picture}
      alt="User Avatar"
      width={80}
      height={80}
      className="rounded-full shadow-md"
    />
  </div>
) : null}


      <h1 className="text-4xl font-extrabold text-gray-800 mb-3 text-center">
        Welcome to <span className="text-indigo-600">AI Interview Scheduler</span>
      </h1>

      <p className="text-lg text-gray-600 mb-1">
        Hello, <span className="font-semibold">{user?.name }</span>!
      </p>

      <p className="text-md text-gray-500">You can schedule your interviews with ease.</p>
      <p className="text-md text-gray-500">Let's get started!</p>
    </div>
  );
}

export default WelComeContainer;
