import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { VideoUpload } from "@/components/video-upload"
import { VideosList } from "@/components/videos-list"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function VideosPage() {
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
                                <h1 className="text-3xl font-bold mb-2">Анализ видео</h1>
                                <p className="text-muted-foreground">
                                    Загрузка и анализ видео с производства
                                </p>
                            </div>

                            <div className="grid gap-4 px-4 lg:px-6 lg:grid-cols-3">
                                <div className="lg:col-span-2">
                                    <VideoUpload />
                                </div>
                                <VideosList />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
