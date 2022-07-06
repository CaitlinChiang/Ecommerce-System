import { gql } from '@apollo/client'

export default gql`
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
