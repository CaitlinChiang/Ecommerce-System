import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_id: ID!
    $active: Boolean
    $address: DeliveryAddressInput
    $email: String
    $password: String
    $phoneNumber: String
  ) {
    update_user(
      _id: $_id
      active: $active
      address: $address
      email: $email
      password: $password
      phoneNumber: $phoneNumber
    ) {
      _id
    }
  }
`
