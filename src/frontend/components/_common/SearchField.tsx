import { ReactElement, KeyboardEvent } from 'react'
import styles from '../../styles/_common/searchField'
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import { PaginateDataArgs } from '../../../types/actions/paginateData'

const SearchField = ({
  onKeyDown,
  onSearch,
  searchButtonDisabled,
  searchLabel,
  searchPlaceholder,
  searchText,
  setPaginateDataArgs
}: {
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  onSearch?: () => void
  searchButtonDisabled?: boolean
  searchLabel?: string
  searchPlaceholder?: string
  searchText: string
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  return (
    <Container sx={styles.container}>
      <TextField
        fullWidth
        label={searchLabel}
        onChange={(e): void => setPaginateDataArgs({ searchText: e.target.value })}
        onKeyDown={onKeyDown}
        placeholder={searchPlaceholder}
        size={'small'}
        value={searchText}
        InputProps={{
          startAdornment: (
            <InputAdornment position={'start'}>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position={'end'}>
              <IconButton
                edge={'end'}
                onClick={(): void => setPaginateDataArgs({ searchText: '' })}
              >
                <CancelIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {onSearch && (
        <Button disabled={searchButtonDisabled} onClick={onSearch}>
          {'Search'}
        </Button>
      )}
    </Container>
  )
}

export default SearchField
