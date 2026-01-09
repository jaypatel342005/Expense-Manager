
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RelatedTransactionsProps {
    expenses: any[];
    incomes: any[];
}

export function RelatedTransactions({ expenses, incomes }: RelatedTransactionsProps) {
    return (
        <Card className="h-full border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Recent financial activity for this project</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <Tabs defaultValue="expenses" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="expenses" className="data-[state=active]:bg-rose-100 data-[state=active]:text-rose-900 dark:data-[state=active]:bg-rose-900/20 dark:data-[state=active]:text-rose-300">
                            Expenses ({expenses.length})
                        </TabsTrigger>
                        <TabsTrigger value="incomes" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900 dark:data-[state=active]:bg-emerald-900/20 dark:data-[state=active]:text-emerald-300">
                            Income ({incomes.length})
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="expenses" className="space-y-4">
                        {expenses.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
                                <p>No expenses recorded yet.</p>
                            </div>
                        ) : (
                            <ScrollArea className="h-[400px] pr-4">
                                <div className="grid gap-3">
                                    {expenses.map((expense) => (
                                        <Link key={expense.ExpenseID} href={`/expenses/${expense.ExpenseID}`} className="block group">
                                            <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-all hover:border-primary/20 hover:shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                                                        <ArrowUpRight className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                                                            {expense.ExpenseDetail || expense.categories?.CategoryName || "Expense"}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {format(new Date(expense.ExpenseDate), "MMM d")}
                                                            </span>
                                                            {expense.categories && (
                                                                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                                                                    {expense.categories.CategoryName}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-rose-600 dark:text-rose-400">
                                                        -{formatCurrency(Number(expense.Amount))}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </TabsContent>
                    
                    <TabsContent value="incomes" className="space-y-4">
                         {incomes.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
                                <p>No income recorded yet.</p>
                            </div>
                        ) : (
                             <ScrollArea className="h-[400px] pr-4">
                                 <div className="grid gap-3">
                                    {incomes.map((income) => (
                                        <div key={income.IncomeID} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-all hover:border-primary/20 hover:shadow-sm group cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                                    <ArrowDownLeft className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                                                        {income.IncomeDetail || income.categories?.CategoryName || "Income"}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {format(new Date(income.IncomeDate), "MMM d")}
                                                        </span>
                                                         {income.categories && (
                                                            <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                                                                {income.categories.CategoryName}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                                                    +{formatCurrency(Number(income.Amount))}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </ScrollArea>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
