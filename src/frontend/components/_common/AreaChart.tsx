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
          <Tooltip />
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
