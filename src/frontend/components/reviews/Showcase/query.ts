import { gql } from '@apollo/client'

export default gql`
  query ($featured: Boolean, $paginateData: PaginateDataInput) {
    get_reviews(featured: $featured) {
      _id
    }

    get_reviews_count(featured: $featured, paginateData: $paginateData)
  }
`
