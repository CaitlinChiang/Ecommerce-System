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
        fallbackValue={new Date(Date.now() - 6096e5)}
        nestedProp={'startDate'}
        required={true}
        setArgs={setArgs}
        targetProp={'dateRange'}
      />
      <DatePickerField
        args={args}
        fallbackValue={new Date()}
        nestedProp={'endDate'}
        required={true}
        setArgs={setArgs}
        targetProp={'dateRange'}
      />
    </Box>
  )
}

export default AuditLogsTableFilters
