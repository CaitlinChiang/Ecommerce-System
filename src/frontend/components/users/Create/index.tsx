import Cookies from 'js-cookie'
import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { CreateUserArgs } from '../../../../types/user'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { UserType } from '../../../_enums/userType'
import Text from '../../_common/TextField'
import PasswordField from '../../_common/PasswordField'
import CitiesSelect from '../../cities/View/select'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const CreateUser = ({
  refetchArgs,
  setCreateModal,
  type
}: {
  refetchArgs?: RefetchDataArgs
  setCreateModal?: React.Dispatch<React.SetStateAction<boolean>>
  type: UserType
}): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<CreateUserArgs>({
    deliveryAddress: { address: null, cityId: null },
    email: null,
    firstName: null,
    lastName: null,
    password: type === UserType.CUSTOMER ? null : 'Company Name',
    phoneNumber: null,
    type
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: (data) => {
      globalAny.setNotification(true, 'Account successfully created!')

      switch (type) {
        case UserType.ADMINISTRATOR:
          refetchData(refetchArgs)
          setCreateModal(false)
          break
        case UserType.CUSTOMER:
          Cookies.set('accessToken', data.create_user)
          router.push('/')
      }
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {type === UserType.CUSTOMER && (
        <>
          <Text
            args={args}
            nestedProp={'address'}
            setArgs={setArgs}
            targetProp={'deliveryAddress'}
          />
          <CitiesSelect
            args={args}
            setArgs={setArgs}
            targetProp={'deliveryAddress'}
          />
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
