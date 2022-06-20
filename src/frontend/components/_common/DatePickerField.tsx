import { ReactElement } from 'react'
import theme from '../../themes'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/formatProperCapitalization'

const DatePickerField = ({
  disabled,
  setSpecificArgs,
  specificArgs,
  targetProperty
}: {
  disabled?: boolean
  setSpecificArgs?: React.Dispatch<React.SetStateAction<any>>
  specificArgs?: any
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
            setSpecificArgs({ ...specificArgs, [targetProperty]: newValue })
          }}
          renderInput={(params) => <TextField {...params} />}
          value={specificArgs[targetProperty]}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default DatePickerField
