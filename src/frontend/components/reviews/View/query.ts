import { gql } from '@apollo/client'

export const GetReviews = gql`
  query ($featured: Boolean, $paginateData: PaginateDataInput) {
    get_reviews(featured: $featured, paginateData: $paginateData) {
      _id
      content
      featured
      username
      createdAt
      updatedAt
      updatedByEmail
    }

    get_reviews_count(featured: $featured, paginateData: $paginateData)
  }
`
