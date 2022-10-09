import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import UpdateAboutWriteup from '../../../components/websiteTexts/Update/aboutWriteup'
import UpdateHomeSlogan from '../../../components/websiteTexts/Update/homeSlogan'
import UpdateContactInformation from '../../../components/websiteTexts/Update/contactInformation'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.UPDATE_WEBSITE_TEXT}>
      <UpdateHomeSlogan />
      <UpdateAboutWriteup />
      <UpdateContactInformation />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Website Texts' })
