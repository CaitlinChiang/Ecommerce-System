import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { GetUser } from '../../users/View/query'
import mutation from './mutation'
import { AddCartItemArgs } from '../../../../types/cart'
import { User } from '../../../../types/user'
import { Button } from '@mui/material'
import ModalComponent from '../../_common/ModalComponent'

const globalAny: any = global

const AddCartItem = ({ item }: { item: AddCartItemArgs }): ReactElement => {
  const router = useRouter()

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { data } = useQuery(GetUser)

  const user: User = data?.get_user || {}

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { item },
    onCompleted: () => {
      globalAny.setNotification(true, 'Item added to cart!')
    }
  })

  return (
    <>
      <ModalComponent
        content={
          <Button
            onClick={(): void => {
              router.push('/user/sign-in')
            }}
          >
            {'Sign In'}
          </Button>
        }
        onClose={(): void => setModalOpen(false)}
        open={modalOpen}
        title={'Please sign in to add items to cart.'}
      />
      <Button
        disabled={updateMutationState.loading}
        onClick={(): void => {
          if (Object.keys(user).length === 0) {
            setModalOpen(true)
          } else {
            updateMutation()
          }
        }}
      >
        {'Add to Cart'}
      </Button>
    </>
  )
}

export default AddCartItem
