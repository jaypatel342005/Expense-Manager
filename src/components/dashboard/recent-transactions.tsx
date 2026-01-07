import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Transaction } from "@/types/dashboard"
import { format } from "date-fns"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

// Mock Data matching Schema
const recentTransactions: Transaction[] = [
    {
        type: 'income',
        IncomeID: 1,
        IncomeDate: new Date().toISOString(),
        Amount: 5000,
        IncomeDetail: "Freelance Project Payment",
        category: { CategoryID: 1, CategoryName: "Freelance", IsIncome: true, IsExpense: false },
        project: { ProjectID: 101, ProjectName: "Website Redesign" }
    },
     {
        type: 'expense',
        ExpenseID: 1,
        ExpenseDate: new Date().toISOString(),
        Amount: 120,
        ExpenseDetail: "Office Supplies",
        category: { CategoryID: 2, CategoryName: "Office", IsIncome: false, IsExpense: true },
        project: { ProjectID: 101, ProjectName: "Website Redesign" }
    },
    {
        type: 'expense',
        ExpenseID: 2,
        ExpenseDate: new Date(Date.now() - 86400000).toISOString(),
        Amount: 15.50,
        ExpenseDetail: "Coffee Meeting",
        category: { CategoryID: 3, CategoryName: "Food", IsIncome: false, IsExpense: true }
    },
     {
        type: 'expense',
        ExpenseID: 3,
        ExpenseDate: new Date(Date.now() - 172800000).toISOString(),
        Amount: 2500,
        ExpenseDetail: "Monthly Rent",
        category: { CategoryID: 4, CategoryName: "Rent", IsIncome: false, IsExpense: true }
    },
      {
        type: 'income',
        IncomeID: 2,
        IncomeDate: new Date(Date.now() - 250000000).toISOString(),
        Amount: 200,
        IncomeDetail: "Refund",
        category: { CategoryID: 99, CategoryName: "Refund", IsIncome: true, IsExpense: false }
    },
]

export function RecentTransactions() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                    Latest financial activity from all sources.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {recentTransactions.map((tx, i) => {
                        const isExpense = tx.type === 'expense';
                        const amount = isExpense ? (tx as any).Amount : (tx as any).Amount;
                        const detail = isExpense ? (tx as any).ExpenseDetail : (tx as any).IncomeDetail;
                        const date = isExpense ? (tx as any).ExpenseDate : (tx as any).IncomeDate;
                        const categoryName = tx.category?.CategoryName || "Uncategorized";
                        
                        return (
                             <div key={i} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className={isExpense ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}>
                                        {isExpense ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{detail}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {categoryName} • {format(new Date(date), "MMM d, yyyy")}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    {isExpense ? "-" : "+"}${amount.toFixed(2)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
