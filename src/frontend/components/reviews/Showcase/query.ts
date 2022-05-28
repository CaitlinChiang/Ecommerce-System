import { gql } from '@apollo/client'

export default gql`
  query {
    get_reviews {
      _id
    }

    get_reviews_count
  }
`
