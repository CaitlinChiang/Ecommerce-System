import { ReactElement } from 'react'
import layout from '../../../layouts/admin'
import FAQsDropdowns from '../../../components/faqs/View/administrators/dropdowns'

const Page = (): ReactElement => {
  return (
    <>
      <FAQsDropdowns />
    </>
  )
}

export default layout(Page, { title: 'Frequently Asked Questions' })
