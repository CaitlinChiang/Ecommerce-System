import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { ObjectId } from 'mongodb'
import NumberIncrementor from '../../_common/NumberIncrementor'

const EditItemQuantity = ({
  productId,
  productVariantId,
  quantity,
  refetch
}: {
  productId?: ObjectId
  productVariantId?: ObjectId
  quantity: number
  refetch: any
}): ReactElement => {
  const args: any = {
    productId,
    productVariantId,
    quantity
  }

  const updateMutation = useMutation(mutation, {
    onCompleted: () => refetch()
  })

  return (
    <>
      <NumberIncrementor
        args={args}
        targetProp={'quantity'}
        updateMutation={updateMutation}
      />
    </>
  )
}

export default EditItemQuantity
