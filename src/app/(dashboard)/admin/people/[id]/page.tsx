import { prisma } from "@/lib/prisma"
import { serializeData } from "@/lib/serialization"
import { notFound } from "next/navigation"
import { PeopleDetailHeader } from "@/components/people/people-detail-header"
import { PeopleFinancials } from "@/components/people/people-financials"
import { PeopleRelatedTransactions } from "@/components/people/people-related-transactions"
import { ProjectExpenseBreakdown } from "@/components/projects/project-expense-breakdown"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Phone, Mail, FileText, Calendar, User, PieChart } from "lucide-react"

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
                orderBy: { ExpenseDate: 'desc' },
                include: {
                    categories: true
                }
            },
            incomes: {
                orderBy: { IncomeDate: 'desc' },
                include: {
                    categories: true
                }
            }
        }
    })

    if (!person) notFound()

    const serializedPerson = serializeData(person)

    return (
        <div className="flex flex-col min-h-screen w-full bg-muted/5 anime-fade-in">
            {/* Header */}
            <PeopleDetailHeader person={serializedPerson} />

            <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 md:p-6 flex flex-col gap-6">
                
                {/* Financial Overview */}
                <section className="shrink-0">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 px-1">
                        <FileText className="h-5 w-5 text-indigo-500" />
                        Financial Overview
                    </h3>
                    <PeopleFinancials expenses={serializedPerson.expenses} incomes={serializedPerson.incomes} />
                </section>

                {/* Main Content Grid 2 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                    {/* Left Column: Details & Analytics (3 cols - 60%) */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        
                        {/* Personal Details Card */}
                        <Card className="shadow-md bg-gradient-to-br from-white/90 to-muted/50 dark:from-card/90 dark:to-muted/20 backdrop-blur-xl relative overflow-hidden transition-all hover:shadow-lg group border border-transparent hover:border-primary/30">
                            <div className="absolute top-0 right-0 p-4 opacity-50">
                                <User className="h-64 w-64 text-primary/5 absolute -top-10 -right-10 rotate-12 pointer-events-none" />
                            </div>
                            <CardHeader className="relative z-10 pb-2">
                                <CardTitle className="flex items-center gap-2 text-base font-semibold group-hover:text-primary transition-colors">
                                    <div className="p-1.5 bg-primary/10 rounded group-hover:bg-primary/20 transition-colors">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                    About Person
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-4 relative z-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Phone */}
                                    <div className="flex items-start gap-3 group/item">
                                        <div className="h-8 w-8 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 transition-colors border border-orange-100 dark:bg-orange-900/20 dark:border-orange-900/50 group-hover/item:bg-orange-100 dark:group-hover/item:bg-orange-900/40">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Mobile Number</p>
                                            <p className="font-semibold text-sm">
                                                {serializedPerson.MobileNo || "Not Provided"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-3 group/item">
                                        <div className="h-8 w-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 transition-colors border border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50 group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-900/40">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Email Address</p>
                                            <p className="font-semibold text-sm truncate" title={serializedPerson.Email || ""}>
                                                {serializedPerson.Email || "Not Provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Notes & Description</h4>
                                    <p className="text-sm leading-relaxed text-foreground/80">
                                        {serializedPerson.Description || "No notes provided for this person."}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Analytics */}
                         <Card className="shadow-md bg-gradient-to-br from-white/90 to-muted/50 dark:from-card/90 dark:to-muted/20 backdrop-blur-xl relative overflow-hidden transition-all hover:shadow-lg group border border-transparent hover:border-primary/30">
                            <div className="absolute top-0 right-0 p-4 opacity-50">
                                <PieChart className="h-64 w-64 text-primary/5 absolute -top-10 -right-10 minus-rotate-12 pointer-events-none" />
                            </div>
                            <CardHeader className="relative z-10">
                                <CardTitle className="flex items-center gap-2 text-base group-hover:text-primary transition-colors">
                                    <div className="p-1.5 bg-primary/10 rounded group-hover:bg-primary/20 transition-colors">
                                        <PieChart className="h-4 w-4 text-primary" />
                                    </div>
                                    Analytics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <ProjectExpenseBreakdown expenses={serializedPerson.expenses} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Transactions (2 col - 40%) */}
                    <div className="lg:col-span-1 h-full min-h-0">
                        <PeopleRelatedTransactions expenses={serializedPerson.expenses} incomes={serializedPerson.incomes} />
                    </div>
                </div>
            </main>
        </div>
    )
}

// Helper for class merging if not imported from utility
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
