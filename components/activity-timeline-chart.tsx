"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
    walking: {
        label: "Ходьба",
        color: "var(--chart-1)",
    },
    standing: {
        label: "Стояние",
        color: "var(--chart-2)",
    },
    lifting: {
        label: "Подъем",
        color: "var(--chart-3)",
    },
    bending: {
        label: "Наклон",
        color: "var(--chart-4)",
    },
    carrying: {
        label: "Перенос",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function ActivityTimelineChart() {
    const [timeRange, setTimeRange] = React.useState("24h")
    const { data, loading } = useDashboardData()

    const chartData = React.useMemo(() => {
        if (!data?.time_series) return []

        return data.time_series.map((item, index) => {
            const seconds = item.timestamp
            const minutes = Math.floor(seconds / 60)
            const time = `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`

            return {
                time,
                walking: item.actions?.walking || 0,
                standing: item.actions?.standing || 0,
                lifting: item.actions?.lifting || 0,
                bending: item.actions?.bending || 0,
                carrying: item.actions?.carrying || 0,
                sitting: item.actions?.sitting || 0,
            }
        })
    }, [data])

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-96 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Временная шкала активности</CardTitle>
                    <CardDescription>
                        Паттерны активности работников в течение видео
                    </CardDescription>
                </div>
                <div className="flex">
                    <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Выберите период" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="24h">Всё видео</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[300px] w-full"
                >
                    <AreaChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} className="stroke-muted" />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="actions"
                                    labelFormatter={(value) => `Время: ${value}`}
                                />
                            }
                        />
                        <Area
                            dataKey="walking"
                            type="monotone"
                            fill="var(--color-walking)"
                            fillOpacity={0.4}
                            stroke="var(--color-walking)"
                            stackId="a"
                        />
                        <Area
                            dataKey="standing"
                            type="monotone"
                            fill="var(--color-standing)"
                            fillOpacity={0.4}
                            stroke="var(--color-standing)"
                            stackId="a"
                        />
                        <Area
                            dataKey="lifting"
                            type="monotone"
                            fill="var(--color-lifting)"
                            fillOpacity={0.4}
                            stroke="var(--color-lifting)"
                            stackId="a"
                        />
                        <Area
                            dataKey="bending"
                            type="monotone"
                            fill="var(--color-bending)"
                            fillOpacity={0.4}
                            stroke="var(--color-bending)"
                            stackId="a"
                        />
                        <Area
                            dataKey="carrying"
                            type="monotone"
                            fill="var(--color-carrying)"
                            fillOpacity={0.4}
                            stroke="var(--color-carrying)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
