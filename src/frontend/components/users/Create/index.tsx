import Cookies from 'js-cookie'
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { UserType } from '../../../_enums/userType'
import Text from '../../_common/TextField'
import PasswordField from '../../_common/PasswordField'
import CitiesSelect from '../../cities/View/select'
import { validateArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const CreateUser = ({
  refetchArgs,
  setCreateModalOpen,
  type
}: {
  refetchArgs?: RefetchDataArgs
  setCreateModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
  type: UserType
}): ReactElement => {
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

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      deliveryAddress: { address: args?.address, cityId: args?.cityId },
      password: type === UserType.CUSTOMER ? args?.password : 'Company Name',
      ...validateArgs(args)
    },
    onCompleted: (data) => {
      globalAny.setNotification(true, 'Account successfully created!')

      switch (type) {
        case UserType.ADMINISTRATOR:
          setCreateModalOpen(false)
          refetchData(refetchArgs)
          break
        case UserType.CUSTOMER:
          Cookies.set('accessToken', data.create_user.token)
          router.push('/')
      }
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {type === UserType.CUSTOMER && (
        <>
          <Text args={args} setArgs={setArgs} targetProp={'address'} />
          <CitiesSelect args={args} setArgs={setArgs} />
          <PasswordField
            args={args}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'password'}
          />
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
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'phoneNumber'}
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

export default CreateUser
