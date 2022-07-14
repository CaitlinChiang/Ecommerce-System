import { ReactElement } from 'react'
import layout from '../../../layouts'
import FAQsDropdowns from '../../../components/faqs/Showcase/administrators/dropdowns'

const Page = (): ReactElement => {
  return (
    <>
      <FAQsDropdowns />
    </>
  )
}

export default layout(Page, { title: 'Frequently Asked Questions' })
