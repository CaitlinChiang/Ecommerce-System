import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { querySingular } from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { FAQ } from '../../../../types/faq'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import { refetchData } from '../../../_utils/handleData/refetchData'

const UpdateFAQ = ({
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
    answer: null,
    question: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data } = useQuery(querySingular, {
    variables: { _id }
  })

  const faq: FAQ = data?.get_faq || {}

  useEffect(() => {
    setArgs({
      _id,
      answer: faq?.answer,
      question: faq?.question
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      console.log('FAQ successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
      setUpdateModalOpen(false)
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Created At: ${faq?.createdAt}`}</Typography>
      {faq?.updatedAt && (
        <Typography>{`Last Updated At: ${faq?.updatedAt}`}</Typography>
      )}
      <Text
        args={args}
        error={validateFields && !args?.question}
        required={true}
        setArgs={setArgs}
        targetProp={'question'}
      />
      <Text
        args={args}
        error={validateFields && !args?.answer}
        required={true}
        setArgs={setArgs}
        targetProp={'answer'}
      />
      <Button
        onClick={() => {
          setValidateFields(true)
          updateMutation()
        }}
        disabled={updateMutationState.loading}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateFAQ
