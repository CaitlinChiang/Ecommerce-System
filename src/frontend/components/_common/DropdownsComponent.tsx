import { ReactElement, useState } from 'react'
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
  TableRow,
  Typography
} from '@mui/material'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import PaginationComponent from './PaginationComponent'

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
      <TableRow sx={{ backgroundColor: open ? '#e7e7e7' : '#ffffff' }}>
        <TableCell scope='row' sx={{ borderBottom: 0 }}>
          <Typography variant={'h5'}>{row.title}</Typography>
        </TableCell>
        {row?.actions && (
          <TableCell align={'right'} sx={{ borderBottom: 0 }}>
            {row.actions}
          </TableCell>
        )}
        <TableCell align={'right'} sx={{ borderBottom: 0 }}>
          <IconButton color={'primary'} onClick={() => setOpen(!open)} size='small'>
            {open ? icons.opened : icons.closed}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box marginTop={3} marginBottom={3} marginLeft={5}>
              {row.content}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const DropdownsComponent = ({
  count,
  icons,
  loading,
  paginateDataArgs,
  rows,
  setPaginateDataArgs
}: {
  count?: number
  icons: { closed: ReactElement; opened: ReactElement }
  loading?: boolean
  paginateDataArgs?: PaginateDataArgs
  rows: { actions?: ReactElement; title: string; content: ReactElement }[]
  setPaginateDataArgs?: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
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
