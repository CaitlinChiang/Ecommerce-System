import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import ContactInformation from '../../components/websiteTexts/View/contactInformation'

const Page = (): ReactElement => {
  return (
    <>
      <ContactInformation />
    </>
  )
}

export default layout(Page, { title: 'Contact Us' })
