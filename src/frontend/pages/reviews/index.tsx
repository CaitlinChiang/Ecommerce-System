import { ReactElement } from 'react'
import layout from '../../layouts'
import ReviewsCards from '../../components/reviews/Showcase/cards'

const Page = (): ReactElement => {
  return (
    <>
      <ReviewsCards featured={false} />
    </>
  )
}

export default layout(Page, { title: 'Reviews' })
