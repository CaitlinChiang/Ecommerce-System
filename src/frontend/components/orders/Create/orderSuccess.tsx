import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button, Card, CardContent, Grid, Link, Typography } from '@mui/material'

const OrderSuccess = (): ReactElement => {
  const router = useRouter()

  return (
    <Card sx={{ width: '90%', margin: 'auto' }}>
      <CardContent>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
        >
          <Grid item>
            <Typography variant={'h2'}>{'Order Successful!'}</Typography>
            <Typography sx={{ marginTop: 5, marginBottom: 2 }} variant={'h4'}>
              {'Order receipt has been sent to your email.'}
            </Typography>
            <Link href={'/orders'}>
              <Typography variant={'h4'}>
                {'You may track your order here.'}
              </Typography>
            </Link>
            <Button
              color={'primary'}
              onClick={(): void => {
                router.push('/')
              }}
              sx={{ marginTop: 5, width: 300 }}
              variant={'contained'}
            >
              {'Return to Home'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrderSuccess
