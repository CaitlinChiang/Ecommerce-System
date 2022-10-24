import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../query'
import { Box, Grid, Link, Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import { displayContactInfo } from '../../../../_utils/handleFormat/formatContactInfo'

const ContactInformation = (): ReactElement => {
  const { data } = useQuery(GetWebsiteText, {
    variables: { type: WebsiteTextType.CONTACT_INFORMATION }
  })
  const websiteText: WebsiteText = data?.get_website_text || {}

  const contactInfo = [
    {
      content: [displayContactInfo('Email', websiteText)],
      label: 'Email',
      icon: <EmailIcon />
    },
    {
      content: [displayContactInfo('PhoneNumber', websiteText)],
      label: 'Phone',
      icon: <LocalPhoneIcon />
    },
    {
      content: [
        displayContactInfo('Facebook', websiteText),
        displayContactInfo('Instagram', websiteText)
      ],
      label: 'Social Media',
      icon: <ShareIcon />
    }
  ]

  const contactInfoComponents = contactInfo.map(
    (info: { content: string[]; label: string; icon: ReactElement }) => {
      if (info.content.every((element: string) => element === null)) return

      let displayContent: any = null

      if (info.content?.length > 1) {
        displayContent = info.content.map((e: string) => {
          return (
            <Box sx={{ marginTop: -1 }}>
              <Link href={`https://${e}`} target='_blank'>
                {e?.includes('instagram') && (
                  <InstagramIcon sx={{ marginLeft: 2, marginBottom: -1.2 }} />
                )}
                {e?.includes('facebook') && (
                  <FacebookIcon sx={{ marginBottom: -1.2 }} />
                )}
              </Link>
            </Box>
          )
        })
      } else {
        displayContent = info.content[0]
      }

      return (
        <Grid container justifyContent='center' item xs={12} md={12} lg={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              paddingBottom: 1.5
            }}
          >
            {info.icon}
            <Typography sx={{ paddingLeft: 1 }} variant={'h5'}>
              {info.label}
            </Typography>
            <Box sx={{ paddingLeft: 2 }} />
            {displayContent}
          </Box>
        </Grid>
      )
    }
  )

  return (
    <Grid container spacing={2}>
      {contactInfoComponents}
    </Grid>
  )
}

export default ContactInformation
