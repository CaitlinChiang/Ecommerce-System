import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!) {
    delete_city(_id: $_id)
  }
`
