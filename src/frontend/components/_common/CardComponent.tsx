import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/_common/cardComponent'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'

const globalAny: any = global

const CardComponent = ({
  content,
  imageAlt,
  imageSource,
  productVariantId,
  redirectLink,
  width
}: {
  content: ReactElement
  imageAlt?: string
  imageSource?: string
  productVariantId?: string
  redirectLink?: { path: string; url: string }
  width?: number
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
    <Card sx={{ ...styles.card, width }} onClick={handleOnClick}>
      <CardActionArea>
        {imageSource && (
          <CardMedia
            alt={imageAlt}
            component={'img'}
            height={'200'}
            image={imageSource}
          />
        )}
        <CardContent>{content}</CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardComponent
