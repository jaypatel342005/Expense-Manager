'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function deleteRow(
  model: string,
  id: string,
  path?: string
) {
    const modelKeyMap: Record<string, string> = {
        expenses: "ExpenseID",
        incomes: "IncomeID",
        projects: "ProjectID",
        categories: "CategoryID",
        sub_categories: "SubCategoryID",
        peoples: "PeopleID",
        users: "UserID"
    };

    const pkField = modelKeyMap[model] || "id";
    
    const numericId = Number(id);
    const idValue = (modelKeyMap[model] && !isNaN(numericId)) ? numericId : id;

    // @ts-ignore - Dynamic access to prisma client
    const prismaModel = prisma[model];

    if (!prismaModel) {
        throw new Error(`Invalid model name: ${model}`);
    }

    await prismaModel.delete({
      where: { [pkField]: idValue },
    });

    if (path) {
      revalidatePath(path);
    }
}
