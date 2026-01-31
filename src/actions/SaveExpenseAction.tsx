"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


import { deleteImage } from "@/lib/imagekit";

export async function SaveExpenseAction(formData: FormData) {
    const id = formData.get("id");
    const ExpenseDate = formData.get("ExpenseDate") as string;
    const Amount = formData.get("Amount");
    const Description = formData.get("Description") as string;
    const ExpenseDetail = formData.get("ExpenseDetail") as string;
    let AttachmentPath = formData.get("AttachmentPath") as string;
    const UserID = formData.get("UserID");


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
             // Find existing to cleanup old image
            const existingExpense = await prisma.expenses.findUnique({
                where: { ExpenseID: Number(id) }
            });

            if (existingExpense?.AttachmentPath && existingExpense.AttachmentPath !== AttachmentPath) {
                await deleteImage(existingExpense.AttachmentPath);
            }

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
