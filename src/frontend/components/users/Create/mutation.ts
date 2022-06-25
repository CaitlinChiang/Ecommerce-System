import { gql } from '@apollo/client'

export default gql`
  mutation (
    $active: Boolean
    $address: DeliveryAddressInput
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $phoneNumber: String!
    $type: String!
  ) {
    create_user(
      active: $active
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
