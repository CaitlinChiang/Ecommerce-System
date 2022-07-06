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

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      deliveryAddress: { address: args?.address, cityId: args?.cityId }
    },
    onCompleted: (data) => {
      Cookies.set('accessToken', data.create_user.token)
      console.log('User successfully signed up!')
      router.push('/')
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      {type === UserType.CUSTOMER && (
        <>
          <Text args={args} setArgs={setArgs} targetProp={'address'} />
          <CitiesSelect args={args} create={true} setArgs={setArgs} />
        </>
      )}
      <Text args={args} required={true} setArgs={setArgs} targetProp={'email'} />
      <Text args={args} required={true} setArgs={setArgs} targetProp={'firstName'} />
      <Text args={args} required={true} setArgs={setArgs} targetProp={'lastName'} />
      <PasswordField args={args} required={true} setArgs={setArgs} />
      <Text
        args={args}
        required={true}
        setArgs={setArgs}
        targetProp={'phoneNumber'}
      />
      <Button
        onClick={() => createMutation()}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
    </>
  )
}

export default CreateUser
