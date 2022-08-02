import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $name: String!, $showPublic: Boolean!) {
    update_product_category(_id: $_id, name: $name, showPublic: $showPublic) {
      _id
    }
  }
`
