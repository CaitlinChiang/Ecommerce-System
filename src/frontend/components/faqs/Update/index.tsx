import { ReactElement, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetFAQ } from '../View/query'
import mutation from './mutation'
import { Typography } from '@mui/material'
import { FAQ, UpdateFAQArgs } from '../../../../types/faq'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import ModalComponent from '../../_common/ModalComponent'
import Text from '../../_common/TextField'
import { correctArgs } from '../../../_utils/handleArgs/correctArgs'
import { refetchData } from '../../../_utils/handleData/refetchData'

const globalAny: any = global

const UpdateFAQ = ({
  _id,
  onClose,
  open,
  refetchArgs
}: {
  _id: string
  onClose: VoidFunction
  open: boolean
  refetchArgs: RefetchDataArgs
}): ReactElement => {
  const [args, setArgs] = useState<UpdateFAQArgs>({
    _id: null,
    answer: null,
    question: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetFAQ, { skip: !_id, variables: { _id } })
  const faq: FAQ = data?.get_faq || {}

  useEffect(() => {
    setArgs({
      _id,
      answer: faq?.answer,
      question: faq?.question
    })
  }, [data])

  const [updateMutation] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'FAQ successfully updated!')
      refetchData(refetchArgs)
      setValidateFields(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <ModalComponent
      content={
        <>
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
        </>
      }
      loading={loading}
      onClose={onClose}
      open={open}
      primaryButtonOnClick={(): void => {
        setValidateFields(true)
        updateMutation()
      }}
      title={'Update FAQ'}
    />
  )
}

export default UpdateFAQ
