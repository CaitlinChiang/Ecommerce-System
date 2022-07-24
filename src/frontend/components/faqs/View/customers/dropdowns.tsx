import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetFAQs } from '../query'
import { Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { FAQ } from '../../../../../types/faq'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { SortDirection } from '../../../../_enums/sortDirection'
import DropdownsComponent from '../../../_common/DropdownsComponent'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'

const FAQsDropdowns = (): ReactElement => {
  const args: any = {}
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.ASC
  })

  const { data, loading, fetchMore } = useQuery(GetFAQs, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const faqs: FAQ[] = data?.get_faqs || []
  const faqsCount: number = data?.get_faqs_count || 0

  const faqRows = faqs?.map((faq: FAQ): { title: string; content: ReactElement } => {
    return {
      title: faq.question,
      content: <Typography>{faq.answer}</Typography>
    }
  })

  const icons = {
    closed: <AddCircleIcon />,
    opened: <RemoveCircleIcon />
  }

  return (
    <>
      <DropdownsComponent
        args={args}
        count={faqsCount}
        fetchMore={fetchMore}
        icons={icons}
        loading={loading}
        paginateDataArgs={paginateDataArgs}
        rows={faqRows}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default FAQsDropdowns
