import { imagekit, uploadImage } from "@/lib/imagekit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const customName = formData.get("customName") as string;
        
        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Generate unique ID (using timestamp for simplicity and readability)
        // const uniqueId = Date.now().toString(); // Too long
        const uniqueId = Math.random().toString(36).substring(2, 8); // ~6 chars, e.g. "x7z91a"
        let finalFileName;

        if (customName && customName.trim() !== "") {
            // Case 1: Custom name provided -> Append ID
            finalFileName = `${customName.trim()}-${uniqueId}`;
        } else {
            // Case 2: Default "image" -> Append ID and extension
            const nameParts = file.name.split('.');
            let ext = "";
            if (nameParts.length > 1) {
                ext = "." + nameParts.pop();
            }
            finalFileName = `image-${uniqueId}${ext}`;
        }

        const uploadResponse = await uploadImage(
            file, 
            finalFileName, 
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
