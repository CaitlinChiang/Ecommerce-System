import { gql } from '@apollo/client'

export const GetUser = gql`
  query {
    get_user {
      _id
      active
      email
      firstName
      lastName
      type
    }
  }
`

export const GetCart = gql`
  query {
    get_cart {
      quantity
    }
  }
`
