import { NextPage } from 'next'
import React, { ReactElement } from 'react'
import Navbar from '../layouts/consumer/Navbar'
import Header from '../layouts/consumer/Header'

const Home: NextPage = (): ReactElement => {
  return (
    <>
      <Navbar />
      <Header pageTitle={'Test Page Header'} />
    </>
  )
}

export default Home
