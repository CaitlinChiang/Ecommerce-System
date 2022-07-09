import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Notification from './Notification'
import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../types/actions/refetchData'
import { refetchData } from '../../_utils/handleData/refetchData'

const DeleteButton = ({
  _id,
  label,
  mutation,
  refetchArgs,
  setPaginateDataArgs
}: {
  _id: ObjectId
  label: string
  mutation: any
  refetchArgs: RefetchDataArgs
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })
  const [deleteMutation, deleteMutationState] = useMutation(mutation, {
    variables: { _id },
    onCompleted: () => {
      setNotification({
        message: label + ' has been successfully deleted.',
        success: true
      })
      refetchData(refetchArgs)
      if (refetchArgs.count % refetchArgs.paginateDataArgs.rowsPerPage == 1) {
        setPaginateDataArgs({ ...refetchArgs.paginateDataArgs, page: 0 })
      }
    },
    onError: (error) => {
      setNotification({ message: error.message, success: false })
    }
  })

  return (
    <>
      <IconButton
        onClick={() => deleteMutation()}
        disabled={deleteMutationState.loading}
      >
        <DeleteIcon />
      </IconButton>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default DeleteButton
