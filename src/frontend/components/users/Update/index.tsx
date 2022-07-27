import { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { GetUser } from '../View/query'
import mutation from './mutation'
import { Button } from '@mui/material'
import { User } from '../../../../types/user'
import { UserType } from '../../../_enums/userType'
import Text from '../../_common/TextField'
import CitiesSelect from '../../cities/View/select'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { generateAdminUrl } from '../../../_utils/auth/generateAdminUrl'

const globalAny: any = global

const UpdateUser = ({ type }: { type: UserType }): ReactElement => {
  const router = useRouter()

  const [args, setArgs] = useState<any>({
    _id: null,
    address: null,
    cityId: null,
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, refetch } = useQuery(GetUser)

  const user: User = data?.get_user || {}

  if (Object.keys(user).length === 0) {
    return (
      <Button
        onClick={(): void => {
          router.push('/user/sign-in')
        }}
      >
        {'Sign In'}
      </Button>
    )
  }

  useEffect(() => {
    setArgs({
      address: user?.deliveryAddress?.address,
      cityId: user?.deliveryAddress?.cityId,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      ...correctArgs(args),
      deliveryAddress: { address: args?.address, cityId: args?.cityId }
    },
    onCompleted: () => {
      globalAny.setNotification(true, 'Profile successfully updated!')
      refetch()
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
        targetProp={'email'}
      />
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'phoneNumber'}
      />
      <Button
        onClick={(): void => {
          router.push(`${generateAdminUrl(type)}/user/reset-password`)
        }}
      >
        {'Save Changes'}
      </Button>
      {type === UserType.CUSTOMER && (
        <>
          <Text args={args} setArgs={setArgs} targetProp={'address'} />
          <CitiesSelect args={args} error={validateFields} setArgs={setArgs} />
        </>
      )}
      <Button
        disabled={updateMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          updateMutation()
        }}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateUser
