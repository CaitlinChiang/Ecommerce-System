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
import Notification from '../../../_common/Notification'
import { formatContactInformation } from '../../../../_utils/handleFormatting/formatContactInformation'

const UpdateContactInformation = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    email: null,
    facebook: null,
    instagram: null,
    phoneNumber: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)
  const [notification, setNotification] = useState<any>({
    message: null,
    success: null
  })

  const { data, refetch } = useQuery(query, {
    variables: { type: WebsiteTextType.CONTACT_INFORMATION }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  useEffect(() => {
    setArgs({
      facebook: formatContactInformation('Facebook', websiteText),
      instagram: formatContactInformation('Instagram', websiteText),
      email: formatContactInformation('Email', websiteText),
      phoneNumber: formatContactInformation('PhoneNumber', websiteText)
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
      setNotification({
        message: 'Contact information successfully updated!',
        success: true
      })
      setValidateFields(false)
      refetch()
    },
    onError: (error) => setNotification({ message: error.message, success: false })
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
      <Notification message={notification.message} success={notification.success} />
    </>
  )
}

export default UpdateContactInformation
