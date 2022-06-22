import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import query from '../../Showcase/query'
import mutation from '../mutation'
import { Button, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import Text from '../../../_common/TextField'

const UpdateContactInformation = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    facebook: null,
    instagram: null,
    email: null,
    phoneNumber: null
  })

  const { data, refetch } = useQuery(query, {
    variables: { type: WebsiteTextType.CONTACT_INFORMATION }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  const formatLink = (arrayPosition: number): string => {
    const websiteTextSplit = websiteText?.content?.split(', ')
    const link = websiteTextSplit?.[arrayPosition].substring(
      websiteTextSplit[arrayPosition].indexOf('[') + 1,
      websiteTextSplit[arrayPosition].lastIndexOf(']')
    )

    return link
  }

  useEffect(() => {
    setArgs({
      facebook: formatLink(0),
      instagram: formatLink(1),
      email: formatLink(2),
      phoneNumber: formatLink(3)
    })
  }, [data])

  const formatContent = (args: any) => {
    return `Facebook-[${args.facebook}], Instagram-[${args.instagram}], Email-[${args.email}], PhoneNumber=[${args.phoneNumber}]`
  }

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      content: formatContent(args),
      type: WebsiteTextType.CONTACT_INFORMATION
    },
    onCompleted: () => {
      console.log('Update Success')
      refetch()
    },
    onError: (error) => console.log(error)
  })

  return (
    <>
      <Typography>{`Last Updated At: ${websiteText?.updatedAt}`}</Typography>
      <Text args={args} setArgs={setArgs} targetProp={'facebook'} />
      <Text args={args} setArgs={setArgs} targetProp={'instagram'} />
      <Text args={args} required={true} setArgs={setArgs} targetProp={'email'} />
      <Text
        args={args}
        required={true}
        setArgs={setArgs}
        targetProp={'phoneNumber'}
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

export default UpdateContactInformation
