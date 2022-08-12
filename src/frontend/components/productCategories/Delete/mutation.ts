import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!) {
    delete_product_category(_id: $_id)
  }
`
