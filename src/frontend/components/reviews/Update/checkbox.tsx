import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/refetchData'

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
      console.log('Update Success')
      refetchData(refetchArgs)
    },
    onError: (error) => console.log(error)
  })

  return (
    <Checkbox
      checked={featured}
      disabled={updateMutationState.loading}
      onChange={() => updateMutation()}
    />
  )
}

export default UpdateReviewCheckbox
