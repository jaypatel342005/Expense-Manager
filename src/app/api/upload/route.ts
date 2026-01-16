import { imagekit, uploadImage } from "@/lib/imagekit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        
        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const uploadResponse = await uploadImage(
            file, 
            file.name, 
            "/expense-manager/incomes"
        );

        return NextResponse.json({
            url: uploadResponse.url,
            name: uploadResponse.name,
            fileId: uploadResponse.fileId
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { fileId } = await request.json();

        if (!fileId) {
            return NextResponse.json(
                { error: "No file ID provided" },
                { status: 400 }
            );
        }

        await imagekit.deleteFile(fileId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { error: "Delete failed" },
            { status: 500 }
        );
    }
}
