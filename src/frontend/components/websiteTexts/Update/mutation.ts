import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $content: String!, $type: String!) {
    update_website_text(_id: $_id, content: $content, type: $type) {
      _id
    }
  }
`
