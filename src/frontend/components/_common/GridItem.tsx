import { ReactElement } from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material'

export const CartGridItem = ({
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

export const CheckoutProductGridItem = ({
  productName,
  productVariantName,
  quantity,
  totalPrice
}: {
  productName: string
  productVariantName?: string
  quantity: string
  totalPrice: string
}): ReactElement => {
  return (
    <>
      <Grid container>
        <Grid item xs={6} md={6} lg={6}>
          <Typography
            sx={{ marginBottom: productVariantName ? 0 : 1 }}
            variant={'h3'}
          >
            {productName}
          </Typography>
          <Typography
            color={'textSecondary'}
            sx={{ marginBottom: 1 }}
            variant={'h5'}
          >
            {productVariantName}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Grid container justifyContent={'flex-end'}>
            <Box>
              <Typography sx={{ marginBottom: 1 }} variant={'h4'}>
                {quantity}
              </Typography>
              <Typography sx={{ marginBottom: 3 }} variant={'h4'}>
                {totalPrice}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 3 }} />
    </>
  )
}

export const CheckoutSummaryGridItem = ({
  contentLeft,
  contentRight
}: {
  contentLeft: string
  contentRight: string
}): ReactElement => {
  return (
    <Grid container>
      <Grid item xs={6} md={6} lg={6}>
        <Typography color={'textSecondary'} variant={'h5'}>
          {contentLeft}
        </Typography>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <Grid container justifyContent={'flex-end'}>
          <Typography color={'textSecondary'} variant={'h5'}>
            {contentRight}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
