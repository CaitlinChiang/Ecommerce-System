import { gql } from '@apollo/client'

export default gql`
  query(
    action: String
    orderId: ID
    paymentId: ID
    productId: ID
    productVariantId: ID
  ) {
    get_audit_logs(
      action: $action
      orderId: $orderId
      paymentId: $paymentId
      productId: $productId
      productVariantId: $productVariantId
    ) {
      _id
    }

    get_audit_logs_count(
      action: $action
      orderId: $orderId
      paymentId: $paymentId
      productId: $productId
      productVariantId: $productVariantId
    )
  }
`
