import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { ProductCategory } from '../../../../types/productCategory'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import CheckboxField from '../../_common/CheckboxField'
import { refetchData } from '../../../_utils/refetchData'

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

  const { data } = useQuery(querySingular, {
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

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      console.log('Product category successfully updated!')
      refetchData(refetchArgs)
      setUpdateModalOpen(false)
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Created At: ${productCategory?.createdAt}`}</Typography>
      {productCategory?.updatedAt && (
        <Typography>{`Last Updated At: ${productCategory?.updatedAt}`}</Typography>
      )}
      <Text args={args} required={true} setArgs={setArgs} targetProp={'name'} />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
      <Button
        onClick={() => updateMutation()}
        disabled={updateMutationState.loading}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateProductCategory
