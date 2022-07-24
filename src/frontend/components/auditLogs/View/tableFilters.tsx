import { ReactElement } from 'react'
import { Box } from '@mui/material'
import DatePickerField from '../../_common/DatePickerField'

const AuditLogsTableFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  return (
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
  )
}

export default AuditLogsTableFilters
