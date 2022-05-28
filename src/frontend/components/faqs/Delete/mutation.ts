import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
  ) {
    delete_faq(
      _id: $_id
    ) {
      _id
    }
  }
`
