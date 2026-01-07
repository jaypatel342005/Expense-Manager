import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <Skeleton className="h-8 w-[150px]" />
                    <Skeleton className="h-4 w-[250px] mt-2" />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-[60px] mb-1" />
                            <Skeleton className="h-3 w-[120px]" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
                <Card className="col-span-1 md:col-span-2 lg:col-span-4 border-0 shadow-none">
                    <CardHeader className="px-0">
                        <Skeleton className="h-6 w-[150px]" />
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-10 w-[300px]" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="flex flex-col space-y-3 rounded-xl border p-4 shadow-sm">
                                        <div className="flex flex-row items-center justify-between">
                                            <div className="space-y-2">
                                                <Skeleton className="h-5 w-[120px]" />
                                                <Skeleton className="h-3 w-[80px]" />
                                            </div>
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                        </div>
                                        <div className="space-y-2 pt-4">
                                            <Skeleton className="h-3 w-[60px]" />
                                            <div className="flex gap-2">
                                                <Skeleton className="h-5 w-12 rounded-full" />
                                                <Skeleton className="h-5 w-12 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
