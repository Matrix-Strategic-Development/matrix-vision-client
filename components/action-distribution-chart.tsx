"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
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

const actionData = [
    { action: "Ходьба", count: 12450, color: "hsl(var(--chart-1))" },
    { action: "Стояние", count: 18230, color: "hsl(var(--chart-2))" },
    { action: "Подъем", count: 6780, color: "hsl(var(--chart-3))" },
    { action: "Наклон", count: 5420, color: "hsl(var(--chart-4))" },
    { action: "Перенос", count: 3890, color: "hsl(var(--chart-5))" },
    { action: "Сидение", count: 2340, color: "hsl(var(--primary))" },
    { action: "Дотягивание", count: 1890, color: "hsl(var(--chart-1))" },
]

const chartConfig = {
    count: {
        label: "Обнаружения",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export function ActionDistributionChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Распределение действий</CardTitle>
                <CardDescription>
                    Общее количество обнаруженных действий во всех видео
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={actionData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="action"
                            className="text-xs"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            className="text-xs"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
