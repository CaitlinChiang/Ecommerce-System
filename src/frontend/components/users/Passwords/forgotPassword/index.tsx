import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { ForgotUserPassword } from '../mutation'
import { Card, CardContent } from '@mui/material'
import { ForgotPasswordArgs } from '../../../../../types/user'
import { UserType } from '../../../../_enums/userType'
import Text from '../../../_common/TextField'
import MutationButton from '../../../_common/MutationButton'
import { generateAdminUrl } from '../../../../_utils/auth/generateAdminUrl'

const globalAny: any = global

const ForgotPassword = ({ type }: { type: UserType }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<ForgotPasswordArgs>({ email: null, type })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [forgotPasswordMutation, forgotPasswordMutationState] = useMutation(
    ForgotUserPassword,
    {
      variables: args,
      onCompleted: () => {
        globalAny.setNotification(
          true,
          'Please check your email for your verification code.'
        )
        router.push(`${generateAdminUrl(type)}/user/reset-password/verify`)
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
        <MutationButton
          disabled={forgotPasswordMutationState.loading}
          onClick={(): void => {
            setValidateFields(true)
            forgotPasswordMutation()
          }}
          title={'Get Verification Code'}
        />
      </CardContent>
    </Card>
  )
}

export default ForgotPassword
