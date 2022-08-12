import { gql } from '@apollo/client'

export default gql`
  mutation (
    $_orderId: ID!
    $imageProof: Upload
    $imageProofUrl: String
    $status: String!
  ) {
    update_payment(
      _orderId: $_orderId
      imageProof: $imageProof
      imageProofUrl: $imageProofUrl
      status: $status
    ) {
      _id
      _orderId
      amountDue
      imageProofUrl
      paymentMethod
      paymentMethodId
      shippingFee
      status
      createdAt
    }
  }
`
