import { ReactElement } from 'react'
import styles from '../../styles/_common/datePickerField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { Container, TextField } from '@mui/material'
import { formatProperCapitalization } from '../../_utils/handleFormatting/formatProperCapitalization'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

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
    <Container sx={styles.container}>
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
              error={returnError({ args, error, targetProp, nestedProp })}
              helperText={returnHelperText({ args, error, targetProp, nestedProp })}
            />
          )}
          value={value}
        />
      </LocalizationProvider>
    </Container>
  )
}

export default DatePickerField
