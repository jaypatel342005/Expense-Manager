"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/imagekit";

export async function SaveProjectAction(formData: FormData) {
    const id = formData.get("id");
    const ProjectName = formData.get("ProjectName") as string;
    const ProjectStartDate = formData.get("ProjectStartDate") as string;
    const ProjectEndDate = formData.get("ProjectEndDate") as string;
    const ProjectDetail = formData.get("ProjectDetail") as string;
    const Description = formData.get("Description") as string;
    let ProjectLogo = formData.get("ProjectLogo") as string;
    const IsActive = formData.get("IsActive") === "true";
    const UserID = formData.get("UserID");
    const file = formData.get("file") as File;
    const AttachmentName = formData.get("AttachmentName") as string || "project-logo";

    try {
        if (file && file.size > 0) {
            const uploadResponse = await uploadImage(
                file, 
                AttachmentName, 
                "/expense-manager/projects"
            );
            ProjectLogo = uploadResponse.url;
        }
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
    }

    const dataPayload = {
        ProjectName,
        ProjectStartDate: ProjectStartDate ? new Date(ProjectStartDate) : null,
        ProjectEndDate: ProjectEndDate ? new Date(ProjectEndDate) : null,
        ProjectDetail: ProjectDetail || null,
        Description: Description || null,
        ProjectLogo: ProjectLogo || null,
        IsActive,
        UserID: Number(UserID || 1),
        Modified: new Date()
    };

    try {
        if (id) {
            await prisma.projects.update({
                where: { ProjectID: Number(id) },
                data: dataPayload
            });
        } else {
            await prisma.projects.create({
                data: {
                    ...dataPayload,
                    Created: new Date()
                }
            });
        }

        revalidatePath("/admin/projects");
        revalidatePath("/projects"); // Revalidate dashboard projects if any
        return { success: true, message: id ? "Project updated successfully" : "Project created successfully" };

    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, message: "Failed to save project. Please try again." };
    }
}
