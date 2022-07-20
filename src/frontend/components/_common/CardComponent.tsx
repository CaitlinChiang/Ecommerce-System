import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/_common/cardComponent'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'

const CardComponent = ({
  content,
  imageAlt,
  imageSource,
  redirectLink,
  width
}: {
  content: ReactElement
  imageAlt?: string
  imageSource?: string
  redirectLink?: any
  width?: number
}): ReactElement => {
  const router = useRouter()

  const CardDisplay = ({ content }: { content: ReactElement }): ReactElement => {
    if (redirectLink) {
      return (
        <Card
          sx={{ ...styles.card, width: width || 250 }}
          onClick={(): void => {
            router.push(redirectLink)
          }}
        >
          {content}
        </Card>
      )
    }

    if (!redirectLink) {
      return <Card sx={{ ...styles.card, width: width || 250 }}>{content}</Card>
    }
  }

  return (
    <CardDisplay
      content={
        <CardActionArea>
          {imageSource?.length > 0 && (
            <CardMedia
              alt={imageAlt}
              component={'img'}
              height={'200'}
              image={imageSource}
            />
          )}
          <CardContent>{content}</CardContent>
        </CardActionArea>
      }
    />
  )
}

export default CardComponent
