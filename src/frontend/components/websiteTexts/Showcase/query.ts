import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $type: String!) {
    get_website_text(_id: $_id, type: $type) {
      _id
    }
  }
`
