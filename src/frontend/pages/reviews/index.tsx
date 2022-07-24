import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import ReviewsCards from '../../components/reviews/View/cards'

const Page = (): ReactElement => {
  return (
    <>
      <ReviewsCards featured={false} />
    </>
  )
}

export default layout(Page, { title: 'Reviews' })
