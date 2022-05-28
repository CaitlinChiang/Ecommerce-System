import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
    $name: String!
    $details: String
  ) {
    update_payment_method(
      _id: $_id
      name: $name
      details: $details
    ) {
      _id
    }
  }
`
