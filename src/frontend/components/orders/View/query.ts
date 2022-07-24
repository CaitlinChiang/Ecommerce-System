import { gql } from '@apollo/client'

export const GetOrders = gql`
  query (
    $collectionMethod: String
    $dateRange: DateRangeInput
    $paginateData: PaginateDataInput
    $statuses: [String]
  ) {
    get_orders(
      collectionMethod: $collectionMethod
      dateRange: $dateRange
      paginateData: $paginateData
      statuses: $statuses
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
      statuses: $statuses
    )
  }
`
