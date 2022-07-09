import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { queryRevenueCount } from '../query'
import { Box } from '@mui/material'
import AreaChart from '../../../_common/AreaChart'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import DatePickerField from '../../../_common/DatePickerField'

const RevenueChart = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    dateRange: {
      startDate: new Date(Date.now() - 6096e5),
      endDate: new Date(),
      filterBy: DateRangeType.CREATED
    }
  })

  const { data } = useQuery(queryRevenueCount, {
    variables: { ...args }
  })

  const revenueData = data?.get_analytics_revenue_count || []

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
      <AreaChart data={revenueData} xAxisDataKey={'date'} yAxisDataKey={'revenue'} />
    </>
  )
}

export default RevenueChart
