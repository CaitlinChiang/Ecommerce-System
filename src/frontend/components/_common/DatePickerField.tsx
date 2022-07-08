import { ReactElement } from 'react'
import theme from '../../themes'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/handleFormatting/formatProperCapitalization'

const DatePickerField = ({
  args,
  disabled,
  error,
  nestedProp,
  setArgs,
  targetProp
}: {
  args: any
  disabled?: boolean
  error?: boolean
  nestedProp?: string
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  let value = args?.[targetProp] === null ? null : new Date(args[targetProp])

  if (nestedProp) {
    value =
      args[targetProp]?.[nestedProp] === null
        ? null
        : new Date(args[targetProp][nestedProp])
  }

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disabled={disabled}
          inputFormat={'MM-dd-yyyy'}
          label={formatProperCapitalization(nestedProp || targetProp)}
          onChange={(newValue: Date | null) => {
            if (!nestedProp) setArgs({ ...args, [targetProp]: newValue })

            if (nestedProp) {
              setArgs({
                ...args,
                [targetProp]: { ...args[targetProp], [nestedProp]: newValue }
              })
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={error}
              helperText={
                error &&
                formatProperCapitalization(nestedProp || targetProp) +
                  ' is a required field.'
              }
            />
          )}
          value={value}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default DatePickerField
