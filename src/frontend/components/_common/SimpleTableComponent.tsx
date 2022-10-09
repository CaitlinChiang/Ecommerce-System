import React, { ReactElement } from 'react'
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

const SimpleTableComponent = ({
  headers,
  loading,
  rows
}: {
  headers: string[]
  loading?: boolean
  rows: any[]
}): ReactElement => {
  return (
    <Card>
      <CardContent>
        {loading && <CircularProgress />}
        <Box sx={{ overflow: { xs: 'auto', sm: 'unset' } }}>
          <Table sx={{ whiteSpace: 'nowrap' }}>
            <TableHead>
              <TableRow>
                {headers.map((header: string, index: number): ReactElement => {
                  return (
                    <TableCell key={index}>
                      <Typography variant={'h5'}>{header}</Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SimpleTableComponent
