import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import FAQsDropdowns from '../../components/faqs/View/customers/dropdowns'

const Page = (): ReactElement => {
  return (
    <>
      <FAQsDropdowns />
    </>
  )
}

export default layout(Page, { title: 'Frequently Asked Questions' })
