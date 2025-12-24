import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExpenseStats } from "@/components/expenses/expense-stats";

export default async function ExpensesPage() {
    const data = await prisma.expenses.findMany({
        orderBy: {
            ExpenseDate: 'desc'
        },
        include: {
            categories: true,
            sub_categories: true,
            peoples: true,
            projects: true,
        }
    });

    const formattedData = data.map((expense) => ({
        ...expense,
        Amount: expense.Amount.toNumber(), 
    }));

    const totalExpense = formattedData.reduce((sum, item) => sum + item.Amount, 0);
    const expenseCount = formattedData.length;
    const averageExpense = expenseCount > 0 ? totalExpense / expenseCount : 0;
    const highestExpense = formattedData.reduce((max, item) => Math.max(max, item.Amount), 0);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
                    <p className="text-muted-foreground">
                        Manage and track your expense records and transactions.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/expenses/new">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Expense
                        </Link>
                    </Button>
                </div>
            </div>

            <ExpenseStats
                totalExpense={totalExpense}
                expenseCount={expenseCount}
                averageExpense={averageExpense}
                highestExpense={highestExpense}
            />

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Expenses</CardTitle>
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
                                ExpenseDetail: false,
                                Description: false,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
