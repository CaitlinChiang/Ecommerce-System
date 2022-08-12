import { ReactElement, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GetUser } from '../../users/View/query'
import mutation from './mutation'
import { Button } from '@mui/material'
import { AddCartItemArgs } from '../../../../types/cart'
import { User } from '../../../../types/user'
import ModalComponent from '../../_common/ModalComponent'
import SignInButton from '../../_common/SignInButton'

const globalAny: any = global

const AddCartItem = ({ args }: { args: AddCartItemArgs }): ReactElement => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { data } = useQuery(GetUser)
  const user: User = data?.get_user || {}

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: { item: args.item },
    onCompleted: () => {
      globalAny.setNotification(true, 'Item added to cart!')
      globalAny.updateCartQuantity()
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      <ModalComponent
        content={<SignInButton />}
        onClose={(): void => setModalOpen(false)}
        open={modalOpen}
        title={'Please sign in to add items to cart.'}
      />
      <Button
        disabled={updateMutationState.loading}
        onClick={(): void => {
          Object.keys(user).length === 0 ? setModalOpen(true) : updateMutation()
        }}
      >
        {'Add to Cart'}
      </Button>
    </>
  )
}

export default AddCartItem
