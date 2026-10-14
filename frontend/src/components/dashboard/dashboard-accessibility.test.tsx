import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { IncomeOutcomeChart } from './income-outcome-chart'
import { ProfitPercentChart } from './profit-percent-chart'
import type { MonthlyDataPoint } from '@/lib/financial-types'

const monthlyData: MonthlyDataPoint[] = [
  { month: 'ene 2024', income: 1000, outcome: 250, profitPercent: 75 },
  { month: 'feb 2024', income: 0, outcome: 100, profitPercent: 0 },
]

describe('alternativas accesibles de gráficos', () => {
  it('incluye tabla de ingresos y gastos con valores y encabezados asociados', () => {
    const markup = renderToStaticMarkup(
      <IncomeOutcomeChart data={monthlyData} />,
    )

    expect(markup).toContain('Ver datos mensuales en una tabla')
    expect(markup).toContain('<table')
    expect(markup).toContain('scope="col"')
    expect(markup).toContain('scope="row"')
    expect(markup).toContain('ene 2024')
    expect(markup).toContain('feb 2024')
    expect(markup).toContain('USD 1,000')
  })

  it('incluye tabla del margen junto con sus ingresos y gastos de contexto', () => {
    const markup = renderToStaticMarkup(
      <ProfitPercentChart data={monthlyData} />,
    )

    expect(markup).toContain('Ver márgenes mensuales en una tabla')
    expect(markup).toContain('Margen de beneficio')
    expect(markup).toContain('ingresos')
    expect(markup).toContain('gastos')
    expect(markup).toContain('75.0 %')
    expect(markup).toContain('feb 2024')
  })

  it('conserva un estado vacío entendible cuando no hay observaciones', () => {
    const incomeOutcomeMarkup = renderToStaticMarkup(
      <IncomeOutcomeChart data={[]} />,
    )
    const profitMarkup = renderToStaticMarkup(<ProfitPercentChart data={[]} />)

    expect(incomeOutcomeMarkup).toContain('No hay datos disponibles para mostrar')
    expect(profitMarkup).toContain('No hay datos disponibles para mostrar')
    expect(incomeOutcomeMarkup).not.toContain('<table')
    expect(profitMarkup).not.toContain('<table')
  })
})