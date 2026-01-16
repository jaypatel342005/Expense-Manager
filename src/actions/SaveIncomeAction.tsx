"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SaveIncomeAction(formData: FormData) {
    const id = formData.get("id");
    const IncomeDate = formData.get("IncomeDate") as string;
    const Amount = formData.get("Amount");
    const Description = formData.get("Description") as string;
    const IncomeDetail = formData.get("IncomeDetail") as string;
    const AttachmentPath = formData.get("AttachmentPath") as string;
    const UserID = formData.get("UserID");
    
    // Relation IDs (can be empty strings)
    const CategoryID = formData.get("CategoryID");
    const SubCategoryID = formData.get("SubCategoryID");
    const PeopleID = formData.get("PeopleID");
    const ProjectID = formData.get("ProjectID");

    const dataPayload = {
        IncomeDate: new Date(IncomeDate),
        Amount: Number(Amount),
        Description: Description || null,
        IncomeDetail: IncomeDetail || null,
        AttachmentPath: AttachmentPath || null,
        UserID: Number(UserID || 1),
        
        CategoryID: CategoryID ? Number(CategoryID) : null,
        SubCategoryID: SubCategoryID ? Number(SubCategoryID) : null,
        PeopleID: PeopleID ? Number(PeopleID) : null,
        ProjectID: ProjectID ? Number(ProjectID) : null,
        
        Modified: new Date()
    };

    if (id) {
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
    redirect("/incomes");       
}