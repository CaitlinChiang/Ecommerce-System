import React, { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../query'
import { Card, CardContent, Link, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import { displayContactInfo } from '../../../../_utils/handleFormat/formatContactInfo'

const ContactInformation = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    email: null,
    facebook: null,
    instagram: null,
    phoneNumber: null
  })

  const { data } = useQuery(GetWebsiteText, {
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

  return (
    <Card>
      <CardContent>
        <Typography>{'Contact Information'}</Typography>
        {args?.facebook && (
          <Typography>
            <Link color={'#ffffff'} href={args?.facebook}>
              {'Facebook'}
            </Link>
          </Typography>
        )}
        {args?.instagram && (
          <Typography>
            <Link color={'#ffffff'} href={args?.instagram}>
              {'Instagram'}
            </Link>
          </Typography>
        )}
        <Typography>{args.email}</Typography>
        <Typography>{args.phoneNumber}</Typography>
      </CardContent>
    </Card>
  )
}

export default ContactInformation
