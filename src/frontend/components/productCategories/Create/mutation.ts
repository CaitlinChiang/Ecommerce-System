import { gql } from '@apollo/client'

export default gql`
  mutation ($name: String!, $showPublic: Boolean!) {
    create_product_category(name: $name, showPublic: $showPublic)
  }
`
