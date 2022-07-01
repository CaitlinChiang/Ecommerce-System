import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { queryMultiple } from './query'
import deleteMutation from '../Delete/mutation'
import { IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { FAQ } from '../../../../types/faq'
import { PaginateDataArgs } from '../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../types/actions/refetchData'
import { SortDirection } from '../../../_enums/sortDirection'
import DropdownsComponent from '../../../components/_common/DropdownsComponent'
import ModalComponent from '../../_common/ModalComponent'
import UpdateFAQ from '../Update'
import DeleteButton from '../../_common/DeleteButton'
import CreateFAQ from '../Create'
import { fetchMoreArgs } from '../../../_utils/returnFetchMoreArgs'

const FAQsDropdowns = (): ReactElement => {
  const args: any = {}
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.ASC
  })
  const [faqId, setFaqId] = useState<string>('')
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
  const [refetchArgs, setRefetchArgs] = useState<RefetchDataArgs>({
    args: null,
    count: null,
    loading: false,
    paginateDataArgs: null,
    refetch: null
  })

  const { data, loading, fetchMore, refetch } = useQuery(queryMultiple, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })

  const faqs = data?.get_faqs || []
  const faqsCount: number = data?.get_faqs_count || 0

  useEffect(() => {
    setRefetchArgs({
      args,
      count: faqsCount,
      loading,
      paginateDataArgs,
      refetch
    })
  }, [data, paginateDataArgs])

  const faqRows = faqs?.map((faq: FAQ): any => {
    return {
      actions: (
        <>
          <IconButton
            onClick={(): void => {
              setUpdateModalOpen(true)
              setFaqId(String(faq._id))
            }}
          >
            <EditIcon />
          </IconButton>
          <DeleteButton
            _id={faq._id}
            label={'FAQ'}
            mutation={deleteMutation}
            refetchArgs={refetchArgs}
            setPaginateDataArgs={setPaginateDataArgs}
          />
        </>
      ),
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
      <CreateFAQ refetchArgs={refetchArgs} />
      <ModalComponent
        content={
          <UpdateFAQ
            _id={faqId}
            refetchArgs={refetchArgs}
            setUpdateModalOpen={setUpdateModalOpen}
          />
        }
        onClose={(): void => {
          setUpdateModalOpen(false)
        }}
        open={updateModalOpen}
        title={'Update FAQ'}
      />
      <DropdownsComponent
        args={args}
        count={faqsCount}
        fetchMore={fetchMore}
        icons={icons}
        loading={loading}
        paginateDataArgs={paginateDataArgs}
        rows={faqRows}
        rowsPerPageOptions={[10, 15, 20]}
        setPaginateDataArgs={setPaginateDataArgs}
      />
    </>
  )
}

export default FAQsDropdowns
