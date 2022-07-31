import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { GetWebsiteText } from '../../View/query'
import mutation from '../mutation'
import { Button, CircularProgress, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { AdminPermission } from '../../../../_enums/adminPermission'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import Text from '../../../_common/TextField'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import {
  displayContactInfo,
  formatContactInfo
} from '../../../../_utils/handleFormat/formatContactInfo'

const globalAny: any = global

const UpdateContactInformation = (): ReactElement => {
  const disableUpdateWebsiteText = !authenticateUser(
    AdminPermission.UPDATE_WEBSITE_TEXT
  )

  const [args, setArgs] = useState<any>({
    email: null,
    facebook: null,
    instagram: null,
    phoneNumber: null
  })
  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading, refetch } = useQuery(GetWebsiteText, {
    variables: { type: WebsiteTextType.CONTACT_INFORMATION }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  useEffect(() => {
    setArgs({
      facebook: displayContactInfo('Facebook', websiteText),
      instagram: displayContactInfo('Instagram', websiteText),
      email: displayContactInfo('Email', websiteText),
      phoneNumber: displayContactInfo('PhoneNumber', websiteText)
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: {
      content: formatContactInfo(args),
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
      {loading && <CircularProgress />}
      <Typography>{`Last Updated At: ${websiteText?.updatedAt || '-'}`}</Typography>
      <Text
        args={args}
        disabled={disableUpdateWebsiteText}
        setArgs={setArgs}
        targetProp={'facebook'}
      />
      <Text
        args={args}
        disabled={disableUpdateWebsiteText}
        setArgs={setArgs}
        targetProp={'instagram'}
      />
      <Text
        args={args}
        disabled={disableUpdateWebsiteText}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'email'}
      />
      <Text
        args={args}
        disabled={disableUpdateWebsiteText}
        error={validateFields}
        required={true}
        setArgs={setArgs}
        targetProp={'phoneNumber'}
      />
      <Button
        disabled={disableUpdateWebsiteText || updateMutationState.loading}
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
