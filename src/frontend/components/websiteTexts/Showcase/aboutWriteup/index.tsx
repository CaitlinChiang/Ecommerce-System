import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../../Showcase/query'
import { Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'

const AboutWriteup = (): ReactElement => {
  const { data } = useQuery(GetWebsiteText, {
    variables: { type: WebsiteTextType.ABOUT_WRITEUP }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  return (
    <>
      <Typography variant={'h4'}>{'About Company Name'}</Typography>
      <Typography
        sx={{ maxWidth: 550, marginTop: 5, marginLeft: 120, textAlign: 'right' }}
        variant={'h6'}
      >
        {websiteText.content}
      </Typography>
    </>
  )
}

export default AboutWriteup
