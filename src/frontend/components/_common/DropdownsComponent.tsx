import React, { ReactElement } from 'react'
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

interface Row {
  title: string
  content: ReactElement
}

const DropdownsComponent = ({
  open,
  setOpen,
  rows
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  rows: Row[]
}): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableBody>
          {rows.map((row: Row): ReactElement => {
            return (
              <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell component='th' scope='row'>
                    {row.title}
                  </TableCell>
                  <TableCell align={'right'}>
                    <IconButton
                      aria-label='expand row'
                      size='small'
                      onClick={() => setOpen(!open)}
                    >
                      {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <Box sx={{ margin: 1 }}>{row.content}</Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DropdownsComponent
