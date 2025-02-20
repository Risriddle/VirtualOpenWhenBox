
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest, context: { params?: { boxId?: string } }) {
  try {
   
    const  boxId  = context.params?.boxId;
    if (!boxId) {
      return NextResponse.json({ success: false, message: "Missing boxId" }, { status: 400 });
    }
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

      const shareLink = `${baseUrl}/sendVirtualBox/${boxId}`;
  
      return NextResponse.json({ success: true, shareLink }, { status: 200 });
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, message: "unknown" }, { status: 500 });
       }
  }
  