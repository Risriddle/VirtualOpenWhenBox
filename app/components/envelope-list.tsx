"use client"

import { motion } from "framer-motion"
import Envelope from "./envelope"



export interface Letter {
  _id: string
  title: string
  message: string
  imageUrls?: string[]
}

interface EnvelopeListProps {
  letters: Letter[]
  onSelect: (letter: Letter) => void
}

export default function EnvelopeList({ letters, onSelect }: EnvelopeListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    // <motion.div
    //   variants={container}
    //   initial="hidden"
    //   animate="show"
    //   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    // >
//      <motion.div
//   variants={container}
//   initial="hidden"
//   animate="show"
//   className="w-full max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6"
// > 

<motion.div
  variants={container}
  initial="hidden"
  animate="show"
  className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4 sm:px-6"
> 

      {letters.map((letter) => (
        <Envelope key={letter._id} letter={letter} onClick={() => onSelect(letter)} />
      ))}
    </motion.div>
  )
}

