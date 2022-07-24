import { gql } from '@apollo/client'

export const GetReviews = gql`
  query ($featured: Boolean, $paginateData: PaginateDataInput) {
    get_reviews(featured: $featured, paginateData: $paginateData) {
      _id
      createdAt
      username
      content
      featured
    }

    get_reviews_count(featured: $featured, paginateData: $paginateData)
  }
`
