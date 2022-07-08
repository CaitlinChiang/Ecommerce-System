import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { City } from '../../../../types/city'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import NumberField from '../../_common/NumberField'
import { formatShippingFee } from '../../../_utils/handleFormatting/formatShippingFee'
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
      ...args,
      shippingFee: formatShippingFee(args?.shippingFee)
    },
    onCompleted: () => {
      console.log('City & shipping fee successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
      setUpdateModalOpen(false)
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Created At: ${city?.createdAt}`}</Typography>
      {city?.updatedAt && (
        <Typography>{`Last Updated At: ${city?.updatedAt}`}</Typography>
      )}
      <Text
        args={args}
        error={validateFields && !args?.name}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <NumberField
        args={args}
        error={validateFields && !args?.shippingFee}
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
    </>
  )
}

export default UpdateCity
