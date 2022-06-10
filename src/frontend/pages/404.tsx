import { NextPage } from 'next'
import React, { ReactElement } from 'react'
import Navbar from '../layouts/Navbar'
import Header from '../layouts/Header'

const NotFoundPage: NextPage = (): ReactElement => {
  return (
    <>
      <Navbar />
      <Header pageTitle='Page Not Found' backRoute='/' />
    </>
  )
}

export default NotFoundPage
