import { NextPage } from 'next'
import { ReactElement } from 'react'
import Header from '../layouts/customer/Header'
import layout from '../layouts/customer'

const NotFoundPage: NextPage = (): ReactElement => {
  return (
    <>
      <Header pageTitle={'Page does not exist.'} backRoute={true} />
    </>
  )
}

export default layout(NotFoundPage, {})
