"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { useDashboardData } from "@/hooks/use-dashboard-data"
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
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo } from "react"

const actionLabels: Record<string, string> = {
    walking: "Ходьба",
    standing: "Стояние",
    lifting: "Подъем",
    bending: "Наклон",
    carrying: "Перенос",
    sitting: "Сидение",
    reaching: "Дотягивание",
    falling: "Падение"
}

const chartConfig = {
    count: {
        label: "Обнаружения",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ActionDistributionChart() {
    const { data, loading } = useDashboardData()

    const actionData = useMemo(() => {
        if (!data?.action_distribution) return []

        return data.action_distribution.map(item => ({
            action: actionLabels[item.action] || item.action,
            count: item.count,
            percentage: item.percentage
        })).sort((a, b) => b.count - a.count)
    }, [data])

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Распределение действий</CardTitle>
                <CardDescription>
                    Общее количество обнаруженных действий в выбранном видео
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
                            tickFormatter={(value) => value > 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString()}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent
                                formatter={(value, name, props) => [
                                    `${value} (${props.payload.percentage?.toFixed(1)}%)`,
                                    name
                                ]}
                            />}
                        />
                        <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
