import  dbConnect from "@/lib/dbConnect";
import {Box}  from "@/lib/models/VirtualBox";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    await dbConnect();
    const { boxfor } = await req.json();
    const newBox = await Box.create({ boxfor });
    console.log(newBox,"bbbbbbbbbbbbbbbb")
    return NextResponse.json({ success: true, box: newBox }, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "unknown" }, { status: 500 });
  }
}
