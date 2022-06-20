import { ReactElement } from 'react'
import theme from '../../themes'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { DateRange } from '../../../types/common/dateRange'
import { formatProperCapitalization } from '../../_utils/formatProperCapitalization'

const DatePickerField = ({
  dateRangeArgs,
  disabled,
  setDateRangeArgs,
  targetProperty
}: {
  dateRangeArgs: any
  disabled?: boolean
  setDateRangeArgs: React.Dispatch<React.SetStateAction<DateRange>>
  targetProperty: string
}): ReactElement => {
  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disabled={disabled}
          inputFormat={'MM-dd-yyyy'}
          label={formatProperCapitalization(targetProperty)}
          onChange={(newValue: Date | null) => {
            setDateRangeArgs({ ...dateRangeArgs, [targetProperty]: newValue })
          }}
          renderInput={(params) => <TextField {...params} />}
          value={dateRangeArgs[targetProperty]}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default DatePickerField
