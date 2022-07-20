import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import Notification from '../../_common/NotificationComponent'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/handleData/refetchData'

const UpdateProductCategoryCheckbox = ({
  _id,
  refetchArgs,
  showPublic
}: {
  _id: ObjectId
  refetchArgs: RefetchDataArgs
  showPublic: boolean
}): ReactElement => {
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, showPublic: !showPublic },
    onCompleted: () => {
      setNotification({
        message: 'Product category successfully updated!',
        success: true
      })
      refetchData(refetchArgs)
    },
    onError: (error) => setNotification({ message: error.message, success: false })
  })

  return (
    <>
      <Checkbox
        checked={showPublic}
        disabled={updateMutationState.loading}
        onChange={() => updateMutation()}
      />
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default UpdateProductCategoryCheckbox
