import { ReactElement } from 'react'
import { Box, IconButton, TablePagination } from '@mui/material'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { generateRowsPerPage } from '../../_utils/handleData/generateRowsPerPage'

const PaginationComponent = ({
  count,
  paginateDataArgs,
  rowsPerPageOptions,
  setPaginateDataArgs
}: {
  count: number
  paginateDataArgs: PaginateDataArgs
  rowsPerPageOptions?: number[]
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  const { page, rowsPerPage } = paginateDataArgs

  const TablePaginationActions = (props: any): ReactElement => {
    const { count, onPageChange, page, rowsPerPage } = props

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton disabled={page === 0} onClick={(e: any) => onPageChange(e, 0)}>
          <FirstPageIcon />
        </IconButton>
        <IconButton
          disabled={page === 0}
          onClick={(e: any) => onPageChange(e, page - 1)}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={(e: any) => onPageChange(e, page + 1)}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={(e: any) =>
            onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
          }
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    )
  }

  return (
    <TablePagination
      component={'span'}
      count={count}
      labelRowsPerPage={'Items per page:'}
      onRowsPerPageChange={async (e): Promise<void> => {
        const newRows = Number(e.target.value)
        setPaginateDataArgs({
          ...paginateDataArgs,
          page: 0,
          rowsPerPage: newRows
        })
      }}
      onPageChange={async (_e, newPage: number): Promise<void> => {
        window.scrollTo(0, 0)
        setPaginateDataArgs({
          ...paginateDataArgs,
          page: newPage
        })
      }}
      page={page}
      rowsPerPage={rowsPerPage || count}
      rowsPerPageOptions={rowsPerPageOptions || generateRowsPerPage(count)}
      ActionsComponent={TablePaginationActions}
      SelectProps={{ native: true }}
    />
  )
}

export default PaginationComponent
