import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ObjectId } from 'mongodb'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../types/actions/refetchData'
import { UserType } from '../../_enums/userType'
import { refetchData } from '../../_utils/handleData/refetchData'

const globalAny: any = global

const DeleteButton = ({
  _id,
  type,
  disabled,
  label,
  mutation,
  refetchArgs,
  setPaginateDataArgs
}: {
  _id: ObjectId
  type?: UserType
  disabled?: boolean
  label: string
  mutation: any
  refetchArgs: RefetchDataArgs
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  const mutationVariables: { _id: ObjectId; type?: UserType } = { _id }
  if (type) mutationVariables.type = type

  const [deleteMutation, deleteMutationState] = useMutation(mutation, {
    variables: mutationVariables,
    onCompleted: () => {
      globalAny.setNotification(true, `${label} has been successfully deleted.`)

      refetchData(refetchArgs)

      if (refetchArgs.count % refetchArgs.paginateDataArgs.rowsPerPage === 1) {
        setPaginateDataArgs({ ...refetchArgs.paginateDataArgs, page: 0 })
      }
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <IconButton
      disabled={disabled || deleteMutationState.loading}
      onClick={(): void => {
        deleteMutation()
      }}
    >
      <DeleteIcon />
    </IconButton>
  )
}

export default DeleteButton
