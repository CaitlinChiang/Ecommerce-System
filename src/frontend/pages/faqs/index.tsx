import { ReactElement } from 'react'
import layout from '../../layouts/customer'
import { Typography } from '@mui/material'
import FAQsDropdowns from '../../components/faqs/View/customers/dropdowns'

const Page = (): ReactElement => {
  return (
    <>
      <Typography variant={'h6'} sx={{ marginBottom: 5 }}>
        {"Have questions? We're here to answer them!"}
      </Typography>
      <FAQsDropdowns />
    </>
  )
}

export default layout(Page, { title: 'Frequently Asked Questions' })
