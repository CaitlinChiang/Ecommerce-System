import Cookies from 'js-cookie'
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { UserType } from '../../../_enums/userType'
import CitiesSelect from '../../../components/cities/Showcase/select'
import Text from '../../_common/TextField'
import PasswordField from '../../_common/PasswordField'
import Notification from '../../_common/Notification'

const CreateUser = ({ type }: { type: UserType }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    address: null,
    cityId: null,
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    phoneNumber: null,
    type
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      deliveryAddress: { address: args?.address, cityId: args?.cityId }
    },
    onCompleted: (data) => {
      Cookies.set('accessToken', data.create_user.token)
      setNotification({
        message: 'Account successfully create!',
        success: true
      })
      router.push('/')
    },
    onError: (error) => setNotification({ message: error.message, success: false })
  })

  return (
    <>
      {type === UserType.CUSTOMER && (
        <>
          <Text args={args} setArgs={setArgs} targetProp={'address'} />
          <CitiesSelect args={args} setArgs={setArgs} />
        </>
      )}
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
        targetProp={'firstName'}
      />
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'lastName'}
      />
      <PasswordField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
      />
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'phoneNumber'}
      />
      <Button
        onClick={() => {
          setValidateFields(true)
          createMutation()
        }}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default CreateUser
