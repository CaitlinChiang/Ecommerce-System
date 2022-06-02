import { gql } from '@apollo/client'

export default gql`
  mutation ($name: String!, $shippingFee: Float!) {
    create_city(name: $name, shippingFee: $shippingFee) {
      _id
    }
  }
`
