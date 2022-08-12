import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $featured: Boolean!) {
    update_review(_id: $_id, featured: $featured) {
      _id
      content
      featured
      username
      createdAt
    }
  }
`
