import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { Button } from "@/components/ui/button"
// import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { Download } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          {/* CalendarDateRangePicker would go here, omitting for now to keep it simple or I can stub it */}
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
        <StatsCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview />
        <RecentTransactions />
      </div>
    </div>
  )
}
