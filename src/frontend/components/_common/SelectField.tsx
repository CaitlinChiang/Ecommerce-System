import { ReactElement } from 'react'
import { TextField, Autocomplete } from '@mui/material'
import CustomFormLabel from './CustomFormLabel'
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
  updateMutation
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
}): ReactElement => {
  const val = args[targetProp]

  let searchVal = options.find((option: any) => option[targetProp] === val)

  if (multiple) {
    searchVal = options.filter((option) => val?.includes(option[targetProp]))
  }

  if (nestedProp) {
    searchVal = options.find(
      (option: any) => option[nestedProp] === val?.[nestedProp]
    )
  }

  const handleChange = (_e: any, newValue: any | null): void => {
    let newVal = newValue?.[targetProp]

    if (multiple) {
      newVal = newValue.map((option: any) => option?.[targetProp])
    }

    if (nestedProp) {
      newVal = newValue?.[nestedProp]
      setArgs({ ...args, [targetProp]: { ...val, [nestedProp]: newVal } })
    } else {
      setArgs({ ...args, [targetProp]: newVal })
    }

    if (updateMutation) {
      updateMutation({ variables: { ...args, [targetProp]: newVal } })
    }
  }

  return (
    <>
      <CustomFormLabel required={required} text={label} />
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
            required={required}
            size={'small'}
            variant={'outlined'}
          />
        )}
        value={searchVal || (nestedProp ? val?.[nestedProp] : val)}
      />
    </>
  )
}

export default SelectField
