
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { PieChart, TrendingDown } from "lucide-react";

interface ProjectExpenseBreakdownProps {
    expenses: any[];
}

export function ProjectExpenseBreakdown({ expenses }: ProjectExpenseBreakdownProps) {
    if (!expenses || expenses.length === 0) return null;

    const categoryTotals: Record<string, number> = {};
    let totalExpenses = 0;

    expenses.forEach(expense => {
        const categoryName = expense.categories?.CategoryName || "Uncategorized";
        const amount = Number(expense.Amount);
        categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + amount;
        totalExpenses += amount;
    });

    const sortedCategories = Object.entries(categoryTotals)
        .map(([name, amount]) => ({ name, amount, percentage: (amount / totalExpenses) * 100 }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5); 

    return (
        <Card className="h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-primary" />
                    Expense Breakdown
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
                {sortedCategories.map((cat, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium truncate max-w-[150px]">{cat.name}</span>
                            <span className="text-muted-foreground">{formatCurrency(cat.amount)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Progress value={cat.percentage} className="h-2" />
                            <span className="text-xs text-muted-foreground w-9 text-right">{Math.round(cat.percentage)}%</span>
                        </div>
                    </div>
                ))}
                
                {sortedCategories.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground text-sm">
                        No expense data available.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
