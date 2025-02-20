import { NextResponse } from 'next/server'
import { Letter } from "@/lib/models/LetterContent"
import { Box } from "@/lib/models/VirtualBox" // Assuming you have a Box model
import dbConnect from "@/lib/dbConnect"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from 'uuid'
import mongoose from 'mongoose'

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request, context: { params?: { boxId?: string } }) {
  await dbConnect()

  try {
    const  boxId  = context.params?.boxId;
    const { title, message, imageUrls } = await req.json()
console.log(title,message,imageUrls,"data receivd in create letter apiiiiiiiiiiiiiiiii")
    // Validate request
    if (!title || !message) {
      return NextResponse.json(
        { message: 'Title and message are required' },
        { status: 400 }
      )
    }

    // Check if box exists
    const box = await Box.findById(boxId)
    if (!box) {
      return NextResponse.json(
        { message: 'Box not found' },
        { status: 404 }
      )
    }

    console.log(boxId,box,"boxxxxxxxxxxxxx in create letter apiiiiiiiiiii")
    // Upload images to S3
    const uploadedImageUrls: string[] = []
    if (imageUrls && imageUrls.length > 0) {
      try {
        const uploadPromises = imageUrls.map(uploadImageToS3)
        const urls = await Promise.all(uploadPromises)
        uploadedImageUrls.push(...urls)
      } catch (error) {
        console.error('S3 upload error:', error)
        return NextResponse.json(
          { message: 'Failed to upload images.' },
          { status: 500 }
        )
      }
    }

    // Save the letter to the database
    const newLetter = new Letter({
      title,
      message,
      imageUrls: uploadedImageUrls,
      boxId: new mongoose.Types.ObjectId(boxId), /// Associate the letter with the box
    })
    await newLetter.save()

    box.letters.push(newLetter._id); // Add the new letter's ID to the box
    await box.save(); // Save the updated box

    console.log(box,"new boxxxxxxxxxxxxxxxxx")
    return NextResponse.json(
      { message: 'Letter added to box successfully!',newLetter,box },
      
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { message: 'An error occurred while adding the letter.' },
      { status: 500 }
    )
  }
}

// Function to upload images to S3
const uploadImageToS3 = async (base64Image: string): Promise<string> => {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')
  const buffer = Buffer.from(base64Data, 'base64')
  
  const mimeType = base64Image.split(';')[0].split(':')[1]
  const fileExtension = mimeType.split('/')[1]
  const fileName = `${uuidv4()}.${fileExtension}`
  
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `letters/${fileName}`,
    Body: buffer,
    ContentType: mimeType,
  }

  try {
    await s3Client.send(new PutObjectCommand(uploadParams))
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/letters/${fileName}`
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw new Error('Failed to upload image to S3')
  }
}







