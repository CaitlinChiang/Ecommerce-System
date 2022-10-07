import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetAnalyticsRevenueCount } from '../query'
import { CircularProgress, Grid } from '@mui/material'
import {
  AnalyticsRevenueCount,
  GetAnalyticsArgs
} from '../../../../../types/analytics'
import { DateRangeType } from '../../../../_enums/dateRangeType'
import AreaChart from '../../../_common/AreaChart'
import DatePickerField from '../../../_common/DatePickerField'

const RevenueChart = (): ReactElement => {
  const [args, setArgs] = useState<GetAnalyticsArgs>({
    dateRange: {
      startDate: new Date(Date.now() - 6096e5),
      endDate: new Date(),
      filterBy: DateRangeType.CREATED
    }
  })

  const { data, loading } = useQuery(GetAnalyticsRevenueCount, { variables: args })
  const revenueCount: AnalyticsRevenueCount[] =
    data?.get_analytics_revenue_count || []

  return (
    <>
      {loading && <CircularProgress />}
      <AreaChart
        data={revenueCount}
        filters={
          <>
            <Grid container spacing={1}>
              <Grid item xs={3.5}>
                <DatePickerField
                  args={args}
                  nestedProp={'startDate'}
                  setArgs={setArgs}
                  targetProp={'dateRange'}
                />
              </Grid>
              <Grid item xs={3.5}>
                <DatePickerField
                  args={args}
                  nestedProp={'endDate'}
                  setArgs={setArgs}
                  targetProp={'dateRange'}
                />
              </Grid>
            </Grid>
          </>
        }
        title={'Revenue'}
        xAxisDataKey={'date'}
        yAxisDataKey={'revenue'}
      />
    </>
  )
}

export default RevenueChart
