import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../query'
import { Box, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'

const AboutWriteup = (): ReactElement => {
  const { data } = useQuery(GetWebsiteText, {
    variables: { type: WebsiteTextType.ABOUT_WRITEUP }
  })
  const websiteText: WebsiteText = data?.get_website_text || {}

  return (
    <>
      <Box
        style={{
          backgroundImage: 'url(http://localhost:4000/images/about.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100vw',
          minHeight: '100vh'
        }}
      >
        <Box style={{ marginTop: 25, paddingTop: '15%', paddingLeft: '5%' }}>
          <Typography style={{ color: '#ffffff' }} variant={'h1'}>
            {'About Company Name'}
          </Typography>
          <Typography
            style={{
              fontSize: 20,
              marginTop: 20,
              color: '#ffffff',
              whiteSpace: 'pre-line'
            }}
          >
            {websiteText.content}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default AboutWriteup
