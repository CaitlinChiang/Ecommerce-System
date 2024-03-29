import { ReactElement } from 'react'
import dynamic from 'next/dynamic'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { formatText } from '../../_utils/handleFormat/formatText'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const AreaChartTemplate = ({
  data,
  filters,
  title,
  xAxisDataKey,
  yAxisDataKey
}: {
  data: any
  filters: ReactElement
  title: string
  xAxisDataKey: string
  yAxisDataKey: string
}): ReactElement => {
  const options: any = {
    chart: {
      id: 'area-chart',
      fontFamily: "'DM Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: { enabled: true },
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: { width: '3', curve: 'smooth' },
    colors: ['#0b70fb', '#6ac3fd'],
    xaxis: { categories: data.map((e: any) => e[xAxisDataKey]) },
    yaxis: { opposite: false, labels: { show: true } },
    legend: { show: true, position: 'bottom', width: '50px' },
    grid: { show: false },
    tooltip: { theme: 'dark', illSeriesColor: false }
  }

  const series = [
    {
      name: formatText(yAxisDataKey),
      data: data.map((e: any) => e[yAxisDataKey])
    }
  ]

  return (
    <Card>
      <Box alignItems={'center'} display={'flex'} p={2}>
        <Box flexGrow={1}>
          <Typography sx={{ marginBottom: 2 }} variant={'h2'}>
            {title}
          </Typography>
          {filters}
        </Box>
      </Box>
      <CardContent>
        <Chart options={options} series={series} type='area' height='300px' />
      </CardContent>
    </Card>
  )
}

export default AreaChartTemplate
