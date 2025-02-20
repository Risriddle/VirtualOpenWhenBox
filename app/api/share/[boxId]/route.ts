
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest, context: { params?: { boxId?: string } }) {
  try {
   
    const  boxId  = context.params?.boxId;
      const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";
      const shareLink = `${baseUrl}/sendVirtualBox/${boxId}`;
  
      return NextResponse.json({ success: true, shareLink }, { status: 200 });
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, message: "unknown" }, { status: 500 });
       }
  }
  