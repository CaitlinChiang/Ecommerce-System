import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_city(_id: $_id) {
      _id
      name
      shippingFee
      createdAt
      updatedAt
    }
  }
`

export const queryMultiple = gql`
  query ($paginateData: PaginateDataInput) {
    get_cities(paginateData: $paginateData) {
      _id
      name
      shippingFee
    }

    get_cities_count(paginateData: $paginateData)
  }
`
