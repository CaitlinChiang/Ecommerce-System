import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetAnalyticsOrdersCount } from '../query'
import { Box } from '@mui/material'
import { AnalyticsOrdersCount } from '../../../../../types/analytics'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import AreaChart from '../../../_common/AreaChart'
import DatePickerField from '../../../_common/DatePickerField'

const OrdersChart = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    dateRange: {
      startDate: new Date(Date.now() - 6096e5),
      endDate: new Date(),
      filterBy: DateRangeType.CREATED
    }
  })

  const { data } = useQuery(GetAnalyticsOrdersCount, { variables: args })

  const ordersData: AnalyticsOrdersCount[] = data?.get_analytics_orders_count || []

  return (
    <>
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
      <AreaChart data={ordersData} xAxisDataKey={'date'} yAxisDataKey={'orders'} />
    </>
  )
}

export default OrdersChart