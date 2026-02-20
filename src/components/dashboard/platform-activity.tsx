"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface PlatformActivityProps {
    data: { name: string; incomes: number; expenses: number }[];
}

export function PlatformActivity({ data }: PlatformActivityProps) {
    if (!data || data.length === 0) {
        return (
            <Card className="col-span-4 hover:shadow-lg transition-shadow duration-200 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                    <CardTitle>Platform Activity</CardTitle>
                    <CardDescription>
                        Transaction records added over the last 6 months.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-[220px] text-center text-muted-foreground">
                        <p>No activity data available.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-4 hover:shadow-lg transition-shadow duration-200 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>
                    Transaction records added over the last 6 months.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full whitespace-nowrap md:overflow-x-hidden">
                    <div className="h-[220px] min-w-[500px] md:min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" className="dark:stroke-zinc-800" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    padding={{ left: 10, right: 10 }}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    content={({ active, payload, label }: any) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-3 shadow-xl dark:border-zinc-800">
                                                    <p className="text-[0.75rem] uppercase text-muted-foreground font-semibold mb-2">{label}</p>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-muted-foreground text-xs uppercase">
                                                                Incomes
                                                            </span>
                                                            <span className="font-bold text-blue-500">
                                                                {payload[0].value} records
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-muted-foreground text-xs uppercase">
                                                                Expenses
                                                            </span>
                                                            <span className="font-bold text-orange-500">
                                                                {payload[1].value} records
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Legend 
                                    verticalAlign="top" 
                                    height={24}
                                    iconType="circle"
                                    formatter={(value) => <span className="text-sm font-medium text-foreground">{value.charAt(0).toUpperCase() + value.slice(1)}</span>}
                                />
                                <Bar
                                    dataKey="incomes"
                                    fill="oklch(0.6 0.118 258.336)"
                                    radius={[4, 4, 0, 0]}
                                    barSize={20}
                                />
                                <Bar
                                    dataKey="expenses"
                                    fill="oklch(0.648 0.2 31.396)"
                                    radius={[4, 4, 0, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
