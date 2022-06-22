import { gql } from '@apollo/client'

export default gql`
  query ($type: String!) {
    get_website_text(type: $type) {
      _id
      content
    }
  }
`
