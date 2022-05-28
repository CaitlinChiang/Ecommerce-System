import { gql } from '@apollo/client'

export default gql`
  query(
    $_id: ID!
  ) {
    get_faq(
      _id: $_id
    ) {
      _id
    }

    get_faqs {
      _id
    }

    get_faqs_count
  }
`
