import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!) {
    delete_order(_id: $_id) {
      _id
    }
  }
`
