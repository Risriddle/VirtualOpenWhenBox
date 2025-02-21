
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  Share2,
  Box,
  Scroll,
  ExternalLink,
  Trash2,
  Edit2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Box {
  _id: string;
  boxfor: string;
  createdAt?: Date;
  letters?: Letter[];
}

interface Letter {
  id: string;
  title: string;
  message: string;
  imageUrls: string[];
  createdAt: Date;
}


export default function HomePage() {
  const router = useRouter();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [isCreatingBox, setIsCreatingBox] = useState(false);
  const [isEditingBox, setIsEditingBox] = useState(false);
  const [newBoxName, setNewBoxName] = useState("");
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [boxToDelete, setBoxToDelete] = useState<Box | null>(null);
  const [loading,setLoading]=useState(false)
  
  useEffect(() => {
    fetchBoxes();
  }, []);

  

  // Box management functions remain the same
  const fetchBoxes = async () => {
    try{
      setLoading(true)
      const response = await fetch("/api/boxes");
      const data = await response.json();
      setBoxes(data);}
      catch(error){
        console.error("Error fetching shareable link:", error);
        return null;
      }
    finally{
    setLoading(false)
    }
  };



  const createNewBox = async () => {
    if (!newBoxName.trim()) return;
  
    try {
      const response = await fetch("/api/create-box", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boxfor: newBoxName }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create box");
      }
  
      const data = await response.json();
      setBoxes((prev) => [...prev, data.box]);
      setNewBoxName("");
      setIsCreatingBox(false);
    } catch (error) {
      console.error("Error creating box:", error);
    }
  };
  
  const deleteBox = async (boxId: string) => {
    try {
      const response = await fetch(`/api/boxes/${boxId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete box");
      }
  
      setBoxes((prev) => prev.filter((box) => box._id !== boxId));
      setShowDeleteAlert(false);
      setBoxToDelete(null);
    } catch (error) {
      console.error("Error deleting box:", error);
    }
  };
  
  const updateBox = async (boxId: string, newName: string) => {
    try {
      const response = await fetch(`/api/boxes/${boxId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boxfor: newName }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update box");
      }
  
      const updatedBox = await response.json();
      setBoxes((prev) =>
        prev.map((box) => (box._id === boxId ? updatedBox : box))
      );
      setIsEditingBox(false);
    } catch (error) {
      console.error("Error updating box:", error);
    }
  };
  

  const getShareableLink = async (boxId: string) => {
    try {
      const response = await fetch(`/api/share/${boxId}`);
      const data = await response.json();
  console.log(data,"linkkkkkkkkkkkkkkkkkkkkkkk")
      if (data.success) {
        return data.shareLink; 
      } else {
        console.error("Failed to generate shareable link:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching shareable link:", error);
      return null;
    }
  };


  const handleGetShareableLink = async (boxId: string) => {
    const link = await getShareableLink(boxId);
    if (link) {
      setShareableLink(link)
    
    }
  };
    

  return (
   
    
   <div className="min-h-screen bg-[#f8f3e9] bg-[url('/bg.jpg')] bg-repeat">
      <header className="relative py-16 text-center border-b-4 border-double border-[#d4a373] bg-[#fdf5e6] shadow-md">
        <div
          className="absolute inset-0 opacity-15 mix-blend-multiply"
          style={{ backgroundImage: `url('/ornatePattern.avif')` }}
        />
        <div className="relative">
          <h1 className="text-5xl font-cursive text-[#5a3e2b] mb-4 tracking-wide">
            Open When Box Collection
          </h1>
          <div className="w-32 h-1 bg-[#d4a373] mx-auto mb-4" />
          <p className="text-[#8b7355] font-handwriting text-2xl italic">
            Create a box for a loved one...
          </p>
        </div>
      </header>
      
     <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Action Buttons with Vintage Styling */}
        
        <div className="flex justify-center gap-6 mb-16">
          <button
            onClick={() => setIsCreatingBox(true)}
            className="flex items-center gap-3 px-8 py-4 bg-[#d4a373] text-white rounded-lg 
                     hover:bg-[#bc8a5f] transition-all duration-300 shadow-lg transform hover:-translate-y-1
                     border-2 border-[#bc8a5f]"
          >
            <Box className="w-6 h-6" />
            <span className="font-handwriting text-xl">Create New Box</span>
          </button>
        </div>

        {/* Boxes Grid with 3D Effect */}
        {loading ? (
          <div className="text-center text-amber-800 font-semibold animate-pulse">Loading boxes...</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {boxes.map((box) => (
              <motion.div
                key={box._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-[#d4a373] transform rotate-2 rounded-lg opacity-20 group-hover:rotate-3 transition-transform duration-300" />
                 <div
                  className="relative p-8 rounded-lg bg-[#fff9eb] border-4 border-[#d4a373] shadow-xl
                              transform transition-all duration-300 hover:-translate-y-2
                              bg-[url('/bb.jpg')] bg-cover bg-center"
                > 

                

                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBoxToDelete(box);
                        setShowDeleteAlert(true);
                      }}
                      className="p-2 text-[#805032] hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBox(box);
                        setIsEditingBox(true);
                      }}
                      className="p-2 text-[#805032] hover:text-[#5a3e2b] transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-3xl font-cursive text-[#5a3e2b] mb-4">
                    {box.boxfor}
                  </h3>
                  <div className="flex items-center gap-2 mb-4 mt-14">
                    <Scroll className="w-4 h-4 text-[#c1b19e]" />
                    <p className="text-[#d7c1a9]">
                      {box.letters?.length || 0} letter
                      {box.letters?.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                    
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-[#d0c8c1] italic">
                    Created {box.createdAt ? new Date(box.createdAt).toLocaleDateString() : "N/A"}

                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/virtualBox/${box._id}`);
                        }}
                        className="p-2 bg-[#9c6644] text-white rounded-full hover:bg-[#7d513a] 
                                 transition-colors shadow-md"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetShareableLink(box._id)
                        }}
                        className="p-2 bg-[#d4a373] text-white rounded-full hover:bg-[#bc8a5f]
                                 transition-colors shadow-md"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
               
              </motion.div>
            ))}
          </AnimatePresence>
        </div>)}

        {/* Create/Edit Box Dialog */}
        <Dialog
          open={isCreatingBox || isEditingBox}
          onOpenChange={() => {
            setIsCreatingBox(false);
            setIsEditingBox(false);
          }}
        >
          <DialogContent className="bg-[#fdf5e6] border-2 border-[#d4a373]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-cursive text-[#5a3e2b]">
                {isEditingBox ? "Edit Memory Box" : "Create New Memory Box"}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <Input
                type="text"
                value={newBoxName}
                onChange={(e) => setNewBoxName(e.target.value)}
                placeholder="Box for..."
                className="w-full p-4 border-2 border-[#d4a373] rounded-lg bg-white
                         font-handwriting text-xl focus:outline-none focus:ring-2
                         focus:ring-[#bc8a5f]"
              />
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsCreatingBox(false);
                    setIsEditingBox(false);
                  }}
                  className="px-6 py-3 text-[#8b7355] hover:text-[#5a3e2b]
                           font-handwriting text-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    isEditingBox
                      ? updateBox(selectedBox!._id, newBoxName)
                      : createNewBox()
                  }
                  className="px-6 py-3 bg-[#d4a373] text-white rounded-lg
                           hover:bg-[#bc8a5f] transition-colors shadow-md
                           font-handwriting text-xl"
                >
                  {isEditingBox ? "Save Changes" : "Create Box"}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Alert */}
        <Dialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <DialogContent className="bg-[#fdf5e6] border-2 border-[#d4a373]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-cursive text-[#5a3e2b]">
                Delete Memory Box
              </DialogTitle>
            </DialogHeader>
            <Alert variant="destructive">
              <AlertDescription>
                Are you sure you want to delete &quot;{boxToDelete?.boxfor}&quot;? This
                action cannot be undone.
              </AlertDescription>
            </Alert>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="px-4 py-2 text-[#8b7355] hover:text-[#5a3e2b]"
              >
                Cancel
              </button>
              <button
                onClick={() => boxToDelete && deleteBox(boxToDelete._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md
                         hover:bg-red-700 transition-colors"
              >
                Delete Box
              </button>
            </div>
          </DialogContent>
        </Dialog>

        
       

    {/* Dialog to Show the Shareable Link */}
    <Dialog open={!!shareableLink} onOpenChange={() => setShareableLink(null)}>
      <DialogContent className="bg-[#fdf5e6] border-2 border-[#d4a373]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cursive text-[#5a3e2b]">
            Share Your Memory Box
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-3 p-4">
          <Input
            type="text"
            value={shareableLink || ""}
            readOnly
            className="flex-1 p-3 border-2 border-[#d4a373] rounded-lg bg-white"
          />
          <button
            onClick={() => {
              if (shareableLink) {
                navigator.clipboard.writeText(shareableLink);
                alert("Link copied to clipboard!");
              }
            }}
            className="p-2 bg-[#d4a373] text-white rounded-lg hover:bg-[#bc8a5f] transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  
      </main>
      
     
    </div>
  );
}



