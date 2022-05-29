import { gql } from '@apollo/client'

export default gql`
  query(
    $_id: ID!
  ) {
    get_website_text(
      _id: $_id
    ) {
      _id
    }
  }
`
