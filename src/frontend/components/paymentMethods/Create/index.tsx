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

const CreatePaymentMethod = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  if (!authenticateUser(AdminPermission.CREATE_PAYMENT_METHOD)) return

  const [args, setArgs] = useState<any>({
    name: null,
    details: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      globalAny.setNotification(true, 'Payment method successfully created!')
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
        placeholder={'Payment Method (ex. BDO Bank Transfer)'}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <Text
        args={args}
        error={validateFields}
        placeholder={'Bank Details (ex. BDO Account - 5210 6988 8182 2136)'}
        required={true}
        setArgs={setArgs}
        targetProp={'details'}
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

export default CreatePaymentMethod
