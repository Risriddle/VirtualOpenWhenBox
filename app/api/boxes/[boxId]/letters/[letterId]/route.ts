import { NextResponse } from 'next/server';
import { Letter } from '@/lib/models/LetterContent';
import { Box } from '@/lib/models/VirtualBox';
import dbConnect from '@/lib/dbConnect';
import { S3Client, PutObjectCommand , DeleteObjectCommand} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function PUT(req: Request, context: { params?: { boxId?: string; letterId?: string } }) {
  await dbConnect();

  try {
    const boxId = context.params?.boxId;
    const letterId = context.params?.letterId;
    const { title, message, imageUrls } = await req.json();
    
    console.log(imageUrls, "images in updation");

    if (!title || !message) {
      return NextResponse.json({ message: 'Title and message are required' }, { status: 400 });
    }

    // Check if box and letter exist
    const box = await Box.findById(boxId);
    if (!box) return NextResponse.json({ message: 'Box not found' }, { status: 404 });

    const letter = await Letter.findById(letterId);
    if (!letter) return NextResponse.json({ message: 'Letter not found' }, { status: 404 });

    // Determine which images are new and which are removed
    const existingImageUrls = letter.imageUrls || [];
    const newImages = imageUrls.filter((url: string) => url.startsWith('data:image')); // Base64 images are new
    const retainedImages = imageUrls.filter((url: string) => existingImageUrls.includes(url)); // Already uploaded images

    // Upload only new images to S3
    const uploadedImageUrls = [...retainedImages]; // Keep existing images
    if (newImages.length > 0) {
      try {
        const uploadPromises = newImages.map(uploadImageToS3);
        const newUploadedUrls = await Promise.all(uploadPromises);
        uploadedImageUrls.push(...newUploadedUrls);
      } catch (error) {
        console.error('S3 upload error:', error);
        return NextResponse.json({ message: 'Failed to upload images.' }, { status: 500 });
      }
    }

    // Update letter data
    letter.title = title;
    letter.message = message;
    letter.imageUrls = uploadedImageUrls;
    await letter.save();

    return NextResponse.json({ message: 'Letter updated successfully!', letter }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'An error occurred while updating the letter.' }, { status: 500 });
  }
}

// Function to upload images to S3
const uploadImageToS3 = async (base64Image: string): Promise<string> => {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const match = base64Image.match(/^data:(image\/\w+);base64,/);
    if (!match) throw new Error('Invalid image format');

    const mimeType = match[1];
    const fileExtension = mimeType.split('/')[1];

    if (!fileExtension) throw new Error('Could not determine file extension');

    const fileName = `${uuidv4()}.${fileExtension}`;

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `letters/${fileName}`,
      Body: buffer,
      ContentType: mimeType,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/letters/${fileName}`;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload image to S3');
  }
};




export async function DELETE(req: Request, context: { params?: { boxId?: string; letterId?: string } }) {
  await dbConnect();

  try {
    const boxId = context.params?.boxId;
    const letterId = context.params?.letterId;

    // Validate IDs
    if (!boxId || !letterId) {
      return NextResponse.json(
        { message: "Box ID and Letter ID are required" },
        { status: 400 }
      );
    }

    // Check if the box exists
    const box = await Box.findById(boxId);
    if (!box) {
      return NextResponse.json({ message: "Box not found" }, { status: 404 });
    }

    // Check if the letter exists
    const letter = await Letter.findById(letterId);
    if (!letter) {
      return NextResponse.json({ message: "Letter not found" }, { status: 404 });
    }

    // Delete images from S3 if present
    if (letter.imageUrls && letter.imageUrls.length > 0) {
      try {
        const deleteImagePromises = letter.imageUrls.map(deleteImageFromS3);
        await Promise.all(deleteImagePromises);
      } catch (error) {
        console.error("Error deleting images from S3:", error);
        return NextResponse.json(
          { message: "Failed to delete images from storage." },
          { status: 500 }
        );
      }
    }

    // Remove letter from database
    await Letter.findByIdAndDelete(letterId);
    // box.letters = box.letters.filter((id) => id.toString() !== letterId);
    box.letters = box.letters.filter((id:string) => id.toString() !== letterId.toString());

    await box.save();

    return NextResponse.json(
      { message: "Letter and images deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting letter:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the letter." },
      { status: 500 }
    );
  }
}

// Function to delete images from S3
const deleteImageFromS3 = async (imageUrl: string) => {
  try {
    const key = imageUrl.split(`amazonaws.com/`)[1]; // Extract key from URL
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`Deleted from S3: ${imageUrl}`);
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    throw new Error("Failed to delete image from S3");
  }
};
