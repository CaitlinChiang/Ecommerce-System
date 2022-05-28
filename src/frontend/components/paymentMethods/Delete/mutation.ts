import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
  ) {
    delete_payment_method(
      _id: $_id
    ) {
      _id
    }
  }
`
