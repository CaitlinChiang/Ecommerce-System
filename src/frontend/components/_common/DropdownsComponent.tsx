import React, { ReactElement } from 'react'
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

const DropdownsComponent = ({
  icons,
  open,
  rows,
  setOpen
}: {
  icons?: { closed: ReactElement; opened: ReactElement }
  open: boolean
  rows: { title: string; content: ReactElement }[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableBody>
          {rows.map(
            (row: { title: string; content: ReactElement }): ReactElement => {
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
                    <TableCell
                      colSpan={6}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>{row.content}</Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
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
