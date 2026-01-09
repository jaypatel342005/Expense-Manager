
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectDetailHeader } from "@/components/projects/project-detail-header";
import { ProjectFinancials } from "@/components/projects/project-financials";
import { RelatedTransactions } from "@/components/projects/related-transactions";
import { ProjectExpenseBreakdown } from "@/components/projects/project-expense-breakdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, FileText, Activity } from "lucide-react";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
        return notFound();
    }

    const project = await prisma.projects.findUnique({
        where: {
            ProjectID: projectId,
        },
        include: {
            expenses: {
                orderBy: {
                    ExpenseDate: 'desc'
                },
                take: 50,
                include: {
                    categories: true
                }
            },
            incomes: {
                 orderBy: {
                    IncomeDate: 'desc'
                },
                take: 50,
                include: {
                    categories: true
                }
            }
        },
    });

    if (!project) {
        return notFound();
    }

    return (
        <div className="flex flex-col h-full w-full bg-muted/10 anime-fade-in overflow-hidden">
            <ProjectDetailHeader project={project} />

            <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 scrollbar-thin">
                <div className="max-w-7xl mx-auto space-y-6">
                    
                    {/* Financial Overview */}
                    <section>
                         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-indigo-500" />
                            Financial Overview
                        </h3>
                        <ProjectFinancials expenses={project.expenses} incomes={project.incomes} />
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Details & Breakdown */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Expense Breakdown */}
                            <ProjectExpenseBreakdown expenses={project.expenses} />

                            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <FileText className="h-4 w-4 text-primary" />
                                        Project Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-background/80 p-4 rounded-lg border">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Description</h4>
                                        <p className="text-sm leading-relaxed text-foreground/90">
                                            {project.Description || "No description provided."}
                                        </p>
                                    </div>
                                    
                                     {project.ProjectDetail && (
                                        <div className="bg-background/80 p-4 rounded-lg border">
                                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Additional Notes</h4>
                                            <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                                                {project.ProjectDetail}
                                            </p>
                                        </div>
                                     )}

                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-background/80 p-3 rounded-lg border flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground font-medium uppercase">Start Date</p>
                                                <p className="font-bold">
                                                     {project.ProjectStartDate ? format(new Date(project.ProjectStartDate), "PP") : "Not set"}
                                                </p>
                                            </div>
                                        </div>
                                         <div className="bg-background/80 p-3 rounded-lg border flex items-center gap-3">
                                             <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground font-medium uppercase">End Date</p>
                                                <p className="font-bold">
                                                     {project.ProjectEndDate ? format(new Date(project.ProjectEndDate), "PP") : "Ongoing"}
                                                </p>
                                            </div>
                                        </div>
                                     </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Transactions */}
                        <div className="lg:col-span-1">
                             <RelatedTransactions expenses={project.expenses} incomes={project.incomes} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
