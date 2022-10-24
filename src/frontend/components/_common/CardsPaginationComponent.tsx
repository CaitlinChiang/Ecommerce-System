import { ReactElement, useEffect, useState } from 'react'
import { Button, CircularProgress, Grid } from '@mui/material'
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
      <Grid container sx={{ justifyContent: 'center' }}>
        {searchLabel && (
          <>
            <Grid item xs={10}>
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
            <Grid item xs={2}>
              <Button
                color={'primary'}
                sx={{ borderRadius: 5, marginTop: 1.8 }}
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
      </Grid>
      {loading && <CircularProgress />}
      <PaginationComponent
        count={count}
        paginateDataArgs={paginateDataArgs}
        rowsPerPageOptions={[12, 18, 24, 30]}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default CardsPaginationComponent
