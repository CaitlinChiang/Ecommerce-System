import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!) {
    delete_review(_id: $_id)
  }
`
