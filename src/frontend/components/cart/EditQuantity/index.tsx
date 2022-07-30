import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { ObjectId } from 'mongodb'
import NumberIncrementor from '../../_common/NumberIncrementor'

const EditItemQuantity = ({
  productId,
  productVariantId,
  quantity,
  setCart
}: {
  productId?: ObjectId
  productVariantId?: ObjectId
  quantity: number
  setCart: any
}): ReactElement => {
  const [updateMutation] = useMutation(mutation, {
    onCompleted: (data) => setCart(data.edit_item_quantity)
  })

  return (
    <NumberIncrementor
      args={{ productId, productVariantId, quantity }}
      targetProp={'quantity'}
      updateMutation={updateMutation}
    />
  )
}

export default EditItemQuantity
