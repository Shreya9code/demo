import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/app/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function FormContainer({onHandleInputChange,GoToNext}) {
  const [interviewType,setInterviewType]=useState([])
  
  useEffect(()=>{
    if(interviewType){
      onHandleInputChange('type',interviewType)
    }
  },[interviewType])

    const AddInterviewType=(type) => {
    const data=interviewType.includes(type)
    if(!data){
      setInterviewType(prev=>[...prev, type])
    }else{
      const result=interviewType.filter((item) => item !== type);
      setInterviewType(result)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Interview Setup</h1>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Job Position</label>
          <Input
            type="text"
            placeholder="e.g. Frontend Developer, Product Manager"
            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) =>onHandleInputChange('jobPosition', e.target.value)} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Job Description</label>
          <Textarea
            placeholder="Describe the role and responsibilities..."
            className="w-full min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) =>onHandleInputChange('jobDescription', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Interview Duration</label>
          <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
            <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="1">1 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Interview Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {InterviewType.map((type, index) => (
              <div 
                key={index} 
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => AddInterviewType(type.title)}
              >
                <type.icon className="w-5 h-5 mr-3 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{type.title}</span>
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        onClick={()=>GoToNext()}
        >
          Generate Questions<ArrowRight/>
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;