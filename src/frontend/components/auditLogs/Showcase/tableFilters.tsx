import { ReactElement, useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { DateRange } from '../../../../types/common/dateRange'
import { DateRangeType } from '../../../_enums/dateRangeType'
import DatePickerField from '../../_common/DatePickerField'

const AuditLogsTableFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const [dateRangeArgs, setDateRangeArgs] = useState<DateRange>({
    startDate: null,
    endDate: null,
    filterBy: null
  })

  useEffect(() => {
    setArgs({
      ...args,
      dateRange: {
        startDate: dateRangeArgs?.startDate,
        endDate: dateRangeArgs?.endDate,
        filterBy: DateRangeType.CREATED
      }
    })
  }, [dateRangeArgs])

  return (
    <Box>
      <DatePickerField
        args={dateRangeArgs}
        setArgs={setDateRangeArgs}
        targetProp={'startDate'}
      />
      <DatePickerField
        args={dateRangeArgs}
        setArgs={setDateRangeArgs}
        targetProp={'endDate'}
      />
    </Box>
  )
}

export default AuditLogsTableFilters
