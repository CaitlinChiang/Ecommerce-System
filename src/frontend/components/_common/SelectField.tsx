import { ReactElement } from 'react'
import theme from '../../themes'
import { TextField, Autocomplete } from '@mui/material'
import { returnError } from '../../_utils/handleArgs/returnError'
import { returnHelperText } from '../../_utils/handleArgs/returnHelperText'

const SelectField = ({
  args,
  disabled,
  error,
  label,
  multiple,
  nestedProp,
  options,
  required,
  setArgs,
  targetProp,
  updateMutation,
  width
}: {
  args: any
  disabled?: boolean
  error?: boolean
  label: string
  multiple?: boolean
  nestedProp?: string
  options: any[]
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
  updateMutation?: any
  width?: number
}): ReactElement => {
  let value = options.find((option: any) => option[targetProp] === args[targetProp])

  if (multiple) {
    value = options.filter((option) =>
      args[targetProp]?.includes(option[targetProp])
    )
  }

  if (nestedProp) {
    value = options.find(
      (option: any) => option[nestedProp] === args[targetProp][nestedProp]
    )
  }

  const handleChange = (_e: any, newValue: any | null): void => {
    let val = newValue?.[targetProp]

    if (multiple) {
      val = newValue.map((option: any) => option?.[targetProp])
    }

    if (!nestedProp) setArgs({ ...args, [targetProp]: val })

    if (nestedProp) {
      val = newValue?.[nestedProp]
      setArgs({
        ...args,
        [targetProp]: { ...args[targetProp], [nestedProp]: val }
      })
    }

    if (updateMutation) updateMutation({ variables: { ...args, [targetProp]: val } })
  }

  return (
    <Autocomplete
      disabled={disabled}
      getOptionLabel={(option: any): string => option.label}
      multiple={multiple}
      onChange={handleChange}
      options={options}
      renderInput={(params): ReactElement => (
        <TextField
          {...params}
          error={returnError({ args, error, targetProp, nestedProp })}
          helperText={returnHelperText({ args, error, targetProp, nestedProp })}
          label={label}
          required={required}
        />
      )}
      sx={{ width: width || 300, padding: theme.spacing(2), display: 'block' }}
      value={
        value || (!nestedProp ? args[targetProp] : args[targetProp][nestedProp])
      }
    />
  )
}

export default SelectField
