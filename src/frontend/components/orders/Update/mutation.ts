import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $collectionMethod: String!, $status: String!) {
    update_order(_id: $_id, collectionMethod: $collectionMethod, status: $status) {
      _id
    }
  }
`
