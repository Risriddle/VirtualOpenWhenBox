import  dbConnect  from "@/lib/dbConnect";
import { Box } from "@/lib/models/VirtualBox";
import { Letter } from "@/lib/models/LetterContent"; 
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest, context: { params?: { boxId?: string } }) {
  try {
    await dbConnect();
    const  boxId  = context.params?.boxId;
    // console.log("heuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",boxId)
    // const box = await Box.findById(boxId).populate("letters").execPopulate(); ;
    const box = await Box.findById(boxId);
    if (box) {
   

      const letterDocs = await Letter.find({ _id: { $in: box.letters } });
      console.log("Manually fetched letters:", letterDocs,box);
      return NextResponse.json({ success: true, letterDocs,box}, { status: 200 });
      
    }
    
    
console.log(box,boxId,"in fetch letter api")
    if (!box) {
      return NextResponse.json({ success: false, message: "Box not found" }, { status: 404 });
    }

    // return NextResponse.json({ success: true, letterDocs}, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "unknown" }, { status: 500 });
   }
}
