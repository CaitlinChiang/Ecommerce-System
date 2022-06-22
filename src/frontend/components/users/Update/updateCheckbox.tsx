import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/refetchData'

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
      console.log('Update Success')
      refetchData(refetchArgs)
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
