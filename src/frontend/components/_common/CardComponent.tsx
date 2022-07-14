import { ReactElement } from 'react'
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material'

const CardComponent = ({
  content,
  imageAlt,
  imageSource,
  width
}: {
  content: ReactElement
  imageAlt?: string
  imageSource?: string
  width?: number
}): ReactElement => {
  return (
    <Card
      sx={{
        width: width || 250,
        marginTop: 5,
        marginRight: 5,
        display: 'inline-block'
      }}
    >
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
    </Card>
  )
}

export default CardComponent
