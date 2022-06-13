import { ReactElement } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TextField } from '@mui/material'

const DatePickerField = ({
  date,
  label,
  setDate
}: {
  date: Date
  label: string
  setDate: React.Dispatch<React.SetStateAction<Date>>
}): ReactElement => {
  return (
    <DesktopDatePicker
      inputFormat={'MM/dd/yyyy'}
      label={label}
      onChange={(newValue: Date | null) => {
        setDate(newValue)
      }}
      renderInput={(params) => <TextField {...params} />}
      value={date}
    />
  )
}

export default DatePickerField
