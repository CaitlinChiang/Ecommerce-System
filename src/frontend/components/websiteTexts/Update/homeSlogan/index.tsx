import { ReactElement, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { GetWebsiteText } from '../../View/query'
import mutation from '../mutation'
import { Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { WebsiteText, UpdateWebsiteTextArgs } from '../../../../../types/websiteText'
import { WebsiteTextType } from '../../../../_enums/websiteTextType'
import UpdateHistory from '../../../_common/UpdateHistory'
import Text from '../../../_common/TextField'
import MutationButton from '../../../_common/MutationButton'
import { correctArgs } from '../../../../_utils/handleArgs/correctArgs'

const globalAny: any = global

const UpdateHomeSlogan = (): ReactElement => {
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
    <Card>
      <CardContent>
        {loading && <CircularProgress />}
        <Typography sx={{ marginBottom: 1 }} variant={'h2'}>
          {'Home Slogan'}
        </Typography>
        <UpdateHistory obj={websiteText} websiteText={true} />
        <Text
          args={args}
          error={validateFields}
          maxLength={100}
          multiline={true}
          placeholder={'Type home page slogan here...'}
          required={true}
          setArgs={setArgs}
          targetProp={'content'}
        />
        <MutationButton
          disabled={updateMutationState.loading}
          onClick={(): void => {
            setValidateFields(true)
            updateMutation()
          }}
          title={'Save Changes'}
        />
      </CardContent>
    </Card>
  )
}

export default UpdateHomeSlogan
