import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-8 w-[200px]" />
      </div>
      <Card className="w-full md:w-[85%] mx-auto shadow-lg border-1">
        <CardContent className="p-6">
          <div className="space-y-6">
             {/* 6 inputs grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            {/* 2 large cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="h-full border shadow-sm">
                   <CardContent className="p-6 space-y-4">
                       <div className="space-y-2">
                           <Skeleton className="h-4 w-[150px]" />
                           <Skeleton className="h-10 w-full" />
                       </div>
                       <div className="space-y-2">
                           <Skeleton className="h-4 w-[150px]" />
                           <Skeleton className="h-32 w-full" />
                       </div>
                   </CardContent>
               </Card>
               <Card className="h-full border shadow-sm">
                   <CardContent className="p-6 space-y-4">
                       <div className="space-y-2">
                           <Skeleton className="h-4 w-[150px]" />
                           <Skeleton className="h-10 w-full" />
                       </div>
                       <div className="space-y-2">
                           <Skeleton className="h-4 w-[100px]" />
                           <Skeleton className="h-20 w-full" />
                       </div>
                   </CardContent>
               </Card>
            </div>

            <div className="flex justify-end pt-4">
               <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
