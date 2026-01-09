
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, User, Phone, Mail, FileText, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function PeopleDetailPage({ params }: PageProps) {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) notFound()

    const person = await prisma.peoples.findUnique({
        where: { PeopleID: id },
        include: {
            users: true,
            expenses: {
                orderBy: { ExpenseDate: 'desc' }
            },
            incomes: {
                orderBy: { IncomeDate: 'desc' }
            }
        }
    })

    if (!person) notFound()

    // Calculate Stats
    const totalPaid = person.expenses.reduce((sum, item) => sum + Number(item.Amount), 0)
    const totalReceived = person.incomes.reduce((sum, item) => sum + Number(item.Amount), 0)
    const netBalance = totalReceived - totalPaid

    // Merge and Sort Transactions
    const transactions = [
        ...person.expenses.map(e => ({ ...e, type: 'expense', date: e.ExpenseDate, detail: e.ExpenseDetail })),
        ...person.incomes.map(i => ({ ...i, type: 'income', date: i.IncomeDate, detail: i.IncomeDetail }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0 text-slate-800 dark:text-slate-200">
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8">
                    <Link href="/admin/people">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex items-center gap-3">
                     <div className="h-10 w-10">
                        <Logo 
                            path={person.users?.ProfileImage} 
                            alt={person.PeopleName} 
                            fallbackClassName="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border"
                            fallbackIcon={<User className="h-5 w-5" />}
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">{person.PeopleName}</h1>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>ID: {person.PeopleCode || person.PeopleID}</span>
                            {person.IsActive !== false && (
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-emerald-200 text-emerald-600 bg-emerald-50">Active</Badge>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Info & Stats */}
                <div className="space-y-6 md:col-span-1">
                    {/* Contact Info Card */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Contact Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="h-8 w-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 dark:bg-orange-950/30 dark:border-orange-900/50">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Mobile</p>
                                    <p className="font-medium">{person.MobileNo}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/50">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <p className="font-medium break-all">{person.Email}</p>
                                </div>
                            </div>
                             {person.Description && (
                                <div className="flex items-start gap-3 text-sm pt-2 border-t">
                                    <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800 shrink-0">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed translate-y-1">
                                        {person.Description}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Financial Summary */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Financial Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                    <span>Total Paid To</span>
                                </div>
                                <span className="font-bold text-slate-900 dark:text-slate-100">
                                    {formatCurrency(totalPaid)}
                                </span>
                            </div>
                            <div className="p-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                                    <span>Total Received</span>
                                </div>
                                <span className="font-bold text-slate-900 dark:text-slate-100">
                                    {formatCurrency(totalReceived)}
                                </span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-sm font-medium">Net Balance</span>
                                <span className={cn(
                                    "font-bold text-lg",
                                    netBalance > 0 ? "text-emerald-600" : netBalance < 0 ? "text-red-600" : "text-slate-600"
                                )}>
                                    {netBalance > 0 ? "+" : ""}{formatCurrency(netBalance)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Transactions */}
                <div className="md:col-span-2">
                    <Card className="h-full flex flex-col">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Transaction History</CardTitle>
                                <Badge variant="secondary" className="font-normal">{transactions.length} Records</Badge>
                            </div>
                            <CardDescription>Recent financial activities with this person</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-auto">
                            {transactions.length > 0 ? (
                                <div className="space-y-4">
                                    {transactions.map((t, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "h-10 w-10 rounded-full flex items-center justify-center border transition-colors",
                                                    t.type === 'expense' 
                                                        ? "bg-red-50 border-red-100 text-red-600 dark:bg-red-950/20 dark:border-red-900/30" 
                                                        : "bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/30"
                                                )}>
                                                    {t.type === 'expense' ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {t.detail || (t.type === 'expense' ? "Expense Payment" : "Income Received")}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        {format(new Date(t.date), "MMM d, yyyy")}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={cn(
                                                    "font-bold text-sm",
                                                    t.type === 'expense' ? "text-red-600" : "text-emerald-600"
                                                )}>
                                                    {t.type === 'expense' ? "-" : "+"}{formatCurrency(Number(t.Amount))}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-40 flex flex-col items-center justify-center text-slate-400 text-sm">
                                    <FileText className="h-8 w-8 mb-2 opacity-20" />
                                    No transaction history found.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// Helper for class merging if not imported from utility
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
