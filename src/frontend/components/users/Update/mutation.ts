import { gql } from '@apollo/client'

export default gql`
  mutation (
    $address: DeliveryAddressInput
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
