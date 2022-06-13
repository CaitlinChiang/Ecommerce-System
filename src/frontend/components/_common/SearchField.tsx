import React, { ReactElement, KeyboardEvent } from 'react'
import theme from '../../themes'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import { SearchTableQueryArgs } from '../../../types/actions/searchTableQuery'

const SearchField = ({
  onBlur,
  onKeyDown,
  onSearch,
  searchButtonDisabled,
  searchLabel,
  searchPlaceholder,
  searchText,
  setSearchTableQuery
}: {
  onBlur?: VoidFunction
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
  onSearch?: () => void
  searchButtonDisabled?: boolean
  searchLabel?: string
  searchPlaceholder?: string
  searchText: string
  setSearchTableQuery: React.Dispatch<React.SetStateAction<SearchTableQueryArgs>>
}): ReactElement => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      }}
    >
      <TextField
        fullWidth
        label={searchLabel}
        onChange={(e): void => {
          setSearchTableQuery({ searchText: e.target.value })
        }}
        onKeyDown={onKeyDown}
        placeholder={searchPlaceholder}
        size={'small'}
        sx={{ marginRight: theme.spacing() }}
        value={searchText}
        variant={'outlined'}
        InputProps={{
          onBlur: onBlur ? onBlur : null,
          onKeyDown: (e): void => {
            if (onBlur && e.keyCode === 13) {
              onBlur()
            }
          },
          startAdornment: (
            <InputAdornment position={'start'}>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position={'end'}>
              <IconButton
                edge={'end'}
                onClick={(): void => {
                  setSearchTableQuery({ searchText: '' })
                }}
              >
                <CancelIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {onSearch && (
        <Button
          color={'primary'}
          disabled={searchButtonDisabled}
          onClick={onSearch}
          variant={'contained'}
        >
          {'Search'}
        </Button>
      )}
    </div>
  )
}

export default SearchField
