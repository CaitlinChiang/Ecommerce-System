import { gql } from '@apollo/client'

export default gql`
  mutation (
    $active: Boolean
    $address: DeliveryAddressInput
    $email: String
    $password: String
    $phoneNumber: String
  ) {
    update_user(
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
