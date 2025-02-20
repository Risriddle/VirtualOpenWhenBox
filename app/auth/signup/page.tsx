"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";


export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signing up with:", { name, email, password })
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
          Create an Account
        </h2>
        <p className="text-center text-[#8b7355] mb-4">
          Join us and start your journey! ✨
        </p>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b7355]" />
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 pl-10 border border-[#d4a373] rounded-md bg-[#fff9eb] focus:ring-2 focus:ring-[#d4a373]"
            />
          </div>

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
              placeholder="Create a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-[#d4a373] rounded-md bg-[#fff9eb] focus:ring-2 focus:ring-[#d4a373]"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#8b7355] hover:bg-[#7a624e] text-white font-serif py-3">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-[#8b7355] mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#d4a373] underline">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  )
}
