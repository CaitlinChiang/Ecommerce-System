import { NextPage } from 'next'
import React, { ReactElement } from 'react'
import Header from '../layouts/admin/Header'
import layout from '../layouts'

const Home: NextPage = (): ReactElement => {
  return (
    <>
      <Header pageTitle={'Welcome Back, Caitlin!'} />
    </>
  )
}

export default layout(Home, { title: 'Home', backRoute: '/' })
