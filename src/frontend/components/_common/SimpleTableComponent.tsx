import React, { ReactElement } from 'react'
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

const SimpleTableComponent = ({
  headers,
  loading,
  rows
}: {
  headers: string[]
  loading: boolean
  rows: any[]
}): ReactElement => {
  return (
    <>
      {loading && <CircularProgress />}
      <TableContainer>
        <Table size={'small'}>
          <TableHead>
            <TableRow>
              {headers.map((header: string, index: number): ReactElement => {
                return (
                  <TableCell key={index} align={'center'} padding={'checkbox'}>
                    {header}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SimpleTableComponent
