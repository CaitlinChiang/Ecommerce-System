import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ObjectId } from 'mongodb'

const DeleteButton = ({
  _id,
  label,
  mutation
}: {
  _id: ObjectId
  label: string
  mutation: any
}): ReactElement => {
  const [deleteMutation, deleteMutationState] = useMutation(mutation, {
    variables: { _id },
    onCompleted: () => {
      console.log(label + ' successfully deleted!')
    },
    onError: (error) => console.log(error)
  })

  return (
    <IconButton
      onClick={() => deleteMutation()}
      disabled={deleteMutationState.loading}
    >
      <DeleteIcon />
    </IconButton>
  )
}

export default DeleteButton
