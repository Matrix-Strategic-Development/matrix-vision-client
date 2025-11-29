"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"
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

const chartConfig = {
    total_workers: {
        label: "Работников",
        color: "var(--chart-1)",
    },
    total_detections: {
        label: "Детекций",
        color: "var(--chart-2)",
    },
    activity_rate: {
        label: "Активность %",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

const shiftLabels: Record<string, string> = {
    morning: "Утренняя",
    day: "Дневная",
    evening: "Вечерняя",
    night: "Ночная",
}

export function ShiftComparison() {
    const { data, loading } = useDashboardData()

    const shiftData = useMemo(() => {
        if (!data?.shift_comparison) return []

        return Object.entries(data.shift_comparison).map(([shift, stats]: [string, any]) => ({
            shift: shiftLabels[shift] || shift,
            total_workers: stats.total_workers || 0,
            total_detections: stats.total_detections || 0,
            activity_rate: (stats.activity_rate || 0) * 100,
        }))
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
                <CardTitle>Сравнение смен</CardTitle>
                <CardDescription>
                    Показатели активности по разным сменам в выбранном видео
                </CardDescription>
            </CardHeader>
            <CardContent>
                {shiftData.length === 0 ? (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                        Нет данных по сменам
                    </div>
                ) : (
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
                            <Bar dataKey="total_workers" fill="var(--color-total_workers)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="total_detections" fill="var(--color-total_detections)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="activity_rate" fill="var(--color-activity_rate)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
