import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { ObjectId } from 'mongodb'
import NumberIncrementor from '../../_common/NumberIncrementor'

const EditItemQuantity = ({
  price,
  productId,
  productVariantId,
  quantity,
  stockQuantity
}: {
  price: number
  productId?: ObjectId
  productVariantId?: ObjectId
  quantity: number
  stockQuantity: number
}): ReactElement => {
  const [updateMutation] = useMutation(mutation)

  return (
    <NumberIncrementor
      args={{ price, productId, productVariantId, quantity }}
      stockQuantity={stockQuantity}
      targetProp={'quantity'}
      updateMutation={updateMutation}
    />
  )
}

export default EditItemQuantity
