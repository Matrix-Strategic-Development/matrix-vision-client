"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const shiftData = [
    {
        shift: "Morning",
        workers: 45,
        productivity: 82.5,
        incidents: 1,
    },
    {
        shift: "Afternoon",
        workers: 52,
        productivity: 78.3,
        incidents: 3,
    },
    {
        shift: "Night",
        workers: 28,
        productivity: 71.2,
        incidents: 2,
    },
]

const chartConfig = {
    workers: {
        label: "Workers",
        color: "hsl(var(--chart-1))",
    },
    productivity: {
        label: "Productivity %",
        color: "hsl(var(--chart-2))",
    },
    incidents: {
        label: "Incidents",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

export function ShiftComparison() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Shift Comparison</CardTitle>
                <CardDescription>
                    Performance metrics across different work shifts
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={shiftData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="shift"
                            className="text-xs"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            className="text-xs"
                            tickLine={false}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="workers" fill="var(--color-workers)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="productivity" fill="var(--color-productivity)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="incidents" fill="var(--color-incidents)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
