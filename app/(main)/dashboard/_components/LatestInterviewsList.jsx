"use client";
import { Button } from '@/components/ui/button';
import { Camera, Plus, Video } from 'lucide-react';
import React, { useState } from 'react'

function LatestInterviewsList() {
    const [interviewList,setInterviewList]=useState([])
  return (
    <div>
      <h2 className='text-2xl font-semibold text-center mt-8'>Latest Interviews</h2>
      <p className='text-center mt-4'>Here you can view your latest interviews.</p>
{ interviewList.length==0 &&
<div className='flex flex-col items-center justify-center mt-8'>
  <Video className='w-16 h-16 text-gray-400 mb-4' />
    <p className='text-gray-500'>No interviews scheduled yet.</p>
    <Button><Plus/>Create new Interview</Button>
  </div>}
    </div>
  )
}

export default LatestInterviewsList
