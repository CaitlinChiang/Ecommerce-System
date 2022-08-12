import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetAnalyticsOrdersCount } from '../query'
import { Box, CircularProgress } from '@mui/material'
import {
  AnalyticsOrdersCount,
  GetAnalyticsArgs
} from '../../../../../types/analytics'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import AreaChart from '../../../_common/AreaChart'
import DatePickerField from '../../../_common/DatePickerField'

const OrdersChart = (): ReactElement => {
  const [args, setArgs] = useState<GetAnalyticsArgs>({
    dateRange: {
      startDate: new Date(Date.now() - 6096e5),
      endDate: new Date(),
      filterBy: DateRangeType.CREATED
    }
  })

  const { data, loading } = useQuery(GetAnalyticsOrdersCount, { variables: args })
  const ordersCount: AnalyticsOrdersCount[] = data?.get_analytics_orders_count || []

  return (
    <>
      {loading && <CircularProgress />}
      <Box>
        <DatePickerField
          args={args}
          nestedProp={'startDate'}
          setArgs={setArgs}
          targetProp={'dateRange'}
        />
        <DatePickerField
          args={args}
          nestedProp={'endDate'}
          setArgs={setArgs}
          targetProp={'dateRange'}
        />
      </Box>
      <AreaChart data={ordersCount} xAxisDataKey={'date'} yAxisDataKey={'orders'} />
    </>
  )
}

export default OrdersChart
