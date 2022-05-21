import { gql } from '@apollo/client'

export default gql`
  mutation(
    $_id: ID!
  ) {
    delete_user(
      _id: $_id
    ) {
      _id
    }
  }
`
