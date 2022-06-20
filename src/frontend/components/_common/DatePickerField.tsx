import { ReactElement } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TextField } from '@mui/material'
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
    <DesktopDatePicker
      disabled={disabled}
      inputFormat={'MM/dd/yyyy'}
      label={formatProperCapitalization(targetProperty)}
      onChange={(newValue: Date | null) => {
        setDateRangeArgs({ ...dateRangeArgs, [targetProperty]: newValue })
      }}
      renderInput={(params) => <TextField {...params} />}
      value={dateRangeArgs[targetProperty]}
    />
  )
}

export default DatePickerField
