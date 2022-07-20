import React, { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../../Showcase/query'
import styles from '../../../../styles/websiteTexts'
import { Link, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import { displayContactInformation } from '../../../../_utils/handleFormatting/formatContactInformation'

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
      facebook: displayContactInformation('Facebook', websiteText),
      instagram: displayContactInformation('Instagram', websiteText),
      email: displayContactInformation('Email', websiteText),
      phoneNumber: displayContactInformation('PhoneNumber', websiteText)
    })
  }, [data])

  return (
    <>
      <Typography sx={styles.contactInfoHeader}>{'Contact Information'}</Typography>
      {args?.facebook && (
        <Typography sx={styles.contactInfoText}>
          <Link color={'#ffffff'} href={args?.facebook}>
            {'Facebook'}
          </Link>
        </Typography>
      )}
      {args?.instagram && (
        <Typography sx={styles.contactInfoText}>
          <Link color={'#ffffff'} href={args?.instagram}>
            {'Instagram'}
          </Link>
        </Typography>
      )}
      <Typography sx={styles.contactInfoText}>{args.email}</Typography>
      <Typography sx={styles.contactInfoText}>{args.phoneNumber}</Typography>
    </>
  )
}

export default ContactInformation
