import React from "react";
import { CategoryBreakdown } from "@/components/reports/category-breakdown";
import { MonthlyTrends } from "@/components/reports/monthly-trends";
import { TransactionsTable } from "@/components/reports/transactions-table";
import { Button } from "@/components/ui/button";
import { Download, Share } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                     <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
                     <p className="text-muted-foreground">Detailed breakdown of your financial health.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <MonthlyTrends />
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                 <CategoryBreakdown />
                 <div className="col-span-4 md:col-span-4 lg:col-span-3">
                     {/* Space for another small widget or summaries, for now empty to balance grid */}
                 </div>
            </div>
            
            <div className="space-y-4">
                 <h3 className="text-xl font-semibold tracking-tight">Recent Financial Activity</h3>
                 <TransactionsTable />
            </div>
        </div>
    );
}
