import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import NumberField from '../../_common/NumberField'
import { refetchData } from '../../../_utils/refetchData'

const CreateCity = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    name: null,
    shippingFee: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: {
      ...args,
      shippingFee: parseFloat(Number(args.shippingFee)?.toFixed(2))
    },
    onCompleted: () => {
      console.log('City & shipping fee successfully created!')
      refetchData(refetchArgs)
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Text
        args={args}
        placeholder={'City (ex. Makati)'}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <NumberField
        args={args}
        required={true}
        setArgs={setArgs}
        targetProp={'shippingFee'}
      />
      <Button
        onClick={() => createMutation()}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
    </>
  )
}

export default CreateCity
