"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

function formatRupee(value: number): string {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
    return `₹${value.toFixed(2)}`;
}

interface ProjectAllocationProps {
    data: { subject: string; amount: number; fullMark: number }[];
}

export function ProjectAllocation({ data }: ProjectAllocationProps) {
    if (!data || data.length === 0) {
        return (
            <Card className="col-span-3 hover:shadow-lg transition-shadow duration-200 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                    <CardTitle>Project Allocation</CardTitle>
                    <CardDescription>
                        Expense distribution across active projects.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-[220px] text-center text-muted-foreground">
                        <p>No project expenses found.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-3 hover:shadow-lg transition-shadow duration-200 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle>Project Allocation</CardTitle>
                <CardDescription>
                    Expense distribution across active projects.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full whitespace-nowrap md:overflow-x-hidden">
                    <div className="h-[220px] min-w-[400px] md:min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                <PolarGrid stroke="#e5e5e5" className="dark:stroke-zinc-800" />
                                <PolarAngleAxis 
                                    dataKey="subject" 
                                    tick={{ fill: '#888888', fontSize: 11 }}
                                />
                                <PolarRadiusAxis 
                                    angle={30} 
                                    domain={[0, 'dataMax']} 
                                    tick={false} 
                                    axisLine={false}
                                />
                                <Tooltip
                                    content={({ active, payload }: any) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-xl dark:border-zinc-800">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground font-semibold">
                                                            {payload[0].payload.subject}
                                                        </span>
                                                        <span className="font-bold text-orange-500">
                                                            {formatRupee(payload[0].value)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Radar
                                    name="Expenses"
                                    dataKey="amount"
                                    stroke="oklch(0.648 0.2 31.396)"
                                    fill="oklch(0.648 0.2 31.396)"
                                    fillOpacity={0.5}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
