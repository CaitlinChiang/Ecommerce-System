import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { GetWebsiteText } from '../../View/query'
import mutation from '../mutation'
import { Button, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import Text from '../../../_common/TextField'
import {
  displayContactInformation,
  formatContactInformation
} from '../../../../_utils/handleFormatting/formatContactInformation'

const globalAny: any = global

const UpdateContactInformation = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    email: null,
    facebook: null,
    instagram: null,
    phoneNumber: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, refetch } = useQuery(GetWebsiteText, {
    variables: { type: WebsiteTextType.CONTACT_INFORMATION }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  useEffect(() => {
    setArgs({
      facebook: displayContactInformation('Facebook', websiteText),
      instagram: displayContactInformation('Instagram', websiteText),
      email: displayContactInformation('Email', websiteText),
      phoneNumber: displayContactInformation('PhoneNumber', websiteText)
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      content: formatContactInformation(args),
      type: WebsiteTextType.CONTACT_INFORMATION
    },
    onCompleted: () => {
      globalAny.setNotification(true, 'Contact information successfully updated!')
      setValidateFields(false)
      refetch()
    },
    onError: (error) => globalAny.setNotification(false, error.message)
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

export default UpdateContactInformation
