import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $name: String!, $shippingFee: Float!) {
    update_city(_id: $_id, name: $name, shippingFee: $shippingFee) {
      _id
    }
  }
`
