"use client"

import { useState } from "react"
import { forgotPassword, verifyResetCode, resetPassword } from "../_actions/auth.actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ForgetPasswordPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const router = useRouter()

  async function handleEmail() {
    try {
      await forgotPassword(email)
      toast.success("Code sent to your email")
      setStep(2)
    } catch {
      toast.error("Something went wrong")
    }
  }

  async function handleVerify() {
    try {
      await verifyResetCode(code)
      toast.success("Code verified")
      setStep(3)
    } catch {
      toast.error("Invalid code")
    }
  }

  async function handleReset() {
    try {
      await resetPassword(email, newPassword)
      toast.success("Password changed successfully")
      router.push("/login")
    } catch {
      toast.error("Reset failed")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-96 p-6 shadow rounded-lg border">

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
            <input
              placeholder="Enter your email"
              className="w-full border p-2 mb-3"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmail} className="w-full bg-indigo-600 text-white p-2 rounded">
              Send Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Enter Code</h2>
            <input
              placeholder="Enter reset code"
              className="w-full border p-2 mb-3"
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerify} className="w-full bg-indigo-600 text-white p-2 rounded">
              Verify Code
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">New Password</h2>
            <input
              type="password"
              placeholder="New password"
              className="w-full border p-2 mb-3"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleReset} className="w-full bg-indigo-600 text-white p-2 rounded">
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  )
}