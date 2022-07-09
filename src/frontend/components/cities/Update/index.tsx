import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { City } from '../../../../types/city'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import NumberField from '../../_common/NumberField'
import Notification from '../../_common/Notification'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { formatFee } from '../../../_utils/handleFormatting/formatFee'
import { refetchData } from '../../../_utils/handleData/refetchData'

const UpdateCity = ({
  _id,
  refetchArgs,
  setUpdateModalOpen
}: {
  _id: string
  refetchArgs: RefetchDataArgs
  setUpdateModalOpen: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    _id: null,
    name: null,
    shippingFee: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const { data } = useQuery(querySingular, {
    variables: { _id }
  })

  const city: City = data?.get_city || {}

  useEffect(() => {
    setArgs({
      _id,
      name: city?.name,
      shippingFee: city?.shippingFee
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      ...correctArgs(args),
      shippingFee: formatFee(args?.shippingFee)
    },
    onCompleted: () => {
      setNotification({
        message: 'City & shipping fee successfully updated!',
        success: true
      })
      refetchData(refetchArgs)
      setValidateFields(false)
      setUpdateModalOpen(false)
    },
    onError: (error) => setNotification({ message: error.message, success: false })
  })

  return (
    <>
      <Typography>{`Created At: ${city?.createdAt}`}</Typography>
      {city?.updatedAt && (
        <Typography>{`Last Updated At: ${city?.updatedAt}`}</Typography>
      )}
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <NumberField
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'shippingFee'}
      />
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

export default UpdateCity
