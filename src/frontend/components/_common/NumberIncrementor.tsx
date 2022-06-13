import { ReactElement } from 'react'
import { Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { QuantityChange } from '../../../types/_enums/quantityChange'

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
      <AddBoxIcon onClick={() => changeQuantity(QuantityChange.INCREMENT)} />
      <Typography variant={'h4'}>{value}</Typography>
      <IndeterminateCheckBoxIcon
        onClick={() => changeQuantity(QuantityChange.DECREMENT)}
      />
    </>
  )
}

export default NumberIncrementor
