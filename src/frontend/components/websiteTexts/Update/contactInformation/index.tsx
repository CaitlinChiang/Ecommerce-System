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

const UpdateContactInformation = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    email: null,
    facebook: null,
    instagram: null,
    phoneNumber: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, refetch } = useQuery(query, {
    variables: { type: WebsiteTextType.CONTACT_INFORMATION }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  const formatValue = (medium: string): string => {
    const websiteTextSplit = websiteText?.content?.split(', ')

    const val = websiteTextSplit?.find((text: string) => text.includes(medium))

    const formattedVal = val?.substring(val.indexOf('[') + 1, val.indexOf(']'))
    return formattedVal
  }

  useEffect(() => {
    setArgs({
      facebook: formatValue('Facebook'),
      instagram: formatValue('Instagram'),
      email: formatValue('Email'),
      phoneNumber: formatValue('PhoneNumber')
    })
  }, [data])

  const formatContent = (args: any): string | null => {
    if (args?.email?.trim().length === 0 || args?.phoneNumber?.trim().length === 0) {
      return null
    }

    let contentString = `Email-[${args.email}], PhoneNumber-[${args.phoneNumber}]`

    if (args?.facebook?.trim().length > 0) {
      contentString += `, Facebook-[${args.facebook}]`
    }

    if (args?.instagram?.trim().length > 0) {
      contentString += `, Instagram-[${args.instagram}]`
    }

    return contentString
  }

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      _id: WebsiteTextId.CONTACT_INFORMATION,
      content: formatContent(args),
      type: WebsiteTextType.CONTACT_INFORMATION
    },
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
      <Text args={args} setArgs={setArgs} targetProp={'facebook'} />
      <Text args={args} setArgs={setArgs} targetProp={'instagram'} />
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'email'}
      />
      <Text
        args={args}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'phoneNumber'}
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

export default UpdateContactInformation
