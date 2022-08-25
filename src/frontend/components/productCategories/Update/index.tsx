import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetProductCategory } from '../View/query'
import mutation from './mutation'
import { Typography } from '@mui/material'
import {
  ProductCategory,
  UpdateProductCategoryArgs
} from '../../../../types/productCategory'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import ModalComponent from '../../_common/ModalComponent'
import Text from '../../_common/TextField'
import CheckboxField from '../../_common/CheckboxField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateProductCategory = ({
  _id,
  onClose,
  open,
  refetchArgs
}: {
  _id: string
  onClose: VoidFunction
  open: boolean
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<UpdateProductCategoryArgs>({
    _id: null,
    name: null,
    showPublic: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetProductCategory, {
    skip: !_id,
    variables: { _id }
  })
  const productCategory: ProductCategory = data?.get_product_category || {}

  useEffect(() => {
    setArgs({
      _id,
      name: productCategory?.name,
      showPublic: productCategory?.showPublic
    })
  }, [data])

  const [updateMutation] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Product category successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <ModalComponent
      content={
        <>
          <Typography>{`Created At: ${productCategory?.createdAt}`}</Typography>
          <Typography>{`Last Updated At: ${
            productCategory?.updatedAt || '-'
          }`}</Typography>
          <Text
            args={args}
            error={validateFields}
            required={true}
            setArgs={setArgs}
            targetProp={'name'}
          />
          <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
        </>
      }
      loading={loading}
      onClose={onClose}
      open={open}
      primaryButtonOnClick={(): void => {
        setValidateFields(true)
        updateMutation()
      }}
      title={'Update Product Category'}
    />
  )
}

export default UpdateProductCategory
