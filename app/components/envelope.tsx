
"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"


interface EnvelopeProps {
  letter: Letter
  onClick: () => void
}

export interface Letter {
  _id: string
  title: string
  message: string
  imageUrls?: string[]
}

export default function Envelope({ letter, onClick }: EnvelopeProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05, // Slight lift effect
        rotate: 2, // Tiny tilt effect
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Soft glow effect
      }}
      whileTap={{ scale: 0.95 }} // Slight press effect
      className="relative w-96 h-60 bg-[#fdf8f3] rounded-md shadow-lg transition-all cursor-pointer p-6 flex flex-col justify-between overflow-hidden border border-[#e4d5c7]"
      onClick={onClick}
    >
      {/* Envelope Flap */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e9dfd5] clip-triangle"></div>

      {/* Wax Seal (Centered, No Changes) */}
      <div className="absolute top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-700 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900 wax-seal">
        <Sparkles className="w-7 h-7 text-white" />
      </div>

      {/* Letter Title (Below Seal, More Spacing) */}
      <h3 className="relative font-handwriting text-2xl font-semibold text-gray-800 text-center mt-28">
        {letter.title}
      </h3>

      {/* Click to Open Text */}
      <p className="text-sm italic text-gray-500 text-center mt-3">
        Click to reveal the message...
      </p>
    </motion.div>
  )
}
