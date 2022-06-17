import { ReactElement } from 'react'
import { IconButton, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { QuantityChange } from '../../../types/_enumsFrontend/quantityChange'

const NumberIncrementor = ({
  setValue,
  value
}: {
  setValue: React.Dispatch<React.SetStateAction<number>>
  value: number
}): ReactElement => {
  const changeQuantity = (action: QuantityChange) => {
    switch (action) {
      case QuantityChange.INCREMENT:
        setValue(value + 1)
        break
      case QuantityChange.DECREMENT:
        setValue(value - 1)
        break
    }
  }

  return (
    <>
      <IconButton onClick={() => changeQuantity(QuantityChange.INCREMENT)}>
        <AddBoxIcon />
      </IconButton>
      <Typography variant={'h4'}>{value}</Typography>
      <IconButton
        disabled={value == 0}
        onClick={() => changeQuantity(QuantityChange.DECREMENT)}
      >
        <IndeterminateCheckBoxIcon />
      </IconButton>
    </>
  )
}

export default NumberIncrementor
