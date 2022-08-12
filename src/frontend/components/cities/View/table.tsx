import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetCities } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, TableCell, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { City, GetCityArgs } from '../../../../types/city'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { AdminPermission } from '../../../_enums/adminPermission'
import { SortDirection } from '../../../_enums/sortDirection'
import TableComponent from '../../_common/TableComponent'
import ModalComponent from '../../_common/ModalComponent'
import CreateCity from '../Create'
import UpdateCity from '../Update'
import DeleteButton from '../../_common/DeleteButton'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../_utils/handleArgs/returnFetchMoreArgs'
import { formatPrice } from '../../../_utils/handleFormat/formatPrice'

const CitiesTable = (): ReactElement => {
  const disableUpdateCity = !authenticateUser(AdminPermission.UPDATE_CITY)
  const disableDeleteCity = !authenticateUser(AdminPermission.DELETE_CITY)

  const args: GetCityArgs = {}
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'name',
    sortDirection: SortDirection.ASC
  })

  const [update, setUpdate] = useState<{ cityId: string; openModal: boolean }>({
    cityId: null,
    openModal: false
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetCities, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })
  const cities: City[] = data?.get_cities || []
  const citiesCount: number = data?.get_cities_count || 0

  const refetchArgs: RefetchDataArgs = {
    args,
    count: citiesCount,
    loading,
    paginateDataArgs,
    refetch
  }

  const cityHeaders = [
    { label: 'name', sortable: true },
    { label: 'shippingFee', sortable: false },
    { label: 'actions', sortable: false }
  ]

  const cityRows = [
    cities?.map((city: City): ReactElement => {
      const { name, shippingFee } = city

      return (
        <TableRow>
          <TableCell>{name}</TableCell>
          <TableCell>{`P${formatPrice(shippingFee)}`}</TableCell>
          <TableCell>
            <IconButton
              disabled={disableUpdateCity}
              onClick={(): void => {
                setUpdate({ cityId: String(city._id), openModal: true })
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={city._id}
              disabled={disableDeleteCity}
              label={'City & shipping fee'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
              setPaginateDataArgs={setPaginateDataArgs}
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
        content={<UpdateCity _id={update.cityId} refetchArgs={refetchArgs} />}
        onClose={(): void => setUpdate({ ...update, openModal: false })}
        open={update.openModal}
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
        searchLabel={'Search City by Name'}
        searchPlaceholder={'ex. Makati'}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default CitiesTable
