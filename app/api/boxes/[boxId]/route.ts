import { NextRequest, NextResponse } from 'next/server';
import  dbConnect  from '@/lib/dbConnect';
import {Box} from '@/lib/models/VirtualBox';

export async function DELETE(req: NextRequest, { params }: { params: { boxId: string } }) {
    try {
        await dbConnect();
        await Box.findByIdAndDelete(params.boxId);
        return NextResponse.json({ message: 'Box deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting box', error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { boxId: string } }) {
    try {
       

        await dbConnect();
        const { boxfor } = await req.json();
        const updatedBox = await Box.findByIdAndUpdate(params.boxId, { boxfor }, { new: true });

        if (!updatedBox) {
            return NextResponse.json({ message: 'Box not found' }, { status: 404 });
        }

        return NextResponse.json(updatedBox, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating box', error }, { status: 500 });
    }
}
