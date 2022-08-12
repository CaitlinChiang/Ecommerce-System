import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { CreateProductCategoryArgs } from '../../../../types/productCategory'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import Text from '../../_common/TextField'
import CheckboxField from '../../_common/CheckboxField'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const globalAny: any = global

const CreateProductCategory = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  if (!authenticateUser(AdminPermission.CREATE_PRODUCT_CATEGORY)) return

  const [args, setArgs] = useState<CreateProductCategoryArgs>({
    name: null,
    showPublic: false
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Product category successfully created!')
      refetchData(refetchArgs)
      setValidateFields(false)
      setArgs(clearFields(args))
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <Text
        args={args}
        error={validateFields}
        placeholder={'Product Category (ex. Tops)'}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
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

export default CreateProductCategory
