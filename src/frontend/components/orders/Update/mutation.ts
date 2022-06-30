import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $status: String!) {
    update_order(_id: $_id, status: $status) {
      _id
    }
  }
`
