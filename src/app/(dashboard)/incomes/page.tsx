import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IncomeStats } from "@/components/incomes/income-stats";

export default async function IncomesPage() {
    const data = await prisma.incomes.findMany({
        orderBy: {
            IncomeDate: 'desc'
        },
        include: {
            categories: true,
            sub_categories: true,
            peoples: true,
            projects: true,
        }
    });

    const formattedData = data.map((income) => ({
        ...income,
        Amount: income.Amount.toNumber(), // Convert Decimal to number
    }));

    const totalIncome = formattedData.reduce((sum, item) => sum + item.Amount, 0);
    const incomeCount = formattedData.length;
    const averageIncome = incomeCount > 0 ? totalIncome / incomeCount : 0;
    const highestIncome = formattedData.reduce((max, item) => Math.max(max, item.Amount), 0);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Incomes</h2>
                    <p className="text-muted-foreground">
                        Manage and track your income sources and transactions.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/incomes/new">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Income
                        </Link>
                    </Button>
                </div>
            </div>

            <IncomeStats
                totalIncome={totalIncome}
                incomeCount={incomeCount}
                averageIncome={averageIncome}
                highestIncome={highestIncome}
            />

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Incomes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable 
                            columns={columns} 
                            data={formattedData} 
                            filterKeys={[
                                { id: "Category", title: "Category" },
                                { id: "Description", title: "Description" },
                                { id: "People", title: "People" },
                            ]} 
                            initialColumnVisibility={{
                                SubCategory: false,
                                IncomeDetail: false,
                                Description: false,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}



