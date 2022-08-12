import { gql } from '@apollo/client'

export default gql`
  mutation (
    $deliveryAddress: DeliveryAddressInput!
    $items: [CartItemInput]!
    $payment: PaymentInput!
  ) {
    create_order(deliveryAddress: $deliveryAddress, items: $items, payment: $payment)
  }
`
