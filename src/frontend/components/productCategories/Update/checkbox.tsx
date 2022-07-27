import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateProductCategoryCheckbox = ({
  _id,
  refetchArgs,
  showPublic
}: {
  _id: ObjectId
  refetchArgs: RefetchDataArgs
  showPublic: boolean
}): ReactElement => {
  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, showPublic: !showPublic },
    onCompleted: () => {
      globalAny.setNotification(true, 'Product category successfully updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Checkbox
      checked={showPublic}
      disabled={updateMutationState.loading}
      onChange={(): void => {
        updateMutation()
      }}
    />
  )
}

export default UpdateProductCategoryCheckbox
