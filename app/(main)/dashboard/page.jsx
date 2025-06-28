import React from 'react'
import WelComeContainer from './_components/WelComeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewsList from './_components/LatestInterviewsList'

function Dashboard() {
  return (
    <div>
      {/*<WelComeContainer/>*/}
      <h2 className='text-2xl font-semibold text-center mt-8'>Your Dashboard</h2>
      <p className='text-center'>Here you can manage your interviews, view schedules, and more.</p>
      <CreateOptions/>
      <LatestInterviewsList/>
    </div>
  )
}

export default Dashboard
