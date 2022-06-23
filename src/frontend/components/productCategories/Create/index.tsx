import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import CheckboxField from '../../_common/CheckboxField'
import { refetchData } from '../../../_utils/refetchData'

const CreateProductCategory = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    name: null,
    showPublic: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      console.log('Product category successfully created!')
      refetchData(refetchArgs)
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Text args={args} required={true} setArgs={setArgs} targetProp={'name'} />
      <CheckboxField args={args} setArgs={setArgs} targetProp={'showPublic'} />
      <Button
        onClick={() => createMutation()}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
    </>
  )
}

export default CreateProductCategory
