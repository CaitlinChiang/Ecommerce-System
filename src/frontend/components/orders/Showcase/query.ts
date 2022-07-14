import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_order(_id: $_id) {
      _id
    }
  }
`

export const queryMultiple = gql`
  query (
    $collectionMethod: String
    $dateRange: DateRangeInput
    $paginateData: PaginateDataInput
    $status: String
  ) {
    get_orders(
      collectionMethod: $collectionMethod
      dateRange: $dateRange
      paginateData: $paginateData
      status: $status
    ) {
      _id
      collectionMethod
      deliveryAddress {
        address
        city {
          name
        }
      }
      items {
        product {
          name
        }
        productVariant {
          name
        }
        quantity
        totalPrice
      }
      payment {
        amountDue
        paymentMethod {
          name
        }
        shippingFee
        status
      }
      status
      user {
        email
        firstName
        lastName
        phoneNumber
      }
      createdAt
      updatedAt
    }

    get_orders_count(
      collectionMethod: $collectionMethod
      dateRange: $dateRange
      paginateData: $paginateData
      status: $status
    )
  }
`
