import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'

const UpdateReviewCheckbox = ({
  _id,
  featured
}: {
  _id: ObjectId
  featured: boolean
}): ReactElement => {
  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, featured: !featured },
    onCompleted: () => {
      console.log('Update Success')
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
