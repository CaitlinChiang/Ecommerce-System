import { ReactElement } from 'react'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

const CardComponent = ({
  content,
  imageAlt,
  imageSource,
  maxWidth
}: {
  content: ReactJSXElement
  imageAlt?: string
  imageSource?: string
  maxWidth?: number
}): ReactElement => {
  return (
    <Card sx={{ maxWidth: maxWidth || 350 }}>
      <CardActionArea>
        {imageSource?.length > 0 && (
          <CardMedia
            alt={imageAlt}
            component={'img'}
            height={'160'}
            image={imageSource}
          />
        )}
        <CardContent>{content}</CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardComponent
