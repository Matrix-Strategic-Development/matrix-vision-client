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
    { zone: "Зона А", value: 3200, color: "hsl(var(--chart-1))" },
    { zone: "Зона Б", value: 1800, color: "hsl(var(--chart-2))" },
    { zone: "Зона В", value: 2400, color: "hsl(var(--chart-3))" },
    { zone: "Зона Г", value: 1500, color: "hsl(var(--chart-4))" },
    { zone: "Сборочная линия 1", value: 3500, color: "hsl(var(--chart-5))" },
    { zone: "Сборочная линия 2", value: 2900, color: "hsl(var(--primary))" },
    { zone: "Складская зона", value: 2100, color: "hsl(var(--chart-1))" },
    { zone: "Погрузочная зона", value: 1600, color: "hsl(var(--chart-2))" },
]

const chartConfig = {
    value: {
        label: "Количество активности",
    },
} satisfies ChartConfig

export function ZoneHeatmap() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Тепловая карта активности по зонам</CardTitle>
                <CardDescription>
                    Распределение активности работников по зонам завода
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
