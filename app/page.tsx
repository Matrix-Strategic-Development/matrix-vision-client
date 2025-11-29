import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { VideoUpload } from "@/components/video-upload"
import { VideosList } from "@/components/videos-list"
import { ActivityTimelineChart } from "@/components/activity-timeline-chart"
import { ActionDistributionChart } from "@/components/action-distribution-chart"
import { SafetyAlerts } from "@/components/safety-alerts"
import { ShiftComparison } from "@/components/shift-comparison"
import { ZoneHeatmap } from "@/components/zone-heatmap"
import { DataFilters } from "@/components/data-filters"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
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
              <SectionCards />

              <div className="grid gap-4 px-4 lg:px-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <VideoUpload />
                </div>
                <VideosList />
              </div>

              <div className="px-4 lg:px-6">
                <ActivityTimelineChart />
              </div>

              <div className="px-4 lg:px-6">
                <DataFilters />
              </div>

              <div className="grid gap-4 px-4 lg:px-6 lg:grid-cols-2">
                <ActionDistributionChart />
                <SafetyAlerts />
              </div>

              <div className="grid gap-4 px-4 lg:px-6 lg:grid-cols-2">
                <ShiftComparison />
                <ZoneHeatmap />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
