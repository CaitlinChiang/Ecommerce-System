import { ReactElement } from 'react'
import { Divider } from '@mui/material'
import layout from '../../layouts'
import ProductsCards from '../../components/products/Showcase/cards'
import ReviewsCards from '../../components/reviews/Showcase/cards'

const Page = (): ReactElement => {
  return (
    <>
      <ProductsCards featured={true} />
      <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
      <ReviewsCards featured={true} />
    </>
  )
}

export default layout(Page, {})
