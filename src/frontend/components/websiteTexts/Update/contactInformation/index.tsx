import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { GetWebsiteText } from '../../View/query'
import mutation from '../mutation'
import { Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import UpdateHistory from '../../../_common/UpdateHistory'
import Text from '../../../_common/TextField'
import MutationButton from '../../../_common/MutationButton'
import {
  displayContactInfo,
  formatContactInfo
} from '../../../../_utils/handleFormat/formatContactInfo'

const globalAny: any = global

const UpdateContactInformation = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    email: null,
    facebook: null,
    instagram: null,
    phoneNumber: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetWebsiteText, {
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
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Card>
      <CardContent>
        {loading && <CircularProgress />}
        <Typography sx={{ marginBottom: 1 }} variant={'h2'}>
          {'Contact Information'}
        </Typography>
        <UpdateHistory obj={websiteText} websiteText={true} />
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
        <MutationButton
          disabled={updateMutationState.loading}
          onClick={(): void => {
            setValidateFields(true)
            updateMutation()
          }}
          title={'Save Changes'}
        />
      </CardContent>
    </Card>
  )
}

export default UpdateContactInformation
