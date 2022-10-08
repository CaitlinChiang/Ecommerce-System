import { ReactElement } from 'react'
import { Grid } from '@mui/material'
import DatePickerField from '../../_common/DatePickerField'

const AuditLogsTableFilters = ({
  args,
  setArgs
}: {
  args: any
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3.5}>
        <DatePickerField
          args={args}
          fallbackValue={new Date(Date.now() - 6096e5)}
          nestedProp={'startDate'}
          required={true}
          setArgs={setArgs}
          targetProp={'dateRange'}
        />
      </Grid>
      <Grid item xs={3.5}>
        <DatePickerField
          args={args}
          fallbackValue={new Date()}
          nestedProp={'endDate'}
          required={true}
          setArgs={setArgs}
          targetProp={'dateRange'}
        />
      </Grid>
    </Grid>
  )
}

export default AuditLogsTableFilters
