import { gql } from '@apollo/client'

export default gql`
  mutation ($content: String!, $featured: Boolean!, $username: String!) {
    create_review(content: $content, featured: $featured, username: $username)
  }
`
