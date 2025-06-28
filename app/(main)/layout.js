import React from 'react'
import DashboardProvider from './provider'

function DashboardLayout({children}) {
  return (
    <div>
      <DashboardProvider>
        <div className='p-5'>{children}</div>
      </DashboardProvider>
    </div>
  )
}

export default DashboardLayout
