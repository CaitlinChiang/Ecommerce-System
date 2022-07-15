import { NextPage } from 'next'
import { ReactElement } from 'react'
import { gql, useQuery } from '@apollo/client'
import Header from '../layouts/admin/Header'
import layout from '../layouts/admin'

const query = gql`
  query {
    get_user {
      firstName
    }
  }
`

const Home: NextPage = (): ReactElement => {
  const { data } = useQuery(query)
  const user = data?.get_user || {}

  return (
    <>
      <Header pageTitle={`Welcome Back, ${user?.firstName}!`} />
    </>
  )
}

export default layout(Home, { title: 'Home' })
