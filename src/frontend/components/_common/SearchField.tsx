import { ReactElement, KeyboardEvent } from 'react'
import { styled } from '@mui/material/styles'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import { PaginateDataArgs } from '../../../types/actions/paginateData'

const SearchField = ({
  onKeyDown,
  searchLabel,
  searchPlaceholder,
  searchText,
  setPaginateDataArgs
}: {
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  searchLabel?: string
  searchPlaceholder?: string
  searchText: string
  setPaginateDataArgs: React.Dispatch<React.SetStateAction<PaginateDataArgs>>
}): ReactElement => {
  const StyledTextField = styled(TextField)`
    fieldset {
      border-radius: 50px;
    }
  `

  return (
    <StyledTextField
      fullWidth
      label={searchLabel}
      onChange={(e): void => setPaginateDataArgs({ searchText: e.target.value })}
      onKeyDown={onKeyDown}
      placeholder={searchPlaceholder}
      size={'small'}
      sx={{ borderRadius: 0, marginTop: 1.8 }}
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
  )
}

export default SearchField
