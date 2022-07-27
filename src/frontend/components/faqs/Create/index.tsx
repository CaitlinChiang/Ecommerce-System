import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import Text from '../../_common/TextField'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { refetchData } from '../../../_utils/handleData/refetchData'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const globalAny: any = global

const CreateFAQ = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  if (!authenticateUser(AdminPermission.CREATE_FAQ)) return

  const [args, setArgs] = useState<any>({
    answer: null,
    question: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      globalAny.setNotification(true, 'FAQ successfully created!')
      refetchData(refetchArgs)
      setValidateFields(false)
      setArgs(clearFields(args))
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'question'}
      />
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'answer'}
      />
      <Button
        disabled={createMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          createMutation()
        }}
      >
        {'Create'}
      </Button>
    </>
  )
}

export default CreateFAQ
