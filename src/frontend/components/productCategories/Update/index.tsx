import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetProductCategory } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { ProductCategory } from '../../../../types/productCategory'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import CheckboxField from '../../_common/CheckboxField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateProductCategory = ({
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
    showPublic: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data } = useQuery(GetProductCategory, { variables: { _id } })

  const productCategory: ProductCategory = data?.get_product_category || {}

  useEffect(() => {
    setArgs({
      _id,
      name: productCategory?.name,
      showPublic: productCategory?.showPublic
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Product category successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
      setUpdateModalOpen(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <Typography>{`Created At: ${productCategory?.createdAt}`}</Typography>
      {productCategory?.updatedAt && (
        <Typography>{`Last Updated At: ${productCategory?.updatedAt}`}</Typography>
      )}
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
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

export default UpdateProductCategory
