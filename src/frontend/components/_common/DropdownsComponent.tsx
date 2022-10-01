import { ReactElement, useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import PaginationComponent from './PaginationComponent'
import { searchData } from '../../_utils/handleData/searchData'

const Row = ({
  icons,
  row
}: {
  icons: { closed: ReactElement; opened: ReactElement }
  row: { actions?: ReactElement; title: string; content: ReactElement }
}): ReactElement => {
  if (!row) return
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow>
        <TableCell scope='row' sx={{ borderBottom: 0 }}>
          {row.title}
        </TableCell>
        {row?.actions && (
          <TableCell align={'right'} sx={{ borderBottom: 0 }}>
            {row.actions}
          </TableCell>
        )}
        <TableCell align={'right'} sx={{ borderBottom: 0 }}>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? icons.opened : icons.closed}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box marginTop={3} marginBottom={3}>
              {row.content}
            </Box>
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
    <Card>
      <CardContent>
        {loading && <CircularProgress />}
        <TableContainer component={Paper}>
          {count && (
            <PaginationComponent
              count={count}
              paginateDataArgs={paginateDataArgs}
              setPaginateDataArgs={setPaginateDataArgs}
            />
          )}
          <Table sx={{ whiteSpace: { xs: 'nowrap', sm: 'unset' } }}>
            <TableBody>
              {rows.map(
                (row: { title: string; content: ReactElement }): ReactElement => {
                  return <Row icons={icons} row={row} />
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default DropdownsComponent
