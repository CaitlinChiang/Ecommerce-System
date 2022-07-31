import { ReactElement } from 'react'
import styles from '../../styles/_common/areaChart'
import { Container, Typography } from '@mui/material'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { formatProperCapitalization } from '../../_utils/handleFormat/formatProperCapitalization'

const CustomTooltip = ({ active, payload, label, yAxisDataKey }: any) => {
  if (active && payload && payload.length) {
    const revenueSign = yAxisDataKey === 'revenue' ? 'P' : ''
    const value =
      yAxisDataKey === 'revenue' ? payload[0].value.toFixed(2) : payload[0].value
    const valueDisplay = `${formatProperCapitalization(
      yAxisDataKey
    )}: ${revenueSign}${value}`

    return (
      <>
        <Typography>{`Date: ${formatProperCapitalization(label)}`}</Typography>
        <Typography>{valueDisplay}</Typography>
      </>
    )
  }

  return null
}

const AreaChartTemplate = ({
  data,
  xAxisDataKey,
  yAxisDataKey
}: {
  data: any
  xAxisDataKey: string
  yAxisDataKey: string
}): ReactElement => {
  return (
    <Container sx={styles.container}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={styles.chartMargin}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Tooltip content={<CustomTooltip yAxisDataKey={yAxisDataKey} />} />
          <Area
            type='monotone'
            dataKey={yAxisDataKey}
            stroke='#8884d8'
            fill='#8884d8'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default AreaChartTemplate
