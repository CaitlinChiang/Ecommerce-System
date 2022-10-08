import { ReactElement } from 'react'
import { Grid } from '@mui/material'

const GridItem = ({
  content,
  xs,
  md,
  lg
}: {
  content: ReactElement
  xs?: number
  md?: number
  lg?: number
}): ReactElement => {
  return (
    <Grid
      display={'flex'}
      direction={'column'}
      item
      justifyContent={'center'}
      xs={xs}
      md={md}
      lg={lg}
    >
      {content}
    </Grid>
  )
}

export default GridItem
