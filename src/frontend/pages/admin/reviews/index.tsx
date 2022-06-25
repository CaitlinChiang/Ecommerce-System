import { ReactElement } from 'react'
import layout from '../../../layouts'
import ReviewsTable from '../../../components/reviews/Showcase/table'

const Page = (): ReactElement => {
  return (
    <>
      <ReviewsTable />
    </>
  )
}

export default layout(Page, { title: 'Reviews' })
