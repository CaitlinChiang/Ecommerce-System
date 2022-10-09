import { ReactElement, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetFAQs } from '../query'
import deleteMutation from '../../Delete/mutation'
import { IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { FAQ, GetFAQArgs } from '../../../../../types/faq'
import { PaginateDataArgs } from '../../../../../types/actions/paginateData'
import { RefetchDataArgs } from '../../../../../types/actions/refetchData'
import { AdminPermission } from '../../../../_enums/adminPermission'
import { SortDirection } from '../../../../_enums/sortDirection'
import DropdownsComponent from '../../../_common/DropdownsComponent'
import UpdateFAQ from '../../Update'
import DeleteButton from '../../../_common/DeleteButton'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { fetchMoreArgs } from '../../../../_utils/handleArgs/returnFetchMoreArgs'

const FAQsDropdowns = (): ReactElement => {
  const disableUpdateFAQ = !authenticateUser(AdminPermission.UPDATE_FAQ)
  const disableDeleteFAQ = !authenticateUser(AdminPermission.DELETE_FAQ)

  const args: GetFAQArgs = {}
  const [paginateDataArgs, setPaginateDataArgs] = useState<PaginateDataArgs>({
    page: 0,
    rowsPerPage: 10,
    searchText: '',
    sortBy: 'createdAt',
    sortDirection: SortDirection.ASC
  })

  const [update, setUpdate] = useState<{ faqId: string; openModal: boolean }>({
    faqId: null,
    openModal: false
  })

  const { data, loading, fetchMore, refetch } = useQuery(GetFAQs, {
    variables: { ...args, paginateData: paginateDataArgs },
    ...fetchMoreArgs
  })
  const faqs: FAQ[] = data?.get_faqs || []
  const faqsCount: number = data?.get_faqs_count || 0

  const refetchArgs: RefetchDataArgs = {
    args,
    count: faqsCount,
    loading,
    paginateDataArgs,
    refetch
  }

  const faqRows = faqs?.map(
    (faq: FAQ): { actions: ReactElement; title: string; content: ReactElement } => {
      const { _id, answer, question } = faq

      return {
        actions: (
          <>
            <IconButton
              disabled={disableUpdateFAQ}
              onClick={(): void => {
                setUpdate({ faqId: String(_id), openModal: true })
              }}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton
              _id={_id}
              disabled={disableDeleteFAQ}
              label={'FAQ'}
              mutation={deleteMutation}
              refetchArgs={refetchArgs}
              setPaginateDataArgs={setPaginateDataArgs}
            />
          </>
        ),
        title: question,
        content: <Typography>{answer}</Typography>
      }
    }
  )

  const icons = {
    closed: <AddCircleIcon />,
    opened: <RemoveCircleIcon />
  }

  return (
    <>
      <UpdateFAQ
        _id={update.faqId}
        onClose={(): void => setUpdate({ ...update, openModal: false })}
        open={update.openModal}
        refetchArgs={refetchArgs}
      />
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
