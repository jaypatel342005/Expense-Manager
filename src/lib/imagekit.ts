import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "placeholder_public_key",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "placeholder_private_key",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/placeholder",
});

export const uploadImage = async (file: File, fileName?: string, folder: string = "/expense-manager") => {
    const buffer = Buffer.from(await file.arrayBuffer());
    return await imagekit.upload({
        file: buffer,
        fileName: fileName || file.name || `file-${Date.now()}`,
        folder: folder,
        useUniqueFileName: false
    });
};

export const deleteImage = async (url: string) => {
    try {
        const urlParts = url.split("/");
        const fileName = urlParts[urlParts.length - 1];

        // 1. Find the file ID by name
        const files = await imagekit.listFiles({
            searchQuery: `name = "${fileName}"`
        });

        if (files && files.length > 0) {
            // @ts-ignore - We are searching for files, not folders
            const fileId = files[0].fileId;
            // 2. Delete using ID
            await imagekit.deleteFile(fileId);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error deleting image:", error);
        return false;
    }
};
