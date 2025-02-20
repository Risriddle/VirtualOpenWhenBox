
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {  Navigation } from "swiper/modules";

import { Eye, Search, Pencil, Trash, Plus, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export interface Letter {
  _id: string;
  title: string;
  message: string;
  imageUrls?: string[];
}


interface VintageLetterProps {
  letter: Letter;
  onView: (letter: Letter) => void;
  onEdit: (letter: Letter) => void;
  onDelete: (id: string) => void;
}

const VintageLetter: React.FC<VintageLetterProps> = ({ letter, onView, onEdit, onDelete }) => (

  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative bg-amber-50 rounded-sm shadow-lg p-6 mb-6 transform hover:-translate-y-1 transition-transform duration-200 border border-amber-200"
    style={{
      backgroundImage: `
        linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%),
        radial-gradient(circle at center, rgba(205,164,94,0.1) 0%, transparent 100%)
      `,
    }}
  >
    {/* Vintage texture overlays */}
    <div className="absolute inset-0 opacity-5 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '8px 8px'
      }}
    />
    
    <div className="flex flex-col">
      <div className="border-b border-amber-200 pb-4 mb-4">
        <h3 className="font-serif text-xl text-amber-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
          Open when: {letter.title}
        </h3>
        <div className="flex gap-2 mt-2">
          <Button
            onClick={() => onView(letter)}
            size="sm"
            variant="ghost"
            className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
          >
            <Eye className="w-4 h-4 mr-1" /> Read
          </Button>
          <Button
            onClick={() => onEdit(letter)}
            size="sm"
            variant="ghost"
            className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
          >
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button
            onClick={() => onDelete(letter._id)}
            size="sm"
            variant="ghost"
            className="text-amber-800 hover:text-amber-900 hover:bg-amber-100"
          >
            <Trash className="w-4 h-4 mr-1" /> Remove
          </Button>
        </div>
      </div>
      
      <p className="text-amber-800 line-clamp-3 font-serif italic">
        {letter.message}
      </p>
    </div>
    
    {/* Vintage stamp effect */}
<div className="absolute top-4 right-4 w-20 h-20 opacity-20 rotate-12">
  <div className="w-full h-full border-4 border-dashed border-amber-900 rounded-full flex items-center justify-center shadow-md bg-white/40 backdrop-blur-sm">
    <div className="text-amber-900 text-xs font-serif font-bold uppercase transform -rotate-12 tracking-widest">
      Sealed
    </div>
  </div>
</div>

  </motion.div>
);

export default function VirtualBox() {

    const router = useRouter();
  const { boxId } = useParams();


  const [letters, setLetters] = useState<Letter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
 
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const[isUpdating,setIsUpdating]=useState(false);
  const [viewingLetter, setViewingLetter] = useState<Letter | null>(null);


  useEffect(() => {
    if (boxId) {
      fetchLetters();
    }
  }, [boxId]);

  const fetchLetters = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/box/${boxId}`);
      if (!res.ok) throw new Error("Failed to fetch letters");
      const data = await res.json();
      if (data.letterDocs) {
        setLetters(data.letterDocs);
      } else {
        console.error("No letters found in response");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLetter = async () => {
    router.push(`/createLetter/${boxId}`)
  };

  const handleUpdateLetter = async (updatedLetter: Letter) => {
    try {
      setIsUpdating(true);
      const res = await fetch(`/api/boxes/${boxId}/letters/${updatedLetter._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLetter),
      });

      if (!res.ok) throw new Error("Failed to update letter");

      setLetters((prevLetters) =>
        prevLetters.map((letter) =>
          letter._id === updatedLetter._id ? updatedLetter : letter
        )
      );
      setSelectedLetter(null);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    
  } finally {
    setIsUpdating(false);
  }
  };

  const handleDeleteLetter = async (letterId: string) => {
    if (!confirm("Are you sure you want to delete this letter?")) return;

    try {
     
      const res = await fetch(`/api/boxes/${boxId}/letters/${letterId}`, {
        method: "DELETE",
      });
      console.log(letterId,"=======================================")
      if (!res.ok) throw new Error("Failed to delete letter");

      setLetters((prevLetters) => 
        prevLetters.filter((letter) => letter._id !== letterId)
      );
      setSelectedLetter(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturnHome=()=>{
    router.push("/")
  }

  

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string); // Explicitly cast as string
      reader.onerror = (error) => reject(error);
    });
  };
  

  return (
    <div className="min-h-screen  from-amber-100 to-amber-50 py-8 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">

     {/* <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-50 py-8"> */}
      <main className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-4" 
              style={{ fontFamily: 'Playfair Display, serif' }}>
            Add Letters to the Box
          </h1>
          <p className="text-lg text-amber-800 mb-8 font-serif italic">
            A treasured collection of moments and memories 📜
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* <div className="flex justify-between items-center bg-white/60 p-4 rounded-lg backdrop-blur-sm shadow-sm"> */}
          <div className="flex flex-wrap justify-between items-center bg-white/60 p-4 rounded-lg backdrop-blur-sm shadow-sm gap-2 md:gap-4">

            {/* <div className="flex gap-4"> */}
            <div className="flex flex-col md:flex-row gap-2">

              <Button
                onClick={handleCreateLetter}
                className="bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Write New Letter
              </Button>
              <Button 
                onClick={handleReturnHome}
                variant="outline"
                className="border-amber-700 text-amber-700 hover:bg-amber-50"
              >
                <Home className="w-4 h-4 mr-2" /> Return Home
              </Button>
            </div>
            <div className="relative w-full md:w-1/3">

              <Input
                type="text"
                placeholder="Search your letters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-amber-50/80 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-amber-50 rounded-lg shadow-md">
                <p className="text-amber-800 font-serif animate-pulse">
                  Retrieving your letters...
                </p>
              </div>
            </div>
          ) : (
            // <div className="grid md:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {letters
                .filter((letter) =>
                  letter.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((letter) => (
                  <VintageLetter
                    key={letter._id}
                    letter={letter}
                    onView={(letter:Letter) => setViewingLetter(letter)}
                    onEdit={(letter:Letter) => {
                      setSelectedLetter(letter);
                      setIsEditing(true);
                    }}
                    onDelete={handleDeleteLetter}
                  />
                ))}
            </div>
          )}
        </div>


<Dialog open={!!viewingLetter} onOpenChange={() => setViewingLetter(null)}>
      <DialogContent className="sm:max-w-2xl bg-amber-50 max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-amber-900">
            Open When: {viewingLetter?.title}
          </DialogTitle>
        </DialogHeader>

        {/* Image Slideshow */}
        {viewingLetter?.imageUrls && viewingLetter?.imageUrls?.length > 0 && (
          <div className="w-full max-h-[250px]">
            <Swiper
              modules={[Navigation]}
              navigation
              className="w-full h-full rounded-lg"
            >
              {viewingLetter.imageUrls.map((imgUrl, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={imgUrl}
                    alt={`Letter Image ${index + 1}`}
                    className="w-full h-[250px] object-contain rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      {/* Scrollable Content */}
{/* <div className="px-4 py-2 bg-white/60 rounded-lg overflow-auto" style={{ maxHeight: "300px" }}> */}
<div className="px-4 py-2 bg-white/60 rounded-lg overflow-auto max-h-[40vh] sm:max-h-[300px]">

  <p className="text-amber-900 whitespace-pre-wrap font-serif leading-relaxed">
    {viewingLetter?.message}
  </p>
</div>


        <DialogFooter>
          <Button onClick={() => setViewingLetter(null)} className="bg-amber-700 hover:bg-amber-800 text-white">
            Seal Letter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

       
      {/*updating letter*/}
        {selectedLetter && (
  <Dialog open={isEditing} onOpenChange={setIsEditing}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Letter</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {/* Title Input */}
        <Input
          placeholder="Open when..."
          value={selectedLetter.title}
          onChange={(e) =>
            setSelectedLetter((prev) =>
              prev ? { ...prev, title: e.target.value } : null
            )
          }
        />

        {/* Message Textarea */}
        <Textarea
          placeholder="Your message..."
          value={selectedLetter.message}
          onChange={(e) =>
            setSelectedLetter((prev) =>
              prev ? { ...prev, message: e.target.value } : null
            )
          }
          rows={5}
        />

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="block font-medium">Images:</label>
          
          {/* Display existing images */}
          <div className="flex flex-wrap gap-2">
            {selectedLetter.imageUrls?.map((imageUrl, index) => (
              <div key={index} className="relative w-24 h-24">
                <Image
                  src={imageUrl}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={() =>
                    setSelectedLetter((prev) =>
                      prev
                        ? { ...prev, imageUrls: prev.imageUrls?.filter((_, i) => i !== index) }
                        : null
                    )
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>


          {/* Upload New Images */}
          <Input
  type="file"
  accept="image/*"
  multiple
  onChange={async (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const newImageUrls:string[] = await Promise.all(
      files.map(async (file) => {
        if (file.type.startsWith('image/')) {
          return await convertToBase64(file); // Convert new files to data:image format
        }
        return URL.createObjectURL(file); // Fallback (shouldn't usually happen)
      })
    );

    setSelectedLetter((prev) =>
      prev ? { ...prev, imageUrls: [...(prev.imageUrls || []), ...newImageUrls] } : null
    );
  }}
  className="mt-2"
/>

        </div>
      </div>

      <DialogFooter>
        <Button onClick={() => setIsEditing(false)} variant="outline">
          Cancel
        </Button>
        <Button
  onClick={() => selectedLetter && handleUpdateLetter(selectedLetter)}
  className="bg-blue-600 hover:bg-blue-700 text-white"
  disabled={isUpdating} // Disable button while updating
>
  {isUpdating ? "Updating..." : "Update Letter"}
</Button>

      </DialogFooter>
    </DialogContent>
  </Dialog>
)}


      </main>
    </div>
  );
}