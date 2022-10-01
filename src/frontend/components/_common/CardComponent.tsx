import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Card, CardActionArea, CardContent } from '@mui/material'

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
    <Card onClick={handleOnClick} sx={{ p: 0, width: '100%' }}>
      <CardActionArea>
        {imageSource && <img src={imageSource} alt={imageAlt} width={'100%'} />}
        <CardContent sx={{ p: 3 }}>{content}</CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardComponent
