import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_faq(_id: $_id) {
      _id
      answer
      question
      createdAt
      updatedAt
    }
  }
`

export const queryMultiple = gql`
  query ($paginateData: PaginateDataInput) {
    get_faqs(paginateData: $paginateData) {
      _id
      answer
      question
    }

    get_faqs_count(paginateData: $paginateData)
  }
`
