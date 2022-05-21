import { gql } from '@apollo/client'

export default gql`
  mutation(
    $email: String!
    $password: String!
  ) {
    user_sign_in(
      email: $id
      password: $password
    ) {
      _id
    }
  }
`
