import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button } from '@mui/material'
import { User } from '../../../../types/user'
import CitiesSelect from '../../../components/cities/Showcase/select'
import Text from '../../_common/TextField'
import Notification from '../../_common/Notification'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'

const UpdateUser = ({ _id }: { _id: string }): ReactElement => {
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
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const { data, refetch } = useQuery(querySingular, {
    variables: { _id }
  })

  const user: User = data?.get_user || {}

  useEffect(() => {
    setArgs({
      _id,
      address: user?.deliveryAddress?.address,
      cityId: user?.deliveryAddress?.cityId,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      setNotification({
        message: 'Profile successfully updated!',
        success: true
      })
      refetch()
    },
    onError: (error) => setNotification({ message: error.message, success: false })
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
      <Text args={args} setArgs={setArgs} targetProp={'address'} />
      <CitiesSelect args={args} error={validateFields} setArgs={setArgs} />
      <Button
        onClick={() => {
          setValidateFields(true)
          updateMutation()
        }}
        disabled={updateMutationState.loading}
      >
        {'Save Changes'}
      </Button>
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default UpdateUser
