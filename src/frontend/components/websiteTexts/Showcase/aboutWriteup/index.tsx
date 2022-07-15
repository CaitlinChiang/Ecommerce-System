import { ReactElement } from 'react'
import theme from '../../../../themes'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import query from '../../Showcase/query'
import { Button, Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'

const AboutWriteup = (): ReactElement => {
  const router = useRouter()

  const { data } = useQuery(query, {
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

export default AboutWriteup
