"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


import { deleteImage } from "@/lib/imagekit";
import { verifySession } from "@/lib/session";

export async function SaveIncomeAction(formData: FormData) {
    const id = formData.get("id");
    const IncomeDate = formData.get("IncomeDate") as string;
    const Amount = formData.get("Amount");
    const Description = formData.get("Description") as string;
    const IncomeDetail = formData.get("IncomeDetail") as string;
    let AttachmentPath = formData.get("AttachmentPath") as string;
    const UserID = formData.get("UserID");
    
    const CategoryID = formData.get("CategoryID");
    const SubCategoryID = formData.get("SubCategoryID");
    const PeopleID = formData.get("PeopleID");
    const ProjectID = formData.get("ProjectID");


    const session = await verifySession();
    const isUser = session?.role === 'USER';
    const sessionUserId = session?.userId ? Number(session.userId) : undefined;

    // Determine final UserID
    let finalUserId = Number(UserID); // Default from form
    if (isUser && sessionUserId) {
        finalUserId = sessionUserId;
    } else if (sessionUserId && !finalUserId) {
         // Admin but didn't provide specific ID, or fallback
        finalUserId = sessionUserId;
    }
    // Fallback to 1 if everything fails (legacy behavior)
    if (!finalUserId) finalUserId = 1;

    const dataPayload = {
        IncomeDate: new Date(IncomeDate),
        Amount: Number(Amount),
        Description: Description || null,
        IncomeDetail: IncomeDetail || null,
        AttachmentPath: AttachmentPath || null,
        UserID: finalUserId,
        
        CategoryID: CategoryID ? Number(CategoryID) : null,
        SubCategoryID: SubCategoryID ? Number(SubCategoryID) : null,
        PeopleID: PeopleID ? Number(PeopleID) : null,
        ProjectID: ProjectID ? Number(ProjectID) : null,
        
        Modified: new Date()
    };

    try {
        if (id) {
            const existingIncome = await prisma.incomes.findUnique({
                where: { IncomeID: Number(id) }
            });

            if (existingIncome?.AttachmentPath && existingIncome.AttachmentPath !== AttachmentPath) {
                await deleteImage(existingIncome.AttachmentPath);
            }

            await prisma.incomes.update({
                where: { IncomeID: Number(id) },
                data: dataPayload
            });
        } else {
            await prisma.incomes.create({
                data: {
                    ...dataPayload,
                    Created: new Date()
                }
            });
        }

        revalidatePath("/incomes"); 
        // redirect("/incomes"); // Removed
        return { success: true, message: id ? "Income updated successfully" : "Income saved successfully" };

    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, message: "Failed to save income. Please try again." };
    }
}