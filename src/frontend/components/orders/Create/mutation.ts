import { gql } from '@apollo/client'

export default gql`
  mutation (
    $collectionMethod: String
    $deliveryAddress: DeliveryAddressInput
    $items: [CartItem]!
    $payment: PaymentInput!
  ) {
    create_order(
      collectionMethod: $collectionMethod
      deliveryAddress: $deliveryAddress
      items: $items
      payment: $payment
    ) {
      _id
    }
  }
`
