import { ReactElement } from 'react'
import styles from '../../styles/_common/datePickerField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { Container, TextField } from '@mui/material'
import { formatText } from '../../_utils/handleFormat/formatText'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

const DatePickerField = ({
  args,
  disabled,
  error,
  fallbackValue,
  nestedProp,
  required,
  setArgs,
  targetProp
}: {
  args: any
  disabled?: boolean
  error?: boolean
  fallbackValue?: Date
  nestedProp?: string
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
}): ReactElement => {
  const val = args[targetProp]
  const nestedVal = val?.[nestedProp]
  const defaultVal = required ? fallbackValue : null

  let modifiedVal = args?.[targetProp] === null ? defaultVal : new Date(val)

  if (nestedProp) {
    modifiedVal = nestedVal === null ? defaultVal : new Date(nestedVal)
  }

  return (
    <Container sx={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disabled={disabled}
          inputFormat={'MM-dd-yyyy'}
          label={formatText(nestedProp || targetProp)}
          onChange={(newValue: Date | null) => {
            const newVal = newValue === null ? defaultVal : newValue

            if (nestedProp) {
              setArgs({ ...args, [targetProp]: { ...val, [nestedProp]: newVal } })
            } else {
              setArgs({ ...args, [targetProp]: newVal })
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={returnError({ args, error, targetProp, nestedProp })}
              helperText={returnHelperText({ args, error, targetProp, nestedProp })}
              required={required}
            />
          )}
          value={modifiedVal}
        />
      </LocalizationProvider>
    </Container>
  )
}

export default DatePickerField
