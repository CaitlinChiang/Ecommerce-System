import { gql } from '@apollo/client'

export default gql`
  mutation ($content: String!, $type: String!) {
    update_website_text(content: $content, type: $type) {
      _id
      content
      updatedAt
    }
  }
`
