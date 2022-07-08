import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import query from '../../Showcase/query'
import mutation from '../mutation'
import { Button, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextId } from '../../../../_enums/websiteTextId'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import Text from '../../../_common/TextField'
import { correctArgs } from '../../../../_utils/handleArgs/correctArgs'

const UpdateHomeSlogan = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    _id: null,
    content: null,
    type: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, refetch } = useQuery(query, {
    variables: { type: WebsiteTextType.HOME_SLOGAN }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  useEffect(() => {
    setArgs({
      _id: WebsiteTextId.HOME_SLOGAN,
      content: websiteText?.content,
      type: WebsiteTextType.HOME_SLOGAN
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      console.log('Update Success')
      setValidateFields(false)
      refetch()
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Last Updated At: ${websiteText?.updatedAt}`}</Typography>
      <Text
        args={args}
        error={validateFields}
        maxLength={100}
        placeholder={'Type home page slogan here...'}
        required={true}
        setArgs={setArgs}
        targetProp={'content'}
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

export default UpdateHomeSlogan
