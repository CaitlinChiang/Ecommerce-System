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

const UpdateAboutWriteup = (): ReactElement => {
  const [args, setArgs] = useState<UpdateWebsiteTextArgs>({
    _id: null,
    content: null,
    type: null
  })

  const [validateFields, setValidateFields] = useState<boolean>(false)

  const { data, loading } = useQuery(GetWebsiteText, {
    variables: { type: WebsiteTextType.ABOUT_WRITEUP }
  })
  const websiteText: WebsiteText = data?.get_website_text || {}

  useEffect(() => {
    setArgs({
      content: websiteText?.content,
      type: WebsiteTextType.ABOUT_WRITEUP
    })
  }, [data])

  const [updateMutation, updateMutationState] = useMutation(mutation, {
    variables: correctArgs(args),
    onCompleted: () => {
      globalAny.setNotification(true, 'About page write-up successfully updated!')
      setValidateFields(false)
    },
    onError: (error) => globalAny.setNotification(false, error.message)
  })

  return (
    <Card>
      <CardContent>
        {loading && <CircularProgress />}
        <Typography sx={{ marginBottom: 1 }} variant={'h2'}>
          {'About Writeup'}
        </Typography>
        <UpdateHistory obj={websiteText} websiteText={true} />
        <Text
          args={args}
          error={validateFields}
          maxLength={700}
          multiline={true}
          placeholder={'Type about page write-up here...'}
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

export default UpdateAboutWriteup
