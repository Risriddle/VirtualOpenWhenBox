
// "use client"

// import { motion } from "framer-motion"
// import { Sparkles } from "lucide-react"


// interface EnvelopeProps {
//   letter: Letter
//   onClick: () => void
// }

// export interface Letter {
//   _id: string
//   title: string
//   message: string
//   imageUrls?: string[]
// }

// export default function Envelope({ letter, onClick }: EnvelopeProps) {
//   return (
//     <motion.div
//       whileHover={{
//         scale: 1.05, // Slight lift effect
//         rotate: 2, // Tiny tilt effect
//         boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Soft glow effect
//       }}
//       whileTap={{ scale: 0.95 }} // Slight press effect
//       className="relative w-96 h-60 bg-[#fdf8f3] rounded-md shadow-lg transition-all cursor-pointer p-6 flex flex-col justify-between overflow-hidden border border-[#e4d5c7]"
//       onClick={onClick}
//     >
//       {/* Envelope Flap */}
//       <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e9dfd5] clip-triangle"></div>

//       {/* Wax Seal (Centered, No Changes) */}
//       <div className="absolute top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-700 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900 wax-seal">
//         <Sparkles className="w-7 h-7 text-white" />
//       </div>

//       {/* Letter Title (Below Seal, More Spacing) */}
//       <h3 className="relative font-handwriting text-2xl font-semibold text-gray-800 text-center mt-28">
//         {letter.title}
//       </h3>

//       {/* Click to Open Text */}
//       <p className="text-sm italic text-gray-500 text-center mt-3">
//         Click to reveal the message...
//       </p>
//     </motion.div>
//   )
// }



// "use client"

// import { motion } from "framer-motion"
// import { Sparkles } from "lucide-react"

// export interface Letter {
//   _id: string
//   title: string
//   message: string
//   imageUrls?: string[]
// }

// interface EnvelopeProps {
//   letter: Letter
//   onClick: () => void
// }

// export default function Envelope({ letter, onClick }: EnvelopeProps) {
//   return (
//     <motion.div
//       whileHover={{
//         scale: 1.05, // Slight lift effect
//         rotate: 2, // Tiny tilt effect
//         boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Soft glow effect
//       }}
//       whileTap={{ scale: 0.95 }} // Slight press effect
//       className="relative w-full max-w-sm aspect-video bg-[#fdf8f3] rounded-md shadow-lg transition-all cursor-pointer p-6 flex flex-col justify-between overflow-hidden border border-[#e4d5c7]"
//       onClick={onClick}
//     >
//       {/* Envelope Flap */}
//       <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e9dfd5] clip-triangle"></div>

//       {/* Wax Seal (Centered, No Changes) */}
//       <div className="absolute top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-red-700 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900 wax-seal">
//         <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//       </div>

//       {/* Letter Title (Below Seal, More Spacing) */}
//       <h3 className="relative font-handwriting text-xl sm:text-2xl font-semibold text-gray-800 text-center mt-24 sm:mt-28">
//         {letter.title}
//       </h3>

//       {/* Click to Open Text */}
//       <p className="text-xs sm:text-sm italic text-gray-500 text-center mt-2 sm:mt-3">
//         Click to reveal the message...
//       </p>
//     </motion.div>
//   )
// }



// "use client"

// import { motion } from "framer-motion"
// import { Sparkles } from "lucide-react"

// export interface Letter {
//   _id: string
//   title: string
//   message: string
//   imageUrls?: string[]
// }

// interface EnvelopeProps {
//   letter: Letter
//   onClick: () => void
// }

// export default function Envelope({ letter, onClick }: EnvelopeProps) {
//   return (
//     <motion.div
//       whileHover={{
//         scale: 1.05,
//         rotate: 2,
//         boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
//       }}
//       whileTap={{ scale: 0.95 }}
//       className="relative w-full max-w-sm aspect-video bg-[#fdf8f3] rounded-md shadow-lg transition-all cursor-pointer p-6 flex flex-col justify-center items-center overflow-hidden border border-[#e4d5c7]"
//       onClick={onClick}
//     >
//       {/* Envelope Flap */}
//       <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e9dfd5] clip-triangle"></div>

//       {/* Wax Seal */}
//       <div className="absolute top-[40%] sm:top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-red-700 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900 wax-seal">
//         <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//       </div>

//       {/* Letter Title (Better Spacing) */}
//       <h3 className="relative font-handwriting text-xl sm:text-2xl font-semibold text-gray-800 text-center mt-16 sm:mt-20">
//         {letter.title}
//       </h3>

//       {/* Click to Open Text (Ensuring Full Visibility) */}
//       <p className="text-xs sm:text-sm italic text-gray-500 text-center mt-2 sm:mt-3 absolute bottom-4">
//         Click to reveal the message...
//       </p>
//     </motion.div>
    
//   )
// }

"use client"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export interface Letter {
  _id: string
  title: string
  message: string
  imageUrls?: string[]
}

interface EnvelopeProps {
  letter: Letter
  onClick: () => void
}

export default function Envelope({ letter, onClick }: EnvelopeProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: 2,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
      whileTap={{ scale: 0.95 }}
      // className="relative w-full max-w-sm aspect-video bg-[#fdf8f3] rounded-md shadow-lg transition-all cursor-pointer p-6 flex flex-col justify-center items-center overflow-hidden border border-[#e4d5c7]"
      className="relative w-full max-w-sm md:max-w-2xl aspect-video bg-[#fdf8f3] rounded-md shadow-lg transition-all cursor-pointer p-6 flex flex-col justify-center items-center overflow-hidden border border-[#e4d5c7]"

      onClick={onClick}
    >
      {/* Envelope Flap */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e9dfd5] clip-triangle"></div>

      {/* Wax Seal */}
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-red-700 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900 wax-seal">
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>

      {/* Letter Title */}
      <h3 className="relative font-handwriting text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center mt-12 sm:mt-14 px-4">
        {letter.title}
      </h3>

      {/* Click to Open Text */}
      <p className="text-xs sm:text-sm italic text-gray-500 text-center mt-2 absolute bottom-3">
        Click to reveal the message...
      </p>
    </motion.div>
  )
}