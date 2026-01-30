"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { deleteImage } from "@/lib/imagekit";

export async function SaveCategoryAction(formData: FormData) {
    try {
        const id = formData.get("id")?.toString();
        const categoryId = id ? parseInt(id) : undefined;
        
        const categoryName = formData.get("CategoryName")?.toString();
        const description = formData.get("Description")?.toString();
        
        // Handle Booleans
        const isExpense = formData.get("IsExpense") === "true";
        const isIncome = formData.get("IsIncome") === "true";
        const isActive = formData.get("IsActive") !== "false"; // Default true
        
        // Handle UserID (Mock for now or from hidden input)
        const userId = parseInt(formData.get("UserID")?.toString() || "1");

        // Handle Logo
        const logoPath = formData.get("LogoPath")?.toString();

        if (!categoryName) {
            return { success: false, message: "Category Name is required." };
        }

        const data = {
            CategoryName: categoryName,
            Description: description,
            IsExpense: isExpense,
            IsIncome: isIncome,
            IsActive: isActive,
            LogoPath: logoPath,
            UserID: userId,
            Modified: new Date(),
        };

        if (categoryId) {
            // Find existing to cleanup old image
            const existingCategory = await prisma.categories.findUnique({
                where: { CategoryID: categoryId }
            });

            if (existingCategory?.LogoPath && existingCategory.LogoPath !== logoPath) {
                await deleteImage(existingCategory.LogoPath);
            }

            // Update
            await prisma.categories.update({
                where: { CategoryID: categoryId },
                data: data,
            });
            revalidatePath("/admin/categories");
            revalidatePath(`/admin/categories/${categoryId}`);
            return { success: true, message: "Category updated successfully." };
        } else {
            // Create
            await prisma.categories.create({
                data: {
                    ...data,
                    Created: new Date(),
                },
            });
            revalidatePath("/admin/categories");
            return { success: true, message: "Category created successfully." };
        }

    } catch (error) {
        console.error("Error saving category:", error);
        return { success: false, message: "Failed to save category." };
    }
}
