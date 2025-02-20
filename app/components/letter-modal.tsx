import {useEffect} from 'react';
import React from 'react';
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ImageSlider from './ImageSlider';
import Image from "next/image";


interface Letter {
  title: string;
  message: string;
  imageUrls?: string[];
}

interface LetterModalProps {
  letter: Letter;
  onClose: () => void;
}

const LetterModal: React.FC<LetterModalProps> = ({ letter, onClose }) => {
  

  const generateCrumplePoints = () => {
    const points: number[] = [];
    for (let i = 0; i < 8; i++) {
      points.push(Math.random() * 5 - 2.5);
    }
    return points;
  };
  useEffect(() => {
    const audio = new Audio("/audio/letter-open.mp3") // Add your file path here
    audio.play().catch(error => console.error("Error playing audio:", error))
    
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])
  const crumplePoints = generateCrumplePoints();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
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
        className="relative bg-[#b89471] rounded-lg p-10 max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh]"
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
          transform: `rotate(${crumplePoints[2]}deg)`,
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
        }}
      >
        {/* Realistic paper texture overlay - now covers entire modal */}
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
              ),
              repeating-radial-gradient(
                circle at ${40 + crumplePoints[4]}% ${80 + crumplePoints[5]}%,
                transparent 0%,
                rgba(0, 0, 0, 0.03) 1.2%,
                transparent 2.2%
              )
            `,
            filter: 'contrast(120%) brightness(102%)',
            zIndex: 1
          }}
        />

        {/* Organic crumple patterns - now covers entire modal */}
        <div 
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at ${30 + crumplePoints[0]}% ${20 + crumplePoints[1]}%,
                rgba(0, 0, 0, 0.1) 0%,
                transparent 25%
              ),
              radial-gradient(
                circle at ${60 + crumplePoints[2]}% ${50 + crumplePoints[3]}%,
                rgba(0, 0, 0, 0.08) 0%,
                transparent 35%
              ),
              radial-gradient(
                circle at ${45 + crumplePoints[4]}% ${75 + crumplePoints[5]}%,
                rgba(0, 0, 0, 0.06) 0%,
                transparent 30%
              )
            `,
            filter: 'blur(1px)',
            zIndex: 2
          }}
        />

        {/* Shadow and highlight effects - now covers entire modal */}
        <div 
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              conic-gradient(
                from ${45 + crumplePoints[0]}deg at 50% 50%,
                rgba(0, 0, 0, 0.1),
                transparent 60deg,
                rgba(255, 255, 255, 0.1) 180deg,
                transparent 240deg,
                rgba(0, 0, 0, 0.1) 360deg
              )
            `,
            zIndex: 3
          }}
        />

        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-20"
          type="button"
          aria-label="Close letter"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.5 }}
          className="overflow-y-auto max-h-[calc(90vh-5rem)] relative"
        >
          <div className="relative p-6 rounded-lg">
            <div className="relative z-10">
              <h2 className="font-cursive text-3xl text-[#3a2518] mb-6 text-center tracking-wide relative">
                {letter.title}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-[#3a2518] opacity-30" />
              </h2>

            
  {letter.imageUrls && letter.imageUrls.length > 1 ? (
  <ImageSlider images={letter.imageUrls} />
) : letter.imageUrls?.length === 1 ? (
  <Image
    src={letter.imageUrls[0]} 
    alt="Letter Image" 
    className="w-full h-auto rounded-lg shadow-md"
  />
) : null}
              <p 
                className="font-handwriting text-xl text-[#3a2518] leading-relaxed whitespace-pre-wrap tracking-wide italic"
                style={{
                  textShadow: '0 1px 2px rgba(255,255,255,0.6)'
                }}
              >
    

                {letter.message}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LetterModal;







