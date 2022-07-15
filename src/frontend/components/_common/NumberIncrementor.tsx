import { ReactElement } from 'react'
import { IconButton, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { QuantityChange } from '../../_enums/quantityChange'
import { correctArgs } from '../../_utils/handleArgs/correctArgs'

const NumberIncrementor = ({
  args,
  targetProp,
  updateMutation
}: {
  args: any
  targetProp: string
  updateMutation: any
}): ReactElement => {
  const changeQuantity = (action: QuantityChange) => {
    let val = args[targetProp]

    switch (action) {
      case QuantityChange.INCREMENT:
        val = args[targetProp] + 1
        break
      case QuantityChange.DECREMENT:
        val = args[targetProp] - 1
    }

    updateMutation({ variables: { ...correctArgs(args), [targetProp]: val } })
  }

  return (
    <>
      <IconButton onClick={() => changeQuantity(QuantityChange.INCREMENT)}>
        <AddBoxIcon />
      </IconButton>
      <Typography variant={'h4'}>{args[targetProp]}</Typography>
      <IconButton
        disabled={args[targetProp] == 0}
        onClick={() => changeQuantity(QuantityChange.DECREMENT)}
      >
        <IndeterminateCheckBoxIcon />
      </IconButton>
    </>
  )
}

export default NumberIncrementor
