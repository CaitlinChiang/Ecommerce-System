import { NextPage } from 'next'
import { ReactElement } from 'react'
import { Divider } from '@mui/material'
import HomeSlogan from '../components/websiteTexts/View/homeSlogan'
import ProductCards from '../components/products/View/cards'
import ReviewCards from '../components/reviews/View/cards'
import AboutWriteup from '../components/websiteTexts/View/aboutWriteup'
import layout from '../layouts/customer'

const Home: NextPage = (): ReactElement => {
  const homePageComponents = [
    <HomeSlogan />,
    <ProductCards featured={true} />,
    <ReviewCards featured={true} />,
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

export default layout(Home, {})
