import { gql } from '@apollo/client'

export default gql`
  mutation(
    $collectionMethod: String
    $deliveryAddress: DeliveryAddress
    $payment: Payment
    $productIds: [String]
    $productVariantIds: [String]
    $userId: ID
  ) {
    create_order(
      collectionMethod: $collectionMethod
      deliveryAddress: $deliveryAddress
      payment: $payment
      productIds: $productIds
      productVariantIds: $productVariantIds
      userId: $userId
    ) {
      _id
    }
  }
`
