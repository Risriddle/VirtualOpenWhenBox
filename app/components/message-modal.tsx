"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

export default function MessageModal({ isOpen, onClose, message }: MessageModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black bg-opacity-40"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <div className="bg-pink-50 rounded-lg p-6 mt-4">
              <p className="font-handwriting text-xl text-pink-800 leading-relaxed">{message}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

