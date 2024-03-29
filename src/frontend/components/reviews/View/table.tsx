import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetReviews } from './query'
import deleteMutation from '../Delete/mutation'
import { TableCell, TableRow } from '@mui/material'
import { Review, GetReviewArgs } from '../../../../types/review'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import UpdateReviewCheckbox from '../Update/checkbox'
import DeleteButton from '../../_common/DeleteButton'
import ReviewsTableFilters from './tableFilters'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const ReviewsTable = (): ReactElement => {
  const disableUpdateReview = !authenticateUser(AdminPermission.UPDATE_REVIEW)
  const disableDeleteReview = !authenticateUser(AdminPermission.DELETE_REVIEW)

  const [args, setArgs] = useState<GetReviewArgs>({ featured: null })
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.DESC
  })

  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  const { data, loading, refetch } = useQuery(GetReviews, {
    variables: { ...args, paginateData: paginateDataArgs }
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

  const reviewHeaders = [
    { label: 'featured', sortable: true },
    { label: 'createdAt', sortable: true },
    { label: 'updatedAt', sortable: true },
    { label: 'username', sortable: false },
    { label: 'content', sortable: false },
    { label: 'actions', sortable: false }
  ]

  const reviewRows = [
    reviews?.map((review: Review): ReactElement => {
      const {
        _id,
        content,
        createdAt,
        updatedAt,
        updatedByEmail,
        featured,
        username
      } = review

      return (
        <TableRow>
          <TableCell>
            <UpdateReviewCheckbox
              _id={_id}
              disabled={disableUpdateReview}
              featured={featured}
              refetchArgs={refetchArgs}
            />
          </TableCell>
          <TableCell>{String(createdAt)}</TableCell>
          <TableCell>
            {String(updatedAt)}
            <br />
            {`${updatedByEmail && 'by ' + updatedByEmail}`}
          </TableCell>
          <TableCell>{username}</TableCell>
          <TableCell>{content}</TableCell>
          <TableCell>
            <DeleteButton
              _id={_id}
              disabled={disableDeleteReview}
              label={'Review'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
              setPaginateDataArgs={setPaginateDataArgs}
            />
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <TableComponent
      count={reviewsCount}
      filterContent={<ReviewsTableFilters args={args} setArgs={setArgs} />}
      filterOpen={filterOpen}
      headers={reviewHeaders}
      loading={loading}
      paginateDataArgs={paginateDataArgs}
      rows={reviewRows}
      setFilterOpen={setFilterOpen}
      setPaginateDataArgs={setPaginateDataArgs}
    />
  )
}

export default ReviewsTable
