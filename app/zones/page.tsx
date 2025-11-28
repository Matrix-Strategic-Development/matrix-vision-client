import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ZoneHeatmap } from "@/components/zone-heatmap"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const zones = [
    {
        name: "Зона А",
        status: "Активна",
        workers: 12,
        cameras: 4,
        activity: "Высокая",
        color: "green"
    },
    {
        name: "Зона Б",
        status: "Активна",
        workers: 8,
        cameras: 3,
        activity: "Средняя",
        color: "blue"
    },
    {
        name: "Зона В",
        status: "Активна",
        workers: 10,
        cameras: 3,
        activity: "Высокая",
        color: "green"
    },
    {
        name: "Зона Г",
        status: "Низкая активность",
        workers: 5,
        cameras: 2,
        activity: "Низкая",
        color: "yellow"
    },
    {
        name: "Сборочная линия 1",
        status: "Активна",
        workers: 15,
        cameras: 6,
        activity: "Очень высокая",
        color: "green"
    },
    {
        name: "Сборочная линия 2",
        status: "Активна",
        workers: 13,
        cameras: 5,
        activity: "Высокая",
        color: "green"
    },
    {
        name: "Складская зона",
        status: "Активна",
        workers: 9,
        cameras: 4,
        activity: "Средняя",
        color: "blue"
    },
    {
        name: "Погрузочная зона",
        status: "Активна",
        workers: 6,
        cameras: 3,
        activity: "Средняя",
        color: "blue"
    },
]

export default function ZonesPage() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <div className="px-4 lg:px-6">
                                <h1 className="text-3xl font-bold mb-2">Зоны завода</h1>
                                <p className="text-muted-foreground">
                                    Мониторинг и управление производственными зонами
                                </p>
                            </div>

                            <div className="grid gap-4 px-4 lg:px-6 lg:grid-cols-2 xl:grid-cols-3">
                                {zones.map((zone) => (
                                    <Card key={zone.name}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">{zone.name}</CardTitle>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        zone.color === "green"
                                                            ? "border-green-500 text-green-500"
                                                            : zone.color === "yellow"
                                                                ? "border-yellow-500 text-yellow-500"
                                                                : "border-blue-500 text-blue-500"
                                                    }
                                                >
                                                    {zone.status}
                                                </Badge>
                                            </div>
                                            <CardDescription>Активность: {zone.activity}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Работников:</span>
                                                    <span className="font-medium">{zone.workers}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Камер:</span>
                                                    <span className="font-medium">{zone.cameras}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="px-4 lg:px-6">
                                <ZoneHeatmap />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
