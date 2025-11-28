import { IconTrendingDown, IconTrendingUp, IconUsers, IconAlertTriangle, IconActivity, IconEye } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Всего обнаружений</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-500">
              <IconTrendingUp />
              +18.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Активность увеличилась <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            По сравнению с прошлой неделей
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Активных работников</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            58
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-500">
              <IconUsers />
              Норма
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Работники текущей смены <IconUsers className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Утренняя смена (06:00-14:00)
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Оповещения безопасности</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            5
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-orange-500/20 bg-orange-500/10 text-orange-500">
              <IconAlertTriangle />
              Средний
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Требует внимания <IconAlertTriangle className="size-4" />
          </div>
          <div className="text-muted-foreground">2 инцидента высокого приоритета</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Средняя активность</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            78.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-500">
              <IconTrendingUp />
              +4.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Оптимальная производительность <IconActivity className="size-4" />
          </div>
          <div className="text-muted-foreground">Выше целевого порога</div>
        </CardFooter>
      </Card>
    </div>
  )
}
