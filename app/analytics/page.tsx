import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ActivityTimelineChart } from "@/components/activity-timeline-chart"
import { ActionDistributionChart } from "@/components/action-distribution-chart"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function AnalyticsPage() {
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
                                <h1 className="text-3xl font-bold mb-2">Аналитика</h1>
                                <p className="text-muted-foreground">
                                    Подробная аналитика активности и производительности завода
                                </p>
                            </div>

                            <div className="px-4 lg:px-6">
                                <ActivityTimelineChart />
                            </div>

                            <div className="px-4 lg:px-6">
                                <ActionDistributionChart />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
