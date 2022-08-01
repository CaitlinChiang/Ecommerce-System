import { gql } from '@apollo/client'

export default gql`
  mutation (
    $deliveryAddress: DeliveryAddressInput!
    $items: [CartItem]!
    $payment: PaymentInput!
  ) {
    create_order(
      deliveryAddress: $deliveryAddress
      items: $items
      payment: $payment
    ) {
      _id
    }
  }
`
