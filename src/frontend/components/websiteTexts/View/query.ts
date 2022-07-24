import { gql } from '@apollo/client'

export const GetWebsiteText = gql`
  query ($type: String!) {
    get_website_text(type: $type) {
      _id
      content
      updatedAt
    }
  }
`
