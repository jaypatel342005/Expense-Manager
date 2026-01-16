import IncomeForm from '@/components/forms/income-form';
import { prisma } from '@/lib/prisma';
import React from 'react';

export default async function AddIncomePage() {
    const categories = await prisma.categories.findMany({
        where: { IsActive: true } // Assuming we want active ones. Ideally filtered by IsIncome but schema defaults vary.
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
            <h1 className="text-2xl font-bold mb-4">Add New Income</h1>
            <IncomeForm 
                categories={categories}
                subCategories={subCategories}
                people={peoples}
                projects={projects}
                
            /> 
        </div>
    );
}