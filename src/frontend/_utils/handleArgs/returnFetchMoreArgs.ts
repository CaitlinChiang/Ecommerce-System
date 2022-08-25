export const fetchMoreArgs: any = {
  ssr: true,
  skip: typeof window === 'undefined',
  partialRefetch: true,
  returnPartialData: true,
  fetchPolicy: 'cache-and-network',
  notifyOnNetworkStatusChange: true
}
