import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import { refetchData } from '../../../_utils/refetchData'

const CreatePaymentMethod = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    name: null,
    details: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      console.log('Payment method successfully created!')
      refetchData(refetchArgs)
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Text
        args={args}
        placeholder={'Payment Method (ex. BDO Bank Transfer)'}
        required={true}
        setArgs={setArgs}
        targetProp={'name'}
      />
      <Text
        args={args}
        placeholder={'Bank Details (ex. BDO Account - 5210 6988 8182 2136)'}
        required={true}
        setArgs={setArgs}
        targetProp={'details'}
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

export default CreatePaymentMethod
