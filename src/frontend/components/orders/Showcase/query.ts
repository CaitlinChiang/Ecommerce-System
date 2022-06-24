import { gql } from '@apollo/client'

export const querySingular = gql`
  query ($_id: ID!) {
    get_order(_id: $_id) {
      _id
    }
  }
`

export const queryMultiple = gql`
  query ($dateRange: DateRangeInput, $paginateData: PaginateDataInput) {
    get_orders(dateRange: $dateRange, paginateData: $paginateData) {
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

    get_orders_count(dateRange: $dateRange, paginateData: $paginateData)
  }
`
