import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../query'
import { Button, Box, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'

const HomeSlogan = (): ReactElement => {
  const router = useRouter()

  const { data } = useQuery(GetWebsiteText, {
    variables: { type: WebsiteTextType.HOME_SLOGAN }
  })
  const websiteText: WebsiteText = data?.get_website_text || {}

  return (
    <>
      <Box
        style={{
          backgroundImage: 'url(http://localhost:4000/images/homepage.jpeg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100vw',
          minHeight: '100vh'
        }}
      >
        <Box style={{ paddingTop: '15%', paddingLeft: '5%' }}>
          <Typography
            style={{
              fontSize: 50,
              color: '#000000',
              whiteSpace: 'pre-line'
            }}
            variant={'h1'}
          >
            {websiteText.content}
          </Typography>
          <Button
            color={'primary'}
            onClick={(): void => {
              router.push('/shop')
            }}
            style={{
              fontSize: 20,
              marginTop: 25,
              paddingLeft: 100,
              paddingRight: 100
            }}
            variant={'contained'}
          >
            {'Visit Shop'}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default HomeSlogan
