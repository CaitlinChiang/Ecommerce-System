import { NextPage } from 'next'
import { ReactElement } from 'react'
import { Box, Typography } from '@mui/material'
import HomeSlogan from '../components/websiteTexts/View/homeSlogan'
import ProductCards from '../components/products/View/cards'
import ReviewCards from '../components/reviews/View/cards'
import AboutWriteup from '../components/websiteTexts/View/aboutWriteup'
import layout from '../layouts/customer/homepage'

const Home: NextPage = (): ReactElement => {
  return (
    <>
      <HomeSlogan />

      <Box style={{ paddingTop: '1%', paddingLeft: '4%' }}>
        <Typography variant={'h1'} style={{ marginTop: 5 }}>
          {'Featured Products'}
        </Typography>
        <ProductCards featured={true} />
      </Box>

      <Box style={{ paddingTop: '1%', paddingLeft: '4%' }}>
        <Typography variant={'h1'} style={{ marginTop: 5 }}>
          {'Reviews from Customers'}
        </Typography>
        <ReviewCards featured={true} />
      </Box>

      <AboutWriteup />
    </>
  )
}

export default layout(Home)
