import { gql } from '@apollo/client'

export const GetCity = gql`
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

export const GetCities = gql`
  query ($paginateData: PaginateDataInput) {
    get_cities(paginateData: $paginateData) {
      _id
      name
      shippingFee
    }

    get_cities_count(paginateData: $paginateData)
  }
`
