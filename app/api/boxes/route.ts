// import dbConnect from '@/lib/dbConnect'
// import {Box} from '@/lib/models/VirtualBox'
// import { NextResponse } from 'next/server'
// export const dynamic = "force-dynamic"; 


// export async function GET() {
//   await dbConnect()
//   const boxes = await Box.find({})
//   return NextResponse.json({ boxes })
// }


export const dynamic = "force-dynamic"; // Prevents caching

import dbConnect from "@/lib/dbConnect";
import { Box } from "@/lib/models/VirtualBox";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const boxes = await Box.find({}).lean(); // Use `.lean()` for performance

    return NextResponse.json(boxes, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
      console.error("Error fetching boxes:", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
   
    }
    else{
      return NextResponse.json({ success: false, message:"unknown error" }, { status: 500 });
    }
    }
}
