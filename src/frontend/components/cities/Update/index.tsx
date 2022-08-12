import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetCity } from '../View/query'
import mutation from './mutation'
import { Button, CircularProgress, Typography } from '@mui/material'
import { City, UpdateCityArgs } from '../../../../types/city'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import NumberField from '../../_common/NumberField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from 'frontend/_utils/handleData/refetchData'

const globalAny: any = global

const UpdateCity = ({
  _id,
  refetchArgs
}: {
  _id: string
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<UpdateCityArgs>({
    _id: null,
    name: null,
    shippingFee: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetCity, { variables: { _id } })
  const city: City = data?.get_city || {}

  useEffect(() => {
    setArgs({
      _id,
      name: city?.name,
      shippingFee: city?.shippingFee
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'City & shipping fee successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Typography>{`Created At: ${city?.createdAt}`}</Typography>
      <Typography>{`Last Updated At: ${city?.updatedAt || '-'}`}</Typography>
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

export default UpdateCity
