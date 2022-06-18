import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import query from './query'
import { TableCell, TableRow } from '@mui/material'
import { Review } from '../../../../types/review'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import { tableArgs } from '../../../_utils/returnTableArgs'

const ReviewsTable = (): ReactElement => {
  const [page, setPage] = useState<number>(0)
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    offset: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })
  const [specificArgs, setSpecificArgs] = useState<any>({
    featured: false
  })

  const { data, loading, fetchMore } = useQuery(query, {
    variables: { paginateData: paginateDataArgs, ...specificArgs },
    ...tableArgs
  })

  const reviews = data?.get_reviews || []
  const reviewsCount: number = data?.get_reviews_count || 0

  const reviewHeaders = [
    { header: 'createdAt', sortable: true },
    { header: 'username', sortable: false },
    { header: 'content', sortable: false },
    { header: 'featured', sortable: true },
    { header: 'actions', sortable: false }
  ]

  const reviewRows = [
    reviews?.map((review: Review): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{String(review?.createdAt)}</TableCell>
          <TableCell align={'center'}>{review?.username}</TableCell>
          <TableCell align={'center'}>{review?.content}</TableCell>
          <TableCell align={'center'}></TableCell>
          <TableCell align={'center'}></TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      count={reviewsCount}
      fetchMore={fetchMore}
      headers={['createdAt', 'username', 'content', 'featured', 'actions']}
      loading={loading}
      page={page}
      paginateDataArgs={paginateDataArgs}
      rows={reviewRows}
      rowsPerPageOptions={[10, 25, 50, 75, 100]}
      setPage={setPage}
      setPaginateDataArgs={setPaginateDataArgs}
      specificArgs={specificArgs}
    />
  )
}

export default ReviewsTable
