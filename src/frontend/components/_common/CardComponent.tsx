import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Card, CardActionArea, CardContent, Grid } from '@mui/material'

const globalAny: any = global

const CardComponent = ({
  content,
  imageAlt,
  imageSource,
  productVariantId,
  redirectLink
}: {
  content: ReactElement
  imageAlt?: string
  imageSource?: string
  productVariantId?: string
  redirectLink?: { path: string; url: string }
}): ReactElement => {
  const router = useRouter()

  const handleOnClick = (): void => {
    if (!productVariantId && !redirectLink) return null

    if (productVariantId) {
      globalAny.setProductVariantId(productVariantId)
    }

    if (redirectLink) {
      router.push(redirectLink.path, redirectLink.url)
    }
  }

  return (
    <Grid item xs={6} md={4} lg={3} display={'flex'}>
      <Card onClick={handleOnClick} sx={{ p: 0, width: '100%' }}>
        <CardActionArea>
          {imageSource && <img alt={imageAlt} src={imageSource} width={'100%'} />}
          <CardContent sx={{ p: 3 }}>{content}</CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default CardComponent
