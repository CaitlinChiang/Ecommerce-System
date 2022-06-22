import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../types/actions/refetchData'
import { refetchData } from '../../_utils/refetchData'

const DeleteButton = ({
  _id,
  label,
  mutation,
  refetchArgs
}: {
  _id: ObjectId
  label: string
  mutation: any
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [deleteMutation, deleteMutationState] = useMutation(mutation, {
    variables: { _id },
    onCompleted: () => {
      console.log(label + ' successfully deleted!')
      refetchData(refetchArgs)
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
