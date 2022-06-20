import { ReactElement } from 'react'
import theme from '../../themes'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/formatProperCapitalization'

const DatePickerField = ({
  args,
  disabled,
  setArgs,
  targetProp
}: {
  args: any
  disabled?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disabled={disabled}
          inputFormat={'MM-dd-yyyy'}
          label={formatProperCapitalization(targetProp)}
          onChange={(newValue: Date | null) => {
            setArgs({ ...args, [targetProp]: newValue })
          }}
          renderInput={(params) => <TextField {...params} />}
          value={args[targetProp]}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default DatePickerField
