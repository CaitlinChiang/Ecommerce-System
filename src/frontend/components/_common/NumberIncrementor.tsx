import { ReactElement } from 'react'
import { IconButton, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { QuantityChange } from '../../_enums/quantityChange'
import { correctArgs } from '../../_utils/handleArgs/correctArgs'

const NumberIncrementor = ({
  args,
  setArgs,
  targetProp,
  updateMutation
}: {
  args: any
  setArgs?: React.Dispatch<React.SetStateAction<any>>
  targetProp: string
  updateMutation?: any
}): ReactElement => {
  let val = args[targetProp]

  const changeQuantity = (action: QuantityChange) => {
    switch (action) {
      case QuantityChange.INCREMENT:
        val += 1
        break
      case QuantityChange.DECREMENT:
        val -= 1
    }

    if (setArgs) {
      setArgs({ ...args, [targetProp]: val })
    }

    if (updateMutation) {
      updateMutation({ variables: { ...correctArgs({ args }), [targetProp]: val } })
    }
  }

  return (
    <>
      <IconButton onClick={(): void => changeQuantity(QuantityChange.INCREMENT)}>
        <AddBoxIcon />
      </IconButton>
      <Typography>{val}</Typography>
      <IconButton
        disabled={val === 1}
        onClick={(): void => changeQuantity(QuantityChange.DECREMENT)}
      >
        <IndeterminateCheckBoxIcon />
      </IconButton>
    </>
  )
}

export default NumberIncrementor
