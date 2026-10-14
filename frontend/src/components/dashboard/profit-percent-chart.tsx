import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { type MonthlyDataPoint } from '@/lib/financial-types'
import { formatCurrency, formatPercent } from '@/lib/financial-utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

interface ProfitPercentChartProps {
  data: MonthlyDataPoint[]
  loading?: boolean
}

interface TooltipPayload {
  name: string
  value: number
  color: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

function ProfitMarginDataTable({ data }: { data: MonthlyDataPoint[] }) {
  return (
    <details className="mt-4 text-sm">
      <summary className="cursor-pointer rounded-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
        Ver márgenes mensuales en una tabla
      </summary>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Margen de beneficio mensual representado en el gráfico. El margen se calcula como ingresos menos gastos, dividido entre ingresos.
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-2 py-2 font-semibold">Mes</th>
              <th scope="col" className="px-2 py-2 font-semibold">Margen / ingresos y gastos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point) => (
              <tr key={point.month} className="border-b border-border/60">
                <th scope="row" className="px-2 py-2 font-medium">{point.month}</th>
                <td className="px-2 py-2">
                  {formatPercent(point.profitPercent)}
                  <span className="sr-only">
                    {`, ingresos ${formatCurrency(point.income)}, gastos ${formatCurrency(point.outcome)}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const value = payload[0]?.value ?? 0
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-lg text-sm">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: 'var(--chart-profit)' }}
        />
        <span className="text-muted-foreground">Margen de beneficio:</span>
        <span className="font-medium text-foreground ml-auto pl-4">{formatPercent(value)}</span>
      </div>
    </div>
  )
}

export function ProfitPercentChart({ data, loading }: ProfitPercentChartProps) {
  if (loading) {
    return (
      <Card className="border-border/60">
        <CardHeader aria-hidden="true" className="pb-4">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-3 w-64 mt-1" />
        </CardHeader>
        <CardContent aria-hidden="true">
          <Skeleton className="h-[280px] w-full rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  const hasData = data.length > 0

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Margen de beneficio (%)</CardTitle>
        <CardDescription>Beneficio mensual como porcentaje de los ingresos totales</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
              <div className="flex h-[280px] items-center justify-center text-muted-foreground text-sm">
            No hay datos disponibles para mostrar
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              accessibilityLayer
              data={data}
              margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" strokeOpacity={0.6} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v.toLocaleString('es-MX', { maximumFractionDigits: 0 })}%`}
                width={40}
                domain={['auto', 'auto']}
              />
              <ReferenceLine y={0} stroke="var(--color-border)" strokeDasharray="4 4" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="profitPercent"
                name="profitPercent"
                stroke="var(--chart-profit)"
                strokeWidth={2}
                dot={{ r: 3, fill: 'var(--chart-profit)', strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {hasData ? <ProfitMarginDataTable data={data} /> : null}
      </CardContent>
    </Card>
  )
}
