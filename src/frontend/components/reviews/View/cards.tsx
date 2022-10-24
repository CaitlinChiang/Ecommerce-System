import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetReviews } from './query'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Review, GetReviewArgs } from '../../../../types/review'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { SortDirection } from '../../../_enums/sortDirection'
import CardsPaginationComponent from '../../_common/CardsPaginationComponent'
import CreateReview from '../Create'

const ReviewCards = ({ featured }: { featured: boolean }): ReactElement => {
  const args: GetReviewArgs = { featured: featured ? true : null }
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })

  const { data, loading, refetch } = useQuery(GetReviews, {
    variables: {
      ...args,
      paginateData: {
        ...paginateDataArgs,
        page: featured ? null : paginateDataArgs?.page,
        rowsPerPage: featured ? null : paginateDataArgs?.rowsPerPage,
        searchText: featured ? null : paginateDataArgs?.searchText
      }
    }
  })
  const reviews: Review[] = data?.get_reviews || []
  const reviewsCount: number = data?.get_reviews_count || 0

  const refetchArgs: RefetchDataArgs = {
    args,
    count: reviewsCount,
    loading,
    paginateDataArgs,
    refetch
  }

  const reviewCards = [
    reviews?.map((review: Review): ReactElement => {
      const { content, username } = review

      return (
        <Grid item xs={6} md={6} lg={6}>
          <Card>
            <CardContent>
              <Typography variant={'h5'}>{`"${content}"`}</Typography>
              <Typography
                color={'#707070'}
                sx={{ marginTop: 3 }}
                variant={'h5'}
              >{`- ${username}`}</Typography>
            </CardContent>
          </Card>
        </Grid>
      )
    })
  ]

  if (featured) {
    return (
      <Grid container spacing={2}>
        {reviewCards}
      </Grid>
    )
  }

  return (
    <>
      <CreateReview refetchArgs={refetchArgs} />
      <Card>
        <CardContent>
          <Typography variant={'h2'}>
            {'Read feedback from our customers!'}
          </Typography>
          <CardsPaginationComponent
            count={reviewsCount}
            loading={loading}
            paginateDataArgs={paginateDataArgs}
            setPaginateDataArgs={setPaginateDataArgs}
          />
          <Grid container spacing={2}>
            {reviewCards}
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ReviewCards
