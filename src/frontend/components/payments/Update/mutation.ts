import { gql } from '@apollo/client'

export default gql`
  mutation ($_orderId: ID!, $imageProof: Upload, $status: String) {
    update_payment(_orderId: $_orderId, imageProof: $imageProof, status: $status) {
      _id
    }
  }
`
