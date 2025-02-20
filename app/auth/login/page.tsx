"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";


export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Logging in with:", { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#f8f3e9] border-4 border-[#d4a373] shadow-xl p-8 rounded-lg"
      >
        <h2 className="text-3xl font-serif text-[#5a3921] text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-[#8b7355] mb-4">
          Log in to access your letters ✉️
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b7355]" />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border border-[#d4a373] rounded-md bg-[#fff9eb] focus:ring-2 focus:ring-[#d4a373]"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b7355]" />
            <Input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-[#d4a373] rounded-md bg-[#fff9eb] focus:ring-2 focus:ring-[#d4a373]"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#8b7355] hover:bg-[#7a624e] text-white font-serif py-3">
            Log In
          </Button>
        </form>

        <p className="text-center text-sm text-[#8b7355] mt-4">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-[#d4a373] underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  )
}
