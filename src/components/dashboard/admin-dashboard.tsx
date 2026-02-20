import { Overview } from "@/components/dashboard/overview";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { MonthlyTrends } from "@/components/dashboard/monthly-trends";
import { PlatformActivity } from "@/components/dashboard/platform-activity";
import { StatisticalInfo } from "@/components/dashboard/statistical-info";
import { RecentAdditions } from "@/components/dashboard/recent-additions";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { 
    getDashboardStats, 
    getChartData, 
    getRecentTransactions,
    getSpendingByCategory,
    getIncomeByCategory,
    getMonthlyTrends,
    getPlatformActivity,
    getStatisticalInfo,
    getRecentAdditions
} from "@/lib/dashboard-data";

export async function AdminDashboard() {
    // Admin dashboard fetches platform-wide statistics
    const [stats, chartData, recentTransactions, spendingByCategory, incomeByCategory, monthlyTrends, activityData, statisticalData, recentAdditions] = await Promise.all([
        getDashboardStats(),
        getChartData(),
        getRecentTransactions(),
        getSpendingByCategory(),
        getIncomeByCategory(),
        getMonthlyTrends(),
        getPlatformActivity(),
        getStatisticalInfo(),
        getRecentAdditions()
    ]);

    return (
        <div className="flex-1 space-y-4 px-3 py-6 md:p-8 md:pt-6 animate-in fade-in duration-500 overflow-x-hidden">
            <div className="flex items-center justify-between space-y-2 px-1 md:px-0">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                    Admin Dashboard
                </h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
                        <Download className="mr-2 h-4 w-4" />
                        Download Global Report
                    </Button>
                </div>
            </div>
            
            <StatsCards data={stats} />
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Overview data={chartData} />
                <CategoryBreakdown expenses={spendingByCategory} incomes={incomeByCategory} />
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-8">
                <StatisticalInfo data={statisticalData} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <MonthlyTrends data={monthlyTrends} />
                <PlatformActivity data={activityData} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <RecentTransactions transactions={recentTransactions} />
                </div>
                <RecentAdditions data={recentAdditions} />
            </div>
        </div>
    );
}
