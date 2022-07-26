import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { ObjectId } from 'mongodb'
import { IconButton } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

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
    onCompleted: () => refetch()
  })

  return (
    <>
      <IconButton
        disabled={updateMutationState.loading}
        onClick={(): void => {
          updateMutation()
        }}
      >
        <RemoveCircleIcon />
      </IconButton>
    </>
  )
}

export default RemoveCartItem