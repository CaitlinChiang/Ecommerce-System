import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ResetUserPasswordProfile } from '../mutation'
import { Button } from '@mui/material'
import { ResetPasswordArgs } from '../../../../../types/user'
import { UserType } from '../../../../_enums/userType'
import Text from '../../../_common/TextField'
import PasswordField from '../../../_common/PasswordField'
import { correctArgs } from '../../../../_utils/handleArgs/correctArgs'
import { generateAdminUrl } from '../../../../_utils/auth/generateAdminUrl'

const globalAny: any = global

const ResetPassword = ({ type }: { type: UserType }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<ResetPasswordArgs>({
    email: null,
    newPassword: null,
    oldPassword: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [resetPasswordMutation, resetPasswordMutationState] = useMutation(
    ResetUserPasswordProfile,
    {
      variables: correctArgs(args),
      onCompleted: () => {
        globalAny.setNotification(true, 'Password successfully updated!')
        router.push(`${generateAdminUrl(type)}/user/profile`)
      },
      onError: (error) => globalAny.setNotification(false, error.message)
    }
  )

  return (
    <>
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'email'}
      />
      <PasswordField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'newPassword'}
      />
      <PasswordField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'oldPassword'}
      />
      <Button
        disabled={resetPasswordMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          resetPasswordMutation()
        }}
      >
        {'Reset Password'}
      </Button>
    </>
  )
}

export default ResetPassword
