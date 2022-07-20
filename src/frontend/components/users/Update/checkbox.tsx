import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateUserCheckbox = ({
  _id,
  active,
  refetchArgs
}: {
  _id: ObjectId
  active: boolean
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, active: !active },
    onCompleted: () => {
      globalAny.setNotification(true, 'User successfully updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <Checkbox
        checked={active}
        disabled={updateMutationState.loading}
        onChange={(): void => {
          updateMutation()
        }}
      />
    </>
  )
}

export default UpdateUserCheckbox
