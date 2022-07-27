import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetReviews } from './query'
import { Typography } from '@mui/material'
import { Review } from '../../../../types/review'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { SortDirection } from '../../../_enums/sortDirection'
import CardComponent from '../../_common/CardComponent'
import CardsPaginationComponent from '../../_common/CardsPaginationComponent'
import CreateReview from '../Create'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'

const ReviewCards = ({ featured }: { featured: boolean }): ReactElement => {
  const args: any = { featured: featured ? true : null }
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    count: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetReviews, {
    variables: {
      ...args,
      paginateData: {
        ...paginateDataArgs,
        page: featured ? null : paginateDataArgs?.page,
        rowsPerPage: featured ? null : paginateDataArgs?.rowsPerPage,
        searchText: featured ? null : paginateDataArgs?.searchText
      }
    },
    ...fetchMoreArgs
  })

  const reviews: Review[] = data?.get_reviews || []
  const reviewsCount: number = data?.get_reviews_count || 0

  useEffect(() => {
    setRefetchArgs({
      args,
      count: reviewsCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, data, paginateDataArgs])

  const reviewCards = [
    reviews?.map((review: Review): ReactElement => {
      return (
        <CardComponent
          content={
            <>
              <Typography>{`"${review?.content}"`}</Typography>
              <br />
              <Typography>{`- ${review?.username}`}</Typography>
            </>
          }
        />
      )
    })
  ]

  return (
    <>
      {featured && <Typography>{'Customer Reviews'}</Typography>}
      {!featured && (
        <>
          <CreateReview refetchArgs={refetchArgs} />
          <CardsPaginationComponent
            args={args}
            count={reviewsCount}
            fetchMore={fetchMore}
            loading={loading}
            paginateDataArgs={paginateDataArgs}
            setPaginateDataArgs={setPaginateDataArgs}
          />
        </>
      )}
      {reviewCards}
    </>
  )
}

export default ReviewCards
