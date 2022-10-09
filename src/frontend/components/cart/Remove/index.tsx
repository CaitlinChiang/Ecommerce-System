import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { ObjectId } from 'mongodb'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const globalAny: any = global

const RemoveCartItem = ({
  productId,
  productVariantId,
  refetch
}: {
  productId?: ObjectId
  productVariantId?: ObjectId
  refetch: any
}): ReactElement => {
  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { productId, productVariantId },
    onCompleted: () => {
      globalAny.setNotification(true, 'Item removed from cart!')
      refetch()
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <IconButton
      color={'error'}
      disabled={updateMutationState.loading}
      onClick={(): void => {
        updateMutation()
      }}
    >
      <DeleteIcon />
    </IconButton>
  )
}

export default RemoveCartItem
