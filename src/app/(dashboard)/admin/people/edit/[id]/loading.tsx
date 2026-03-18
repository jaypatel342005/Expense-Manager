import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-6">
          <div>
              <Skeleton className="h-8 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[300px]" />
          </div>
          <Skeleton className="h-8 w-[100px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-[200px] mb-2" />
                    <Skeleton className="h-4 w-[300px]" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                             <Skeleton className="h-4 w-24" />
                             <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-[100px] w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                     <Skeleton className="h-6 w-16" />
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between space-x-2 border p-3 rounded-lg bg-muted/20">
                         <div className="space-y-0.5">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-40" />
                         </div>
                         <Skeleton className="h-6 w-10" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-3 pt-4">
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
            </div>
        </div>
      </div>
    </div>
  )
}
