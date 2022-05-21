import { gql } from '@apollo/client'

export default gql`
  mutation(
    $address: String
    $email: String!
    $password: String!
    $phoneNumber: String!
  ) {
    update_user(
      address: $address
      email: $email
      password: $password
      phoneNumber: $phoneNumber
    ) {
      _id
    }
  }
`
