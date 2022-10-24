import { gql } from '@apollo/client'

export const GetOrders = gql`
  query (
    $cityId: ID
    $dateRange: DateRangeInput
    $paginateData: PaginateDataInput
    $statuses: [String]
  ) {
    get_orders(
      cityId: $cityId
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
      itemsQuantity
      payment {
        amountDue
        imageProofUrl
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
    }

    get_orders_count(
      cityId: $cityId
      dateRange: $dateRange
      paginateData: $paginateData
      statuses: $statuses
    )
  }
`
