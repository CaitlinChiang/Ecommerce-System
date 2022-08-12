import { ReactElement, useState } from 'react'
import { useMutation } from '@apollo/client'
import mutation from './mutation'
import { Button } from '@mui/material'
import { CreateReviewArgs } from '../../../../types/review'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'
import { clearFields } from '../../../_utils/handleFields/clearFields'

const globalAny: any = global

const CreateReview = ({
  refetchArgs
}: {
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<CreateReviewArgs>({
    content: null,
    featured: false,
    username: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const [createMutation, createMutationState] = useMutation(mutation, {
    variables: { ...correctArgs(args), username: args?.username || 'Anonymous' },
    onCompleted: () => {
      globalAny.setNotification(true, 'Review successfully submitted!')
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
        maxLength={150}
        placeholder={'Feel free to write us a review!'}
        required={true}
        setArgs={setArgs}
        targetProp={'content'}
      />
      <Text
        args={args}
        placeholder={'Name (optional)'}
        setArgs={setArgs}
        targetProp={'username'}
      />
      <Button
        disabled={createMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          createMutation()
        }}
      >
        {'Submit'}
      </Button>
    </>
  )
}

export default CreateReview
