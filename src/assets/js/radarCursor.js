import {
  useTheme,
  create,
  percent,
  InterfaceColorSet,
} from '@amcharts/amcharts4/core'
import {
  RadarChart,
  RadarColumnSeries,
  RadarCursor,
  CategoryAxis,
  ValueAxis,
} from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

export function radarChart(selector, data) {
  // Themes begin
  // Themes end
  useTheme(am4themesAnimated)

  // Create chart instance
  const chart = create(selector, RadarChart)

  chart.data = data

  // Make chart not full circle
  chart.startAngle = -90
  chart.endAngle = 180
  chart.innerRadius = percent(20)

  // Set number format
  chart.numberFormatter.numberFormat = "#.#'%'"

  // Create axes
  const categoryAxis = chart.yAxes.push(new CategoryAxis())
  categoryAxis.dataFields.category = 'category'
  categoryAxis.renderer.grid.template.location = 0
  categoryAxis.renderer.grid.template.strokeOpacity = 0
  categoryAxis.renderer.labels.template.horizontalCenter = 'right'
  categoryAxis.renderer.labels.template.fontWeight = 500
  categoryAxis.renderer.labels.template.adapter.add(
    'fill',
    function (fill, target) {
      return target.dataItem.index >= 0
        ? chart.colors.getIndex(target.dataItem.index)
        : fill
    }
  )
  categoryAxis.renderer.minGridDistance = 10

  const valueAxis = chart.xAxes.push(new ValueAxis())
  valueAxis.renderer.grid.template.strokeOpacity = 0
  valueAxis.min = 0
  valueAxis.max = 100
  valueAxis.strictMinMax = true
  //   valueAxis.disabled = true

  // Create series
  const series1 = chart.series.push(new RadarColumnSeries())
  series1.dataFields.valueX = 'full'
  series1.dataFields.categoryY = 'category'
  series1.clustered = false
  series1.columns.template.fill = new InterfaceColorSet().getFor(
    'alternativeBackground'
  )
  series1.columns.template.fillOpacity = 0.08
  series1.columns.template.cornerRadiusTopLeft = 20
  series1.columns.template.strokeWidth = 0
  series1.columns.template.radarColumn.cornerRadius = 20

  const series2 = chart.series.push(new RadarColumnSeries())
  series2.dataFields.valueX = 'value'
  series2.dataFields.categoryY = 'category'
  series2.clustered = false
  series2.columns.template.strokeWidth = 0
  series2.columns.template.tooltipText = '{category}: [bold]{value}[/]'
  series2.columns.template.radarColumn.cornerRadius = 20

  series2.columns.template.adapter.add('fill', function (fill, target) {
    return chart.colors.getIndex(target.dataItem.index)
  })

  // Add cursor
  chart.cursor = new RadarCursor()
}
