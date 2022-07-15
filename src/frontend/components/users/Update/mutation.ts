import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_id: ID
    $active: Boolean
    $deliveryAddress: DeliveryAddressInput
    $email: String
    $firstName: String
    $lastName: String
    $phoneNumber: String
  ) {
    update_user(
      _id: $_id
      active: $active
      deliveryAddress: $deliveryAddress
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
    ) {
      _id
    }
  }
`
