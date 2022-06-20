export const fetchMoreArgs: any = {
  ssr: true,
  skip: !process.browser,
  partialRefetch: true,
  returnPartialData: true,
  fetchPolicy: 'cache-and-network',
  notifyOnNetworkStatusChange: true
}
