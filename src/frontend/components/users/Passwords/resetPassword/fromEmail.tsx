import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ResetUserPasswordEmail } from '../mutation'
import { Card, CardContent } from '@mui/material'
import { ResetPasswordArgs } from '../../../../../types/user'
import { UserType } from '../../../../_enums/userType'
import Text from '../../../_common/TextField'
import PasswordField from '../../../_common/PasswordField'
import MutationButton from '../../../_common/MutationButton'
import { correctArgs } from '../../../../_utils/handleArgs/correctArgs'
import { generateAdminUrl } from '../../../../_utils/auth/generateAdminUrl'

const globalAny: any = global

const ResetPassword = ({ type }: { type: UserType }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<ResetPasswordArgs>({
    email: null,
    newPassword: null,
    verificationCode: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [resetPasswordMutation, resetPasswordMutationState] = useMutation(
    ResetUserPasswordEmail,
    {
      variables: correctArgs(args),
      onCompleted: () => {
        globalAny.setNotification(true, 'Password successfully updated!')
        router.push(`${generateAdminUrl(type)}/user/sign-in`)
      },
      onError: (error) => globalAny.setNotification(false, error.message)
    }
  )

  return (
    <Card>
      <CardContent>
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
        <MutationButton
          disabled={resetPasswordMutationState.loading}
          onClick={(): void => {
            setValidateFields(true)
            resetPasswordMutation()
          }}
          title={'Reset Password'}
        />
      </CardContent>
    </Card>
  )
}

export default ResetPassword
