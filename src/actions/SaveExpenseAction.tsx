"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/imagekit";

export async function SaveExpenseAction(formData: FormData) {
    const id = formData.get("id");
    const ExpenseDate = formData.get("ExpenseDate") as string;
    const Amount = formData.get("Amount");
    const Description = formData.get("Description") as string;
    const ExpenseDetail = formData.get("ExpenseDetail") as string;
    let AttachmentPath = formData.get("AttachmentPath") as string;
    const UserID = formData.get("UserID");
    const file = formData.get("file") as File;
    const AttachmentName = formData.get("AttachmentName") as string;
    
    // Relation IDs (can be empty strings)
    const CategoryID = formData.get("CategoryID");
    const SubCategoryID = formData.get("SubCategoryID");
    const PeopleID = formData.get("PeopleID");
    const ProjectID = formData.get("ProjectID");

    try {
        if (file && file.size > 0) {
            const uploadResponse = await uploadImage(
                file, 
                AttachmentName, 
                "/expense-manager/expense"
            );
            AttachmentPath = uploadResponse.url;
        }
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
    }

    const dataPayload = {
        ExpenseDate: new Date(ExpenseDate),
        Amount: Number(Amount),
        Description: Description || null,
        ExpenseDetail: ExpenseDetail || null,
        AttachmentPath: AttachmentPath || null,
        UserID: Number(UserID || 1),
        
        CategoryID: CategoryID ? Number(CategoryID) : null,
        SubCategoryID: SubCategoryID ? Number(SubCategoryID) : null,
        PeopleID: PeopleID ? Number(PeopleID) : null,
        ProjectID: ProjectID ? Number(ProjectID) : null,
        
        Modified: new Date()
    };

    try {
        if (id) {
            await prisma.expenses.update({
                where: { ExpenseID: Number(id) },
                data: dataPayload
            });
        } else {
            await prisma.expenses.create({
                data: {
                    ...dataPayload,
                    Created: new Date()
                }
            });
        }

        revalidatePath("/expenses"); 
        return { success: true, message: id ? "Expense updated successfully" : "Expense saved successfully" };

    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, message: "Failed to save expense. Please try again." };
    }
}
