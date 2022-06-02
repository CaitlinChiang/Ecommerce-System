import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $imageUrl: String) {
    delete_product_variant(_id: $_id, imageUrl: $imageUrl) {
      _id
    }
  }
`
