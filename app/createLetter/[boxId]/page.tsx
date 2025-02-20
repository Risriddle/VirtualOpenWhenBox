

'use client'

import { useState, useCallback  } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useParams, useRouter } from "next/navigation"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LetterFormData {
  title: string
  message: string
  imageUrls: string[]
}

export default function CreateLetterPage() {
  const { boxId } = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState<LetterFormData>({
    title: '',
    message: '',
    imageUrls: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  // Generate random crumple points for paper effect
  const generateCrumplePoints = () => {
    const points: number[] = []
    for (let i = 0; i < 8; i++) {
      points.push(Math.random() * 5 - 2.5)
    }
    return points
  }

  const crumplePoints = generateCrumplePoints()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            imageUrls: [...prev.imageUrls, reader.result as string]
          }))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }))
  }

  const handleCreateLetter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!boxId) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/boxes/${boxId}/letters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setMessage('Letter created successfully!')
        setShowMessage(true)
        setTimeout(() => {
          setIsOpen(false)
          router.push(`/virtualBox/${boxId}`)
        }, 1500)
      }
    } catch (error) {
      console.error("Error creating letter:", error)
      setMessage('Failed to create letter')
      setShowMessage(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Close button clicked")
    setIsOpen(false)
    router.push(`/virtualBox/${boxId}`)
  }, [boxId, router])
  
  const handleEmojiClick = (emoji: string) => {
    setFormData((prev) => ({ ...prev, message: prev.message + emoji }))
    setShowEmojiPicker(false)
  }

  const emojis = [
    '❤️', '✨', '⭐', '🌹', '✉️', '📜', '✒️', '💌', '💐', '🕊️',
    '😂', '😍', '🥺', '😊', '😎', '🤔', '🙃', '😅', '😢', '😜',
    '💥', '🔥', '💪', '🙏', '💯', '🥳', '🎉', '😷', '😴', '🤩',
    '👍', '👎', '🙌', '👏', '💃', '🕺', '🍕', '🍔', '🍩', '🍎'
  ]

  if (!isOpen) return null
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a0f0f] p-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative w-full max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            
 {showMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <motion.div
            className="bg-white p-6 rounded-md shadow-lg text-lg font-semibold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.div>
        </div>
      )}
      
        <div className="relative bg-[#b89471] rounded-lg overflow-hidden min-h-[800px]"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(248, 231, 206, 0.8), rgba(244, 226, 198, 0.9)),
                 repeating-linear-gradient(
                   ${45 + crumplePoints[0]}deg,
                   transparent,
                   rgba(0, 0, 0, 0.03) 2px,
                   transparent 3px
                 ),
                 repeating-linear-gradient(
                   ${-45 + crumplePoints[1]}deg,
                   transparent,
                   rgba(0, 0, 0, 0.03) 2px,
                   transparent 3px
                 )
               `,
               backgroundBlendMode: 'overlay',
               boxShadow: `
                 inset 0 2px 15px rgba(0,0,0,0.2),
                 inset 0 -2px 15px rgba(0,0,0,0.15),
                 8px 8px 20px rgba(0, 0, 0, 0.3)
               `,
              //  transform: `rotate(${crumplePoints[2]}deg)`,
               clipPath: `polygon(
                 ${2 + crumplePoints[3]}% ${2 + crumplePoints[4]}%, 
                 ${98 + crumplePoints[5]}% ${1 + crumplePoints[6]}%, 
                 ${99 + crumplePoints[7]}% 3%, 97% 4%,
                 99% 6%, 98% 8%, 99% 10%,
                 97% 35%, 99% 45%, 98% 65%,
                 99% 85%, 97% 92%, 98% 98%,
                 2% 99%, 1% 97%, 3% 95%,
                 1% 85%, 2% 75%, 1% 65%,
                 2% 35%, 1% 25%, 2% 15%,
                 1% 8%, 3% 5%, ${2 + crumplePoints[3]}% ${2 + crumplePoints[4]}%
               )`
               
             }}>

             <Button
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 z-50 rounded-full bg-[#3a2518] text-white hover:bg-[#8b4513] transition-colors"
                style={{ cursor: 'pointer' }}
              >
                <X size={30} />
              </Button>

          <div 
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
            style={{
              background: `
                repeating-radial-gradient(
                  circle at ${20 + crumplePoints[0]}% ${30 + crumplePoints[1]}%,
                  transparent 0%,
                  rgba(0, 0, 0, 0.03) 1.5%,
                  transparent 2%
                ),
                repeating-radial-gradient(
                  circle at ${70 + crumplePoints[2]}% ${60 + crumplePoints[3]}%,
                  transparent 0%,
                  rgba(0, 0, 0, 0.02) 1%,
                  transparent 2%
                )
              `,
              filter: 'contrast(120%) brightness(102%)',
              zIndex: 1
            }}
          />

          <div className="relative p-8 z-10">
            <form onSubmit={handleCreateLetter} className="space-y-6">
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Open when......."
                className="w-full p-3 bg-transparent border-b border-[#3a2518] focus:border-[#3a2518] outline-none text-[#3a2518] text-2xl placeholder-[#3a2518]/70 text-center tracking-wide"
                style={{
                  fontFamily: 'Satisfy, cursive',
                  textShadow: '0 1px 2px rgba(255,255,255,0.6)'
                }}
              />

              <div className="relative h-[500px] overflow-hidden">
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Dear,..."
                  className="w-full h-full p-3 bg-transparent outline-none text-xl leading-relaxed overflow-y-auto whitespace-pre-wrap tracking-wide italic text-[#3a2518]"
                  style={{
                    fontFamily: 'Caveat, cursive',
                    backgroundAttachment: 'local',
                    lineHeight: '32px',
                    paddingTop: '8px',
                    textShadow: '0 1px 2px rgba(255,255,255,0.6)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#3a2518 transparent'
                  }}
                />
              </div>

              <div className="flex justify-between items-center text-[#3a2518]">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  className="font-serif hover:text-[#8b4513] transition-colors"
                >
                  {showEmojiPicker ? 'Close Symbols' : 'Add Symbols'}
                </button>

                <label htmlFor="file-upload" className="cursor-pointer font-serif hover:text-[#8b4513] transition-colors">
                  Attach Memories
                </label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
              </div>

              {showEmojiPicker && (
                <motion.div 
                  className="grid grid-cols-5 gap-2 p-2 bg-[#b89471]/80 rounded shadow-lg border border-[#3a2518]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </motion.div>
              )}

              <AnimatePresence>
                <div className="grid grid-cols-2 gap-4">
                  {formData.imageUrls.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative transform rotate-1"
                    >
                      <div className="relative rounded-lg overflow-hidden shadow-lg group">
                        <Image
                          src={image}
                          alt={`Attached ${index + 1}`}
                          className="max-w-full h-48 object-cover opacity-85 mix-blend-multiply"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-[#3a2518] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-[#f4e2c6]" />
                        </button>
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#3a2518] border-opacity-30 transform -rotate-3" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#3a2518] border-opacity-30 transform rotate-3" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#3a2518] border-opacity-30 transform rotate-3" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#3a2518] border-opacity-30 transform -rotate-3" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3a2518] hover:bg-[#2a1b10] text-[#f4e2c6] py-3 rounded-sm font-serif shadow-lg transition-colors"
              >
                {isSubmitting ? 'Sealing...' : 'Seal & Send'}
              </Button>
            </form>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}