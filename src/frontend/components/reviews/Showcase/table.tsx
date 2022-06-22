import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import deleteMutation from '../Delete/mutation'
import { TableCell, TableRow } from '@mui/material'
import { Review } from '../../../../types/review'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import UpdateReviewCheckbox from '../Update/updateCheckbox'
import DeleteButton from '../../_common/DeleteButton'
import ReviewsTableFilters from './tableFilters'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const ReviewsTable = (): ReactElement => {
  const [args, setArgs] = useState<any>({
    featured: null
  })
  const [page, setPage] = useState<number>(0)
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, fetchMore, refetch } = useQuery(query, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const reviews = data?.get_reviews || []
  const reviewsCount: number = data?.get_reviews_count || 0

  const reviewHeaders = [
    { label: 'createdAt', sortable: true },
    { label: 'username', sortable: false },
    { label: 'content', sortable: false },
    { label: 'featured', sortable: true },
    { label: 'actions', sortable: false }
  ]

  const reviewRows = [
    reviews?.map((review: Review): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{String(review?.createdAt)}</TableCell>
          <TableCell align={'center'}>{review?.username}</TableCell>
          <TableCell align={'center'}>{review?.content}</TableCell>
          <TableCell align={'center'}>
            <UpdateReviewCheckbox _id={review._id} featured={review.featured} />
          </TableCell>
          <TableCell align={'center'}>
            <DeleteButton
              _id={review._id}
              label={'Review'}
              mutation={deleteMutation}
              refetch={refetch}
            />
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      args={args}
      count={reviewsCount}
      fetchMore={fetchMore}
      filterContent={<ReviewsTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={reviewHeaders}
      loading={loading}
      page={page}
      paginateDataArgs={paginateDataArgs}
      rows={reviewRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      setFilterOpen={setFilterOpen}
      setPage={setPage}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default ReviewsTable
