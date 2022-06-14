import { gql } from '@apollo/client'

export default gql`
  query ($_id: ID, $paginateData: PaginateDataInput) {
    get_faq(_id: $_id) {
      _id
    }

    get_faqs(paginateData: $paginateData) {
      _id
    }

    get_faqs_count(paginateData: $paginateData)
  }
`
