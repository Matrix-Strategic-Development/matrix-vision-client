"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { useMemo } from "react"
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

const CHART_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
]

const chartConfig = {
    value: {
        label: "Количество активности",
    },
} satisfies ChartConfig

export function ZoneHeatmap() {
    const { data, loading } = useDashboardData()

    const zoneData = useMemo(() => {
        if (!data?.zone_heatmap) return []

        return data.zone_heatmap.map((item, index) => ({
            zone: item.zone,
            value: item.activity_count,
            fill: CHART_COLORS[index % CHART_COLORS.length]
        }))
    }, [data])

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-80 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[350px] w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Тепловая карта активности по зонам</CardTitle>
                <CardDescription>
                    Распределение активности работников по зонам в выбранном видео
                </CardDescription>
            </CardHeader>
            <CardContent>
                {zoneData.length === 0 ? (
                    <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                        Нет данных по зонам
                    </div>
                ) : (
                    <div className="h-[350px] w-full">
                        <ChartContainer config={chartConfig} className="h-full w-full">
                            <PieChart>
                                <ChartTooltip
                                    content={<ChartTooltipContent
                                        formatter={(value, name) => [
                                            `${value} детекций`,
                                            name
                                        ]}
                                    />}
                                />
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
                )}
            </CardContent>
        </Card>
    )
}
