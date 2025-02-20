import dbConnect from '@/lib/dbConnect'
import {Box} from '@/lib/models/VirtualBox'
import { NextResponse } from 'next/server'

export async function GET() {
  await dbConnect()
  const boxes = await Box.find({})
  return NextResponse.json({ boxes })
}
