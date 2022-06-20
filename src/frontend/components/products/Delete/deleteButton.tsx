import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { ListItemButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ObjectId } from 'mongodb'

const DeleteProductButton = ({ _id }: { _id: ObjectId }): ReactElement => {
  const [deleteMutation, deleteMutationState] = useMutation(mutation, {
    variables: { _id },
    onCompleted: () => {
      console.log('Deletion Success')
    },
    onError: (error) => console.log(error)
  })

  return (
    <ListItemButton
      onClick={() => deleteMutation()}
      disabled={deleteMutationState.loading}
    >
      <DeleteIcon />
    </ListItemButton>
  )
}

export default DeleteProductButton
