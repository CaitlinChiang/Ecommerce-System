import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { User } from '../../../../types/user'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateUserCheckbox = ({
  disabled,
  refetchArgs,
  user
}: {
  disabled: boolean
  refetchArgs: RefetchDataArgs
  user: User
}): ReactElement => {
  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { ...user, active: !user.active },
    onCompleted: () => {
      globalAny.setNotification(true, 'User successfully updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Checkbox
      checked={user.active}
      disabled={disabled || updateMutationState.loading}
      onChange={(): void => {
        updateMutation()
      }}
    />
  )
}

export default UpdateUserCheckbox
