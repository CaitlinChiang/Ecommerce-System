import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import { refetchData } from '../../../_utils/handleData/refetchData'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const CreateFAQ = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    answer: null,
    question: null
  })

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      console.log('FAQ successfully created!')
      refetchData(refetchArgs)
      setArgs(clearFields(args))
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Text args={args} required={true} setArgs={setArgs} targetProp={'question'} />
      <Text args={args} required={true} setArgs={setArgs} targetProp={'answer'} />
      <Button
        onClick={() => createMutation()}
        disabled={createMutationState.loading}
      >
        {'Create'}
      </Button>
    </>
  )
}

export default CreateFAQ
