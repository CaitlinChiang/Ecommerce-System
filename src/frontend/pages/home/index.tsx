import { ReactElement } from 'react'
import { Divider } from '@mui/material'
import layout from '../../layouts/customer'
import HomeSlogan from '../../components/websiteTexts/Showcase/homeSlogan'
import ProductsCards from '../../components/products/Showcase/cards'
import ReviewsCards from '../../components/reviews/Showcase/cards'
import AboutWriteup from '../../components/websiteTexts/Showcase/aboutWriteup'

const Page = (): ReactElement => {
  const homePageComponents = [
    <HomeSlogan />,
    <ProductsCards featured={true} />,
    <ReviewsCards featured={true} />,
    <AboutWriteup />
  ]

  return (
    <>
      {homePageComponents.map(
        (component: ReactElement, index: number): ReactElement => {
          if (index === 3) return component
          return (
            <>
              {component}
              <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
            </>
          )
        }
      )}
    </>
  )
}

export default layout(Page, {})
