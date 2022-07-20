import { ReactElement, useState, useEffect } from 'react'
import { tableRow, tableCell, box } from '../../styles/_common/dropdownsComponent'
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@mui/material'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import { searchData } from '../../_utils/handleData/searchData'
import { generateRowsPerPage } from '../../_utils/handleData/generateRowsPerPage'

const Row = ({
  icons,
  row
}: {
  icons: { closed: ReactElement; opened: ReactElement }
  row: { actions?: ReactElement; title: string; content: ReactElement }
}): ReactElement => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow sx={tableRow}>
        <TableCell component='th' scope='row'>
          {row.title}
        </TableCell>
        {row?.actions && <TableCell align={'right'}>{row.actions}</TableCell>}
        <TableCell align={'right'}>
          <IconButton
            aria-label='expand row'
            onClick={(): void => setOpen(!open)}
            size='small'
          >
            {open ? icons.opened : icons.closed}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={tableCell}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={box}>{row.content}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const DropdownsComponent = ({
  args,
  count,
  fetchMore,
  icons,
  loading,
  paginateDataArgs,
  rows,
  setPaginateDataArgs
}: {
  args?: any
  count?: number
  fetchMore?: any
  icons: { closed: ReactElement; opened: ReactElement }
  loading?: boolean
  paginateDataArgs?: PaginateDataArgs
  rows: { actions?: ReactElement; title: string; content: ReactElement }[]
  setPaginateDataArgs?: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  useEffect(() => {
    if (paginateDataArgs) {
      searchData(args, fetchMore, loading, paginateDataArgs)
    }
  }, [paginateDataArgs])

  return (
    <TableContainer component={Paper}>
      {count && (
        <TablePagination
          component={'span'}
          count={count}
          onRowsPerPageChange={async (e): Promise<void> => {
            const newRowsPerPage = Number(e.target.value)
            setPaginateDataArgs({
              ...paginateDataArgs,
              page: 0,
              rowsPerPage: newRowsPerPage
            })
          }}
          onPageChange={async (_e, newPage: number): Promise<void> => {
            window.scrollTo(0, 0)
            setPaginateDataArgs({
              ...paginateDataArgs,
              page: newPage
            })
          }}
          page={paginateDataArgs?.page}
          rowsPerPage={paginateDataArgs?.rowsPerPage}
          rowsPerPageOptions={generateRowsPerPage(count)}
        />
      )}
      <Table aria-label='collapsible table'>
        <TableBody>
          {rows.map(
            (row: { title: string; content: ReactElement }): ReactElement => {
              return (
                <>
                  <Row icons={icons} row={row} />
                </>
              )
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DropdownsComponent
