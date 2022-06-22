import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ObjectId } from 'mongodb'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/refetchData'

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
      console.log('Update Success')
      refetchData(refetchArgs)
    },
    onError: (error) => console.log(error)
  })

  return (
    <Checkbox
      checked={showPublic}
      disabled={updateMutationState.loading}
      onChange={() => updateMutation()}
    />
  )
}

export default UpdateProductCategoryCheckbox
