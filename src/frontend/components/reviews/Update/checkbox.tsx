import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Notification from '../../_common/NotificationComponent'
import { refetchData } from '../../../_utils/handleData/refetchData'

const UpdateReviewCheckbox = ({
  _id,
  featured,
  refetchArgs
}: {
  _id: ObjectId
  featured: boolean
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, featured: !featured },
    onCompleted: () => {
      setNotification({
        message: 'Review successfully updated!',
        success: true
      })
      refetchData(refetchArgs)
    },
    onError: (error) => setNotification({ message: error.message, success: false })
  })

  return (
    <>
      <Checkbox
        checked={featured}
        disabled={updateMutationState.loading}
        onChange={() => updateMutation()}
      />
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default UpdateReviewCheckbox
