import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../../Showcase/query'
import styles from '../../../../styles/websiteTexts'
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
      <Typography>{'About Company Name'}</Typography>
      <Typography sx={styles.aboutWriteup}>{websiteText.content}</Typography>
    </>
  )
}

export default AboutWriteup
