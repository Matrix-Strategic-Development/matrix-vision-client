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
    { zone: "Зона А", value: 3200, fill: "var(--chart-1)" },
    { zone: "Зона Б", value: 1800, fill: "var(--chart-2)" },
    { zone: "Зона В", value: 2400, fill: "var(--chart-3)" },
    { zone: "Зона Г", value: 1500, fill: "var(--chart-4)" },
    { zone: "Сборочная линия 1", value: 3500, fill: "var(--chart-5)" },
    { zone: "Сборочная линия 2", value: 2900, fill: "var(--chart-1)" },
    { zone: "Складская зона", value: 2100, fill: "var(--chart-2)" },
    { zone: "Погрузочная зона", value: 1600, fill: "var(--chart-3)" },
]

const chartConfig = {
    value: {
        label: "Количество активности",
    },
    "Зона А": { label: "Зона А", color: "var(--chart-1)" },
    "Зона Б": { label: "Зона Б", color: "var(--chart-2)" },
    "Зона В": { label: "Зона В", color: "var(--chart-3)" },
    "Зона Г": { label: "Зона Г", color: "var(--chart-4)" },
    "Сборочная линия 1": { label: "Сборочная линия 1", color: "var(--chart-5)" },
    "Сборочная линия 2": { label: "Сборочная линия 2", color: "var(--chart-1)" },
    "Складская зона": { label: "Складская зона", color: "var(--chart-2)" },
    "Погрузочная зона": { label: "Погрузочная зона", color: "var(--chart-3)" },
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
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
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
