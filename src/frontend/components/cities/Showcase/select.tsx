import { ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import { City } from '../../../../types/city'
import { SortDirection } from '../../../_enums/sortDirection'
import SelectField from '../../../components/_common/SelectField'

const CitiesSelect = ({
  args,
  create,
  required,
  setArgs
}: {
  args: any
  create?: boolean
  required?: boolean
  setArgs: React.Dispatch<React.SetStateAction<any>>
}): ReactElement => {
  const { data } = useQuery(queryMultiple, {
    variables: {
      paginateData: { sortBy: 'name', sortDirection: SortDirection.ASC }
    }
  })

  const cities = data?.get_cities || []

  const cityOptions = cities?.map((city: City) => {
    return {
      label: city.name,
      cityId: city._id
    }
  })

  const selectVal = cityOptions?.find((city: any) => city.cityId === args?.cityId)

  if (!selectVal && !create) return

  return (
    <SelectField
      label={'City'}
      optionLabelProp={'label'}
      options={cityOptions}
      required={required}
      selectVal={selectVal}
      setArgs={setArgs}
      args={args}
      targetProp={'cityId'}
    />
  )
}

export default CitiesSelect
