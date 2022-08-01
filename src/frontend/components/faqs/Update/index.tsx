import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetFAQ } from '../View/query'
import mutation from './mutation'
import { Button, CircularProgress, Typography } from '@mui/material'
import { FAQ } from '../../../../types/faq'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import Text from '../../_common/TextField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateFAQ = ({
  _id,
  refetchArgs,
  setUpdateModalOpen
}: {
  _id: string
  refetchArgs: RefetchDataArgs
  setUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}): ReactElement => {
  const [args, setArgs] = useState<any>({
    _id: null,
    answer: null,
    question: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetFAQ, { variables: { _id } })

  const faq: FAQ = data?.get_faq || {}

  useEffect(() => {
    setArgs({
      _id,
      answer: faq?.answer,
      question: faq?.question
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs({ args }),
    onCompleted: () => {
      globalAny.setNotification(true, 'FAQ successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
      setUpdateModalOpen(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Typography>{`Created At: ${faq?.createdAt}`}</Typography>
      <Typography>{`Last Updated At: ${faq?.updatedAt || '-'}`}</Typography>
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'question'}
      />
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'answer'}
      />
      <Button
        disabled={updateMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          updateMutation()
        }}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateFAQ
