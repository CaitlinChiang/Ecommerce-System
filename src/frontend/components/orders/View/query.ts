import { gql } from '@apollo/client'

export const GetOrders = gql`
  query (
    $dateRange: DateRangeInput
    $paginateData: PaginateDataInput
    $statuses: [String]
  ) {
    get_orders(
      dateRange: $dateRange
      paginateData: $paginateData
      statuses: $statuses
    ) {
      _id
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
      dateRange: $dateRange
      paginateData: $paginateData
      statuses: $statuses
    )
  }
`
