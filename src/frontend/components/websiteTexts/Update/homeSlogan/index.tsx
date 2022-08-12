import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { GetWebsiteText } from '../../View/query'
import mutation from '../mutation'
import { Button, CircularProgress, Typography } from '@mui/material'
import { WebsiteText, UpdateWebsiteTextArgs } from '../../../../../types/websiteText'
import { AdminPermission } from '../../../../_enums/adminPermission'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import Text from '../../../_common/TextField'
import { authenticateUser } from '../../../../_utils/auth/authenticateUser'
import { correctArgs } from '../../../../_utils/handleArgs/correctArgs'

const globalAny: any = global

const UpdateHomeSlogan = (): ReactElement => {
  const disableUpdateWebsiteText = !authenticateUser(
    AdminPermission.UPDATE_WEBSITE_TEXT
  )

  const [args, setArgs] = useState<UpdateWebsiteTextArgs>({
    _id: null,
    content: null,
    type: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetWebsiteText, {
    variables: { type: WebsiteTextType.HOME_SLOGAN }
  })
  const websiteText: WebsiteText = data?.get_website_text || {}

  useEffect(() => {
    setArgs({
      content: websiteText?.content,
      type: WebsiteTextType.HOME_SLOGAN
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'Home page slogan successfully updated!')
      setValidateFields(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <>
      {loading && <CircularProgress />}
      <Typography>{`Last Updated At: ${websiteText?.updatedAt || '-'}`}</Typography>
      <Text
        args={args}
        disabled={disableUpdateWebsiteText}
        error={validateFields}
        maxLength={100}
        placeholder={'Type home page slogan here...'}
        required={true}
        setArgs={setArgs}
        targetProp={'content'}
      />
      <Button
        disabled={disableUpdateWebsiteText || updateMutationState.loading}
        onClick={(): void => {
          setValidateFields(true)
          updateMutation()
        }}
      >
        {'Save Changes'}
      </Button>
    </>
  )
}

export default UpdateHomeSlogan
