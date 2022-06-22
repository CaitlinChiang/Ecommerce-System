import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import query from '../Showcase/query'
import mutation from './mutation'
import { Button, Typography } from '@mui/material'
import { WebsiteText } from '../../../../types/websiteText'
import { WebsiteTextType } from '../../../_enums/websiteTextType'
import Text from '../../_common/TextField'

const UpdateAboutWriteup = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    content: null,
    type: null
  })

  const { data, refetch } = useQuery(query, {
    variables: { type: WebsiteTextType.ABOUT_WRITEUP }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  useEffect(() => {
    setArgs({
      content: websiteText?.content,
      type: WebsiteTextType.ABOUT_WRITEUP
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: args,
    onCompleted: () => {
      console.log('Update Success')
      refetch()
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Last Updated At: ${websiteText?.updatedAt}`}</Typography>
      <Text
        args={args}
        error={args['content']?.length > 700}
        helperText={'You have surpassed the character limit.'}
        maxLength={700}
        multiline={true}
        placeholder={'Type about page write-up here...'}
        required={true}
        setArgs={setArgs}
        targetProp={'content'}
      />
      <Button
        onClick={() => updateMutation()}
        disabled={updateMutationState.loading}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateAboutWriteup
