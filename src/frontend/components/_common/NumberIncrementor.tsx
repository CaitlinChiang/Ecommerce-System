import { ReactElement } from 'react'
import { ButtonGroup, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { QuantityChange } from '../../_enums/quantityChange'
import { correctArgs } from '../../_utils/handleArgs/correctArgs'

const NumberIncrementor = ({
  args,
  setArgs,
  stockQuantity,
  targetProp,
  updateMutation
}: {
  args: any
  setArgs?: React.Dispatch<React.SetStateAction<any>>
  stockQuantity?: number
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
      updateMutation({ variables: { ...correctArgs(args), [targetProp]: val } })
    }
  }

  return (
    <ButtonGroup color={'success'} size={'small'}>
      <Button
        disabled={val === 1}
        onClick={(): void => changeQuantity(QuantityChange.DECREMENT)}
        sx={{ width: '35px', height: '35px', padding: '5px' }}
      >
        <RemoveIcon />
      </Button>
      <Button sx={{ width: '35px', height: '35px', padding: '5px' }}>{val}</Button>
      <Button
        disabled={val === stockQuantity}
        onClick={(): void => changeQuantity(QuantityChange.INCREMENT)}
        sx={{ width: '35px', height: '35px', padding: '5px' }}
      >
        <AddIcon />
      </Button>
    </ButtonGroup>
  )
}

export default NumberIncrementor
