"use client"

"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data = [
    { name: "Jan", total: 1500, income: 2400 },
    { name: "Feb", total: 2300, income: 3000 },
    { name: "Mar", total: 3200, income: 4500 },
    { name: "Apr", total: 4100, income: 4200 },
    { name: "May", total: 2800, income: 5100 },
    { name: "Jun", total: 4800, income: 6000 },
    { name: "Jul", total: 3500, income: 4800 },
    { name: "Aug", total: 2100, income: 3800 },
    { name: "Sep", total: 3900, income: 4300 },
    { name: "Oct", total: 2800, income: 3900 },
    { name: "Nov", total: 3400, income: 4600 },
    { name: "Dec", total: 1900, income: 3200 },
]

export function Overview() {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>
                    Compare your monthly income vs expenses.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="income">Income</TabsTrigger>
                        <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                         <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    content={({ active, payload, label }: any) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                {label}
                                                            </span>
                                                            <span className="font-bold text-muted-foreground">
                                                                Income
                                                            </span>
                                                            <span className="font-bold text-emerald-500">
                                                                ${payload[1].value}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                &nbsp;
                                                            </span>
                                                            <span className="font-bold text-muted-foreground">
                                                                Expenses
                                                            </span>
                                                            <span className="font-bold text-rose-500">
                                                                ${payload[0].value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="oklch(0.577 0.245 27.325)"
                                    radius={[4, 4, 0, 0]}
                                    className="fill-rose-500/80"
                                />
                                <Bar
                                    dataKey="income"
                                    fill="oklch(0.51 0.23 277)"
                                    radius={[4, 4, 0, 0]}
                                    className="fill-emerald-500"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="income" className="space-y-4">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="income" fill="oklch(0.51 0.23 277)" radius={[4, 4, 0, 0]} className="fill-emerald-500" />
                            </BarChart>
                        </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="expenses" className="space-y-4">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="total" fill="oklch(0.577 0.245 27.325)" radius={[4, 4, 0, 0]} className="fill-rose-500" />
                            </BarChart>
                        </ResponsiveContainer>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
