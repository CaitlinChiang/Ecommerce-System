import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateReviewCheckbox = ({
  _id,
  featured,
  refetchArgs
}: {
  _id: ObjectId
  featured: boolean
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, featured: !featured },
    onCompleted: () => {
      globalAny.setNotification(true, 'Review successfully updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Checkbox
      checked={featured}
      disabled={updateMutationState.loading}
      onChange={(): void => {
        updateMutation()
      }}
    />
  )
}

export default UpdateReviewCheckbox
