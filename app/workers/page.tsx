import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SafetyAlerts } from "@/components/safety-alerts"
import { ShiftComparison } from "@/components/shift-comparison"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const workers = [
    { id: 1, image: "https://i.pravatar.cc/150?img=1", zone: "Зона А", status: "Активен", shift: "Утренняя", activity: 92 },
    { id: 2, image: "https://i.pravatar.cc/150?img=12", zone: "Сборочная линия 1", status: "Активен", shift: "Утренняя", activity: 88 },
    { id: 3, image: "https://i.pravatar.cc/150?img=33", zone: "Зона Б", status: "Активен", shift: "Утренняя", activity: 85 },
    { id: 4, image: "https://i.pravatar.cc/150?img=14", zone: "Складская зона", status: "Активен", shift: "Утренняя", activity: 78 },
    { id: 5, image: "https://i.pravatar.cc/150?img=25", zone: "Сборочная линия 2", status: "Активен", shift: "Утренняя", activity: 90 },
    { id: 6, image: "https://i.pravatar.cc/150?img=36", zone: "Погрузочная зона", status: "Активен", shift: "Утренняя", activity: 82 },
    { id: 7, image: "https://i.pravatar.cc/150?img=17", zone: "Зона В", status: "Перерыв", shift: "Утренняя", activity: 0 },
    { id: 8, image: "https://i.pravatar.cc/150?img=28", zone: "Зона Г", status: "Активен", shift: "Утренняя", activity: 75 },
];

export default function WorkersPage() {
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
                                <h1 className="text-3xl font-bold mb-2">Работники</h1>
                                <p className="text-muted-foreground">
                                    Мониторинг активности и безопасности работников
                                </p>
                            </div>

                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Список работников</CardTitle>
                                        <CardDescription>Текущая смена: Утренняя (6:00 - 14:00)</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {workers.map((worker) => (
                                                <div
                                                    key={worker.id}
                                                    className="flex items-center justify-between rounded-lg border p-4"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-12 w-12">
                                                            <img src={worker.image} alt={`Работник #${worker.id}`} className="object-cover" />
                                                            <AvatarFallback>
                                                                #{worker.id}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">Работник #{worker.id}</p>
                                                            <p className="text-sm text-muted-foreground">{worker.zone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-sm font-medium">Активность: {worker.activity}%</p>
                                                            <p className="text-xs text-muted-foreground">{worker.shift}</p>
                                                        </div>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                worker.status === "Активен"
                                                                    ? "border-green-500 text-green-500"
                                                                    : "border-yellow-500 text-yellow-500"
                                                            }
                                                        >
                                                            {worker.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid gap-4 px-4 lg:px-6 lg:grid-cols-2">
                                <ShiftComparison />
                                <SafetyAlerts />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
