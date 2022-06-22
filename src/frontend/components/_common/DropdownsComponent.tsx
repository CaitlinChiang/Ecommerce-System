import { ReactElement, useState } from 'react'
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material'

const Row = ({
  icons,
  row
}: {
  icons: { closed: ReactElement; opened: ReactElement }
  row: { title: string; content: ReactElement }
}): ReactElement => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component='th' scope='row'>
          {row.title}
        </TableCell>
        <TableCell align={'right'}>
          <IconButton
            aria-label='expand row'
            onClick={() => setOpen(!open)}
            size='small'
          >
            {open ? icons.opened : icons.closed}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>{row.content}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const DropdownsComponent = ({
  icons,
  rows
}: {
  icons: { closed: ReactElement; opened: ReactElement }
  rows: { title: string; content: ReactElement }[]
}): ReactElement => {
  return (
    <TableContainer component={Paper}>
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
