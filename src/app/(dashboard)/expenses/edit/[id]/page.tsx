import { prisma } from '@/lib/prisma';
import ExpenseForm from '@/components/forms/expense-form';
import React from 'react';

export default async function EditExpensePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [expense, categories, subCategories, peoples, projects] = await Promise.all([
        prisma.expenses.findFirst({ where: { ExpenseID: Number(id) } }),
        prisma.categories.findMany({ where: { IsActive: true } }),
        prisma.sub_categories.findMany({ where: { IsActive: true } }),
        prisma.peoples.findMany({ where: { IsActive: true } }),
        prisma.projects.findMany({ where: { IsActive: true } })
    ]);

    if (!expense) {
        return <div>Expense not found</div>;
    }


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Expense</h1>
            <ExpenseForm 
                expense={expense}
                categories={categories}
                subCategories={subCategories}
                people={peoples}
                projects={projects}
            />
        </div>
    );
}
