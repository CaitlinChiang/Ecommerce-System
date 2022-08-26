import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedAccess from '../../../components/users/Authorization'
import AuditLogsTable from '../../../components/auditLogs/View/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedAccess permission={AdminPermission.VIEW_AUDIT_LOGS}>
      <AuditLogsTable />
    </AuthorizedAccess>
  )
}

export default layout(Page, { title: 'Audit Logs' })
