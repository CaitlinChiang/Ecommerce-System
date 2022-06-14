import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $paginateData: PaginateDataInput) {
    get_city(_id: $_id) {
      _id
    }

    get_cities(paginateData: $paginateData) {
      _id
    }

    get_cities_count(paginateData: $paginateData)
  }
`
