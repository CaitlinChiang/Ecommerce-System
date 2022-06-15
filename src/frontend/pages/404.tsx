import { NextPage } from 'next'
import React, { ReactElement } from 'react'
import Navbar from '../layouts/consumer/Navbar'
import Header from '../layouts/consumer/Header'

const NotFoundPage: NextPage = (): ReactElement => {
  return (
    <>
      <Navbar />
      <Header pageTitle='Page Not Found' backRoute='/' />
    </>
  )
}

export default NotFoundPage
