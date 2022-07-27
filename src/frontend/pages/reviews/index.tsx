import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import ReviewCards from '../../components/reviews/View/cards'

const Page = (): ReactElement => {
  return (
    <>
      <ReviewCards featured={false} />
    </>
  )
}

export default layout(Page, { title: 'Reviews' })
