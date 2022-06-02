import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID!) {
    get_city(_id: $_id) {
      _id
    }

    get_cities {
      _id
    }

    get_cities_count
  }
`
