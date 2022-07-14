import { ReactElement } from 'react'
import layout from '../../layouts'
import FAQsDropdowns from '../../components/faqs/Showcase/customers/dropdowns'
import { Typography } from '@mui/material'

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
