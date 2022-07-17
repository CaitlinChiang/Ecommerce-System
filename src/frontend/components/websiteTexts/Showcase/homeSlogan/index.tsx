import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import theme from '../../../../themes'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../../Showcase/query'
import { Button, Typography } from '@mui/material'
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
      <Typography sx={{ maxWidth: 550 }} variant={'h3'}>
        {websiteText.content}
      </Typography>
      <Button
        color={'primary'}
        onClick={(): void => {
          router.push('/shop')
        }}
        sx={{
          [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(1)
          }
        }}
      >
        {'Visit Shop'}
      </Button>
    </>
  )
}

export default HomeSlogan
