import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'

const UpdateUserCheckbox = ({
  _id,
  active,
  refetch
}: {
  _id: ObjectId
  active: boolean
  refetch: any
}): ReactElement => {
  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { _id, active: !active },
    onCompleted: () => {
      console.log('Update Success')
      refetch()
    },
    onError: (error) => console.log(error)
  })

  return (
    <Checkbox
      checked={active}
      disabled={updateMutationState.loading}
      onChange={() => updateMutation()}
    />
  )
}

export default UpdateUserCheckbox
