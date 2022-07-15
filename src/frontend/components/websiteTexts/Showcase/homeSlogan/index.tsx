import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import query from '../../Showcase/query'
import { Typography } from '@mui/material'
import { WebsiteText } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'

const HomeSlogan = (): ReactElement => {
  const router = useRouter()

  const { data } = useQuery(query, {
    variables: { type: WebsiteTextType.HOME_SLOGAN }
  })

  const websiteText: WebsiteText = data?.get_website_text || {}

  return (
    <>
      <Typography>{websiteText.content}</Typography>
    </>
  )
}

export default HomeSlogan
