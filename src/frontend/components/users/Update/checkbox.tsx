import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Notification from '../../_common/Notification'
import { refetchData } from '../../../_utils/handleData/refetchData'

const UpdateUserCheckbox = ({
  _id,
  active,
  refetchArgs
}: {
  _id: ObjectId
  active: boolean
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, active: !active },
    onCompleted: () => {
      setNotification({
        message: 'User successfully updated!',
        success: true
      })
      refetchData(refetchArgs)
    },
    onError: (error) => setNotification({ message: error.message, success: false })
  })

  return (
    <>
      <Checkbox
        checked={active}
        disabled={updateMutationState.loading}
        onChange={() => updateMutation()}
      />
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default UpdateUserCheckbox
