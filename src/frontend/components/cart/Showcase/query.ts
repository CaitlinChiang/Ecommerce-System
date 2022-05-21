import { gql } from '@apollo/client'

export default gql`
  query {
    get_cart {
      _id
    }
  }
`
