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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

const DropdownsComponent = ({
  open,
  rows,
  setOpen
}: {
  open: boolean
  rows: { title: string; content: ReactJSXElement }[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableBody>
          {rows.map(
            (row: { title: string; content: ReactJSXElement }): ReactElement => {
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
                        {open ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowRightIcon />
                        )}
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
