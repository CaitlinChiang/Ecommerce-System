import { ReactElement, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Grid } from '@mui/material'
import { PaginateDataArgs } from '../../../types/actions/paginateData'
import SearchField from './SearchField'
import PaginationComponent from './PaginationComponent'

const CardsPaginationComponent = ({
  count,
  loading,
  paginateDataArgs,
  searchLabel,
  searchPlaceholder,
  setPaginateDataArgs
}: {
  count: number
  loading: boolean
  paginateDataArgs: PaginateDataArgs
  searchLabel?: string
  searchPlaceholder?: string
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  const { sortBy } = paginateDataArgs

  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    setPaginateDataArgs({ ...paginateDataArgs, page: 0 })
  }, [searchText, sortBy])

  return (
    <>
      <Grid
        container
        justifyContent='center'
        direction='column'
        alignItems='center'
        spacing={0}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingBottom: 1.5
          }}
        >
          {searchLabel && (
            <>
              <Grid item xs={11}>
                <SearchField
                  onKeyDown={(e): void => {
                    if (e.key === 'Enter') {
                      setPaginateDataArgs({ ...paginateDataArgs, searchText })
                    }
                  }}
                  searchLabel={searchLabel}
                  searchPlaceholder={searchPlaceholder}
                  searchText={searchText}
                  setSearchText={setSearchText}
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  color={'primary'}
                  sx={{ borderRadius: 5, marginTop: 2 }}
                  onClick={(): void => {
                    setPaginateDataArgs({ ...paginateDataArgs, searchText })
                  }}
                  variant={'contained'}
                >
                  {'Search'}
                </Button>
              </Grid>
            </>
          )}
        </Box>
      </Grid>
      {loading && <CircularProgress />}
      <PaginationComponent
        count={count}
        paginateDataArgs={paginateDataArgs}
        rowsPerPageOptions={[12, 16, 20, 24, 28, 32, 36, 40]}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default CardsPaginationComponent
