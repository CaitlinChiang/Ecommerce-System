import { gql } from '@apollo/client'

export default gql`
  mutation (
    $address: DeliveryAddress
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $phoneNumber: String!
    $type: String!
  ) {
    create_user(
      address: $address
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      phoneNumber: $phoneNumber
      type: $type
    ) {
      _id
    }
  }
`
