import { IconVideo, IconClockHour4 } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { ExportButton } from "@/components/export-button"

export function SiteHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <IconVideo className="w-5 h-5 text-primary" />
          <h1 className="text-base font-semibold">Панель мониторинга завода</h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <ExportButton />
          <Badge variant="outline" className="hidden md:flex items-center gap-1.5">
            <IconClockHour4 className="w-3.5 h-3.5" />
            <span className="text-xs">{currentDate}</span>
          </Badge>
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <span className="relative flex h-2 w-2 mr-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-100 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-200"></span>
            </span>
            Система онлайн
          </Badge>
        </div>
      </div>
    </header>
  )
}
