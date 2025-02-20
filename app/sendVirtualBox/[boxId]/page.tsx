"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Search } from "lucide-react"
import Box3D from "@/app/components/box-3d"
import EnvelopeList from "@/app/components/envelope-list"
import LetterModal from "@/app/components/letter-modal"
import { Button } from "@/components/ui/button"
import Confetti from "react-confetti"
import useWindowSize from "@/app/hooks/use-window-size"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input";


export interface Letter {
  _id: string
  title: string
  message: string
  imageUrls?: string[]
}

export default function SendVirtualBox() {
  const {boxId}=useParams()
  const [letters, setLetters] = useState<Letter[]>([])
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const [isBoxComplete, setIsBoxComplete] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true) // Loading state
  const[boxFor,setBoxfor]=useState("")

  const fetchLetters = async () => {
    try {
      setIsLoading(true) // Start loading
      const res = await fetch(`/api/box/${boxId}`)
      if (!res.ok) throw new Error('Failed to fetch letters')
      const data = await res.json()
    console.log(data,"data from api")
    setBoxfor(data.box.boxfor)
      setLetters(data?.letterDocs)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  useEffect(() => {
    
    fetchLetters()
  }, [fetchLetters])

  

  const handleLetterSelect = (letter: Letter) => {
    setSelectedLetter(letter)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  const handleRandomLetter = () => {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)]
    handleLetterSelect(randomLetter)
  }

  const handleBoxAnimationComplete = () => {
    setTimeout(() => {
      setIsBoxComplete(true)
    }, 1500)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    // <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-50">
    <div className="min-h-screen  from-amber-100 to-amber-50 py-8 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">

      <AnimatePresence>{showConfetti && <Confetti width={width} height={height} recycle={false} />}</AnimatePresence>

     



      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-4">Virtual Open When Box for {boxFor}</h1>
          <p className="text-lg text-amber-800 mb-8">A box of love letters, just for you 💌</p>
        </motion.div>

        {isBoxComplete && (
          <div className="mb-8 text-center relative">
            <div className="relative w-1/2 mx-auto">
              <Input
                type="text"
                placeholder="Open when..."
                autoFocus
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 pl-10 border border-amber-300 rounded-lg w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" />
            </div>
          </div>
        )}

        {!isBoxComplete && <Box3D onAnimationComplete={handleBoxAnimationComplete} />}

        {isBoxComplete && isLoading ? (
          <div className="text-center text-amber-800 font-semibold animate-pulse">Loading letters...</div>
        ) : (
          isBoxComplete && (
            <>
              <Button
                onClick={handleRandomLetter}
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 py-2 flex items-center gap-2 mx-auto mb-8"
              >
                <Sparkles className="w-4 h-4" />
                Pick Random Letter
              </Button>
              <EnvelopeList
                letters={letters.filter(letter => letter.title.toLowerCase().includes(searchQuery.toLowerCase()))}
                onSelect={handleLetterSelect}
              />
            </>
          )
        )}

        <AnimatePresence>
          {selectedLetter && <LetterModal letter={selectedLetter} onClose={() => setSelectedLetter(null)} />}
        </AnimatePresence>
      </main>
    </div>


   

  )
}




