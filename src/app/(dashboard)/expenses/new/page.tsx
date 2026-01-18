import ExpenseForm from '@/components/forms/expense-form';
import { prisma } from '@/lib/prisma';
import React from 'react';

export default async function AddExpensePage() {
    const categories = await prisma.categories.findMany({
        where: { IsActive: true } 
    });
    const subCategories = await prisma.sub_categories.findMany({
        where: { IsActive: true }
    });
    const peoples = await prisma.peoples.findMany({
        where: { IsActive: true }
    });
    const projects = await prisma.projects.findMany({
        where: { IsActive: true }
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Expense</h1>
            <ExpenseForm 
                categories={categories}
                subCategories={subCategories}
                people={peoples}
                projects={projects}
            /> 
        </div>
    );
}
