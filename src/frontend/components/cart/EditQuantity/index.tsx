import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { ObjectId } from 'mongodb'
import NumberIncrementor from '../../_common/NumberIncrementor'

const EditItemQuantity = ({
  productId,
  productVariantId,
  quantity
}: {
  productId?: ObjectId
  productVariantId?: ObjectId
  quantity: number
}): ReactElement => {
  const [updateMutation] = useMutation(mutation)

  return (
    <NumberIncrementor
      args={{ productId, productVariantId, quantity }}
      targetProp={'quantity'}
      updateMutation={updateMutation}
    />
  )
}

export default EditItemQuantity
