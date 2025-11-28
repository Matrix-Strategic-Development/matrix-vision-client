"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts"
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

const zoneData = [
    { zone: "Zone A", value: 3200, color: "hsl(var(--chart-1))" },
    { zone: "Zone B", value: 1800, color: "hsl(var(--chart-2))" },
    { zone: "Zone C", value: 2400, color: "hsl(var(--chart-3))" },
    { zone: "Zone D", value: 1500, color: "hsl(var(--chart-4))" },
    { zone: "Assembly Line 1", value: 3500, color: "hsl(var(--chart-5))" },
    { zone: "Assembly Line 2", value: 2900, color: "hsl(var(--primary))" },
    { zone: "Storage Area", value: 2100, color: "hsl(var(--chart-1))" },
    { zone: "Loading Dock", value: 1600, color: "hsl(var(--chart-2))" },
]

const chartConfig = {
    value: {
        label: "Activity Count",
    },
} satisfies ChartConfig

export function ZoneHeatmap() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Zone Activity Heatmap</CardTitle>
                <CardDescription>
                    Distribution of worker activity across factory zones
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Pie
                                data={zoneData}
                                dataKey="value"
                                nameKey="zone"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ zone, value }) => `${zone}: ${value}`}
                                labelLine={false}
                            >
                                {zoneData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}
