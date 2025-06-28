import Image from 'next/image'
import React from 'react'

const InterviewHeader = () => {
  return (
    <div>
      <Image src={'/logo.jpg'} alt="logo" width={100} height={100} className='mx-auto mt-4' />
      <h1 className='text-3xl font-bold text-center mt-4'>Interview Portal</h1>
    </div>
  )
}

export default InterviewHeader
