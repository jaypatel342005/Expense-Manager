import { prisma } from '@/lib/prisma';
import IncomeForm from '@/components/forms/income-form';
import React from 'react';

// Ensure the params are typed correctly as a Promise for Next.js 15+
export default async function EditIncomePage({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;

    const [income, categories, subCategories, peoples, projects] = await Promise.all([
        prisma.incomes.findFirst({ where: { IncomeID: Number(id) } }),
        prisma.categories.findMany({ where: { IsActive: true } }),
        prisma.sub_categories.findMany({ where: { IsActive: true } }),
        prisma.peoples.findMany({ where: { IsActive: true } }),
        prisma.projects.findMany({ where: { IsActive: true } })
    ]);

    if (!income) {
        return <div>Income not found</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Income</h1>
            <IncomeForm 
                income={income}
                categories={categories}
                subCategories={subCategories}
                people={peoples}
                projects={projects}
            />
        </div>
    );
}