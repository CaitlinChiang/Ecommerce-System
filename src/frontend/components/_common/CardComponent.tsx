import { ReactElement } from 'react'
import { useRouter } from 'next/router'
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
          sx={{
            width: width || 250,
            marginTop: 5,
            marginRight: 5,
            display: 'inline-block'
          }}
          onClick={(): void => {
            if (redirectLink) router.push(redirectLink)
          }}
        >
          {content}
        </Card>
      )
    }

    if (!redirectLink) {
      return (
        <Card
          sx={{
            width: width || 250,
            marginTop: 5,
            marginRight: 5,
            display: 'inline-block'
          }}
        >
          {content}
        </Card>
      )
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
