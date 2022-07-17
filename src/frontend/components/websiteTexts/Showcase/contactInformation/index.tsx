import React, { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../../Showcase/query'
import { Link, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import { formatContactInformation } from '../../../../_utils/handleFormatting/formatContactInformation'

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
      facebook: formatContactInformation('Facebook', websiteText),
      instagram: formatContactInformation('Instagram', websiteText),
      email: formatContactInformation('Email', websiteText),
      phoneNumber: formatContactInformation('PhoneNumber', websiteText)
    })
  }, [data])

  return (
    <>
      <Typography variant={'h4'} sx={{ marginBottom: 4 }}>
        {'Contact Information'}
      </Typography>
      {args?.facebook && (
        <Typography variant={'h6'} sx={{ display: 'inline-block', marginRight: 5 }}>
          <Link color={'#ffffff'} href={args?.facebook}>
            {'Facebook'}
          </Link>
        </Typography>
      )}
      {args?.instagram && (
        <Typography variant={'h6'} sx={{ display: 'inline-block', marginRight: 5 }}>
          <Link color={'#ffffff'} href={args?.instagram}>
            {'Instagram'}
          </Link>
        </Typography>
      )}
      <Typography variant={'h6'} sx={{ display: 'inline-block', marginRight: 5 }}>
        {args.email}
      </Typography>
      <Typography variant={'h6'} sx={{ display: 'inline-block', marginRight: 5 }}>
        {args.phoneNumber}
      </Typography>
    </>
  )
}

export default ContactInformation
