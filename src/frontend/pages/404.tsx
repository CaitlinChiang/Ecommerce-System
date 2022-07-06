import { NextPage } from 'next'
import React, { ReactElement } from 'react'
import Header from '../layouts/customer/Header'

const NotFoundPage: NextPage = (): ReactElement => {
  return (
    <>
      <Header pageTitle='Page Not Found' backRoute='/' />
    </>
  )
}

export default NotFoundPage
