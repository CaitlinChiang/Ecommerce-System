import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
  ) {
    delete_product(
      _id: $_id
    ) {
      _id
    }
  }
`
