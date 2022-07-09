import { ReactElement } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { formatProperCapitalization } from '../../_utils/handleFormatting/formatProperCapitalization'

const CustomTooltip = ({ active, payload, label, yAxisDataKey }: any) => {
  if (active && payload && payload.length) {
    const revenueSign = yAxisDataKey === 'revenue' ? 'P' : ''
    const value =
      yAxisDataKey === 'revenue' ? payload[0].value.toFixed(2) : payload[0].value
    const valueDisplay =
      `${formatProperCapitalization(yAxisDataKey)}: ` + revenueSign + value

    return (
      <div>
        <p>{`Date: ${formatProperCapitalization(label)}`}</p>
        <p>{valueDisplay}</p>
      </div>
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
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
    </div>
  )
}

export default AreaChartTemplate
