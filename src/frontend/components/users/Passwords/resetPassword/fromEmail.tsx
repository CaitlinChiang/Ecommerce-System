import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ResetUserPassword } from '../mutation'
import { Button } from '@mui/material'
import { UserType } from '../../../../_enums/userType'
import Text from '../../../_common/TextField'
import PasswordField from '../../../_common/PasswordField'
import { generateAdminUrl } from '../../../../_utils/handleData/generateAdminUrl'

const globalAny: any = global

const ResetPassword = ({ type }: { type: UserType }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    email: null,
    newPassword: null,
    verificationCode: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [resetPasswordMutation, resetPasswordMutationState] = useMutation(
    ResetUserPassword,
    {
      variables: args,
      onCompleted: () => {
        globalAny.setNotification(true, 'Password successfully updated!')
        router.push(`${generateAdminUrl(type)}/user/sign-in`)
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
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'verificationCode'}
      />
      <PasswordField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'newPassword'}
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
