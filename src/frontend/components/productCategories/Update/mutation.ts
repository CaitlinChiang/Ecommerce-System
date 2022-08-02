import { gql } from '@apollo/client'

export const UpdateMutation = gql`
  mutation ($_id: ID!, $name: String!, $showPublic: Boolean!) {
    update_product_category(_id: $_id, name: $name, showPublic: $showPublic) {
      _id
    }
  }
`

export const UpdateCheckboxMutation = gql`
  mutation ($_id: ID!, $showPublic: Boolean!) {
    update_product_category_checkbox(_id: $_id, showPublic: $showPublic) {
      _id
    }
  }
`
