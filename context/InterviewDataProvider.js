// context/InterviewDataProvider.js
"use client";
import React, { useState } from "react";
import { InterviewDataContext } from "./InterviewDataContext";

export const InterviewDataProvider = ({ children }) => {
  const [interviewInfo, setInterviewInfo] = useState(null);

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      {children}
    </InterviewDataContext.Provider>
  );
};
