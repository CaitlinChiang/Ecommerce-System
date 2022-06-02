import { gql } from '@apollo/client'

export default gql`
  mutation ($content: String!, $username: String!) {
    create_review(content: $content, username: $username) {
      _id
    }
  }
`
