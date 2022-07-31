import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetAnalyticsRevenueCount } from '../query'
import { Box, CircularProgress } from '@mui/material'
import { AnalyticsRevenueCount } from '../../../../../types/analytics'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import AreaChart from '../../../_common/AreaChart'
import DatePickerField from '../../../_common/DatePickerField'

const RevenueChart = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    dateRange: {
      startDate: new Date(Date.now() - 6096e5),
      endDate: new Date(),
      filterBy: DateRangeType.CREATED
    }
  })

  const { data, loading } = useQuery(GetAnalyticsRevenueCount, { variables: args })

  if (loading) return <CircularProgress />

  const revenueData: AnalyticsRevenueCount[] =
    data?.get_analytics_revenue_count || []

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
