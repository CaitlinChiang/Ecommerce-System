import { gql } from '@apollo/client'

export default gql`
  mutation ($_id: ID!, $type: String!) {
    delete_user(_id: $_id, type: $type)
  }
`
