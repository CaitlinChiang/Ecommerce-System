import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GetWebsiteText } from '../query'
import styles from '../../../../styles/websiteTexts'
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
      <Typography sx={styles.homeSlogan}>{websiteText.content}</Typography>
      <Button
        onClick={(): void => {
          router.push('/shop')
        }}
        sx={styles.homeVisitShop}
      >
        {'Visit Shop'}
      </Button>
    </>
  )
}

export default HomeSlogan
