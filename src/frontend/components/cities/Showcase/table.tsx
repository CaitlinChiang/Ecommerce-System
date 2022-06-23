import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { City } from '../../../../types/city'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import ModalComponent from '../../_common/ModalComponent'
import UpdateCity from '../Update'
import DeleteButton from '../../_common/DeleteButton'
import CreateCity from '../Create'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const CitiesTable = (): ReactElement => {
  const args: any = {}
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })
  const [cityId, setCityId] = useState<string>('')
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(queryMultiple, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  useEffect(() => {
    setRefetchArgs({
      args,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [args, paginateDataArgs])

  const cities = data?.get_cities || []
  const citiesCount: number = data?.get_cities_count || 0

  const cityHeaders = [
    { label: 'name', sortable: true },
    { label: 'shippingFee', sortable: false },
    { label: 'actions', sortable: false }
  ]

  const cityRows = [
    cities?.map((city: City): ReactElement => {
      return (
        <TableRow>
          <TableCell align={'center'}>{city?.name}</TableCell>
          <TableCell align={'center'}>
            {'P' + city?.shippingFee?.toFixed(2)}
          </TableCell>
          <TableCell align={'center'}>
            <IconButton
              onClick={(): void => {
                setUpdateModalOpen(true)
                setCityId(String(city._id))
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={city._id}
              label={'City & shipping fee'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
            />
          </TableCell>
        </TableRow>
      )
    })
  ]

  return (
    <>
      <CreateCity refetchArgs={refetchArgs} />
      <ModalComponent
        content={
          <UpdateCity
            _id={cityId}
            refetchArgs={refetchArgs}
            setUpdateModalOpen={setUpdateModalOpen}
          />
        }
        onClose={(): void => {
          setUpdateModalOpen(false)
        }}
        open={updateModalOpen}
        title={'Update City & Shipping Fee'}
      />
      <TableComponent
        args={args}
        count={citiesCount}
        fetchMore={fetchMore}
        headers={cityHeaders}
        loading={loading}
        paginateDataArgs={paginateDataArgs}
        rows={cityRows}
        rowsPerPageOptions={[10, 25, 50, 75, 100]}
        searchLabel={'Search City by Name'}
        searchPlaceholder={'ex. Makati'}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default CitiesTable
