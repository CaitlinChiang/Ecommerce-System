import { ReactElement } from 'react'
import { Divider } from '@mui/material'
import layout from '../../layouts/customer'
import HomeSlogan from '../../components/websiteTexts/Showcase/homeSlogan'
import ProductsCards from '../../components/products/Showcase/cards'
import ReviewsCards from '../../components/reviews/Showcase/cards'
import ContactInformation from '../../components/websiteTexts/Showcase/contactInformation'

const Page = (): ReactElement => {
  const homePageComponents = [
    <HomeSlogan />,
    <ProductsCards featured={true} />,
    <ReviewsCards featured={true} />,
    <ContactInformation />
  ]

  return (
    <>
      {homePageComponents.map((component: ReactElement): ReactElement => {
        return (
          <>
            {component}
            <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
          </>
        )
      })}
    </>
  )
}

export default layout(Page, {})
