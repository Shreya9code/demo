"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { supabase } from '../services/supabaseClient'

function Login() {
  const signInWithGoogle = async() => {
    const {error}=await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) {
      console.error('Error signing in with Google:', error.message)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full flex flex-col items-center">
        <Image src="/logo.jpg" alt="logo" width={80} height={80} className="mb-6 rounded-full shadow" />
        <Image src="/login.jpg" alt="login" width={250} height={250} className="rounded-lg mb-4 shadow-md" />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome to AI Interview Scheduler
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in with your Google account to continue
        </p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-sm transition"
          onClick={signInWithGoogle}>
          Login with Google
        </Button>
      </div>
    </div>
  )
}

export default Login
