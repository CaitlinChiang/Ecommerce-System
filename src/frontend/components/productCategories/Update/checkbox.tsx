import { ReactElement } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Checkbox } from '@mui/material'
import { ProductCategory } from '../../../../types/productCategory'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateProductCategoryCheckbox = ({
  disabled,
  productCategory,
  refetchArgs
}: {
  disabled: boolean
  productCategory: ProductCategory
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { ...productCategory, showPublic: !productCategory.showPublic },
    onCompleted: () => {
      globalAny.setNotification(true, 'Product category successfully updated!')
      refetchData(refetchArgs)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Checkbox
      checked={productCategory.showPublic}
      disabled={disabled || updateMutationState.loading}
      onChange={(): void => {
        updateMutation()
      }}
    />
  )
}

export default UpdateProductCategoryCheckbox
