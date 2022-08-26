import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuthorizedPath from '../../../components/users/Authorization'
import AuditLogsTable from '../../../components/auditLogs/View/table'

const Page = (): ReactElement => {
  return (
    <AuthorizedPath permission={AdminPermission.VIEW_AUDIT_LOGS}>
      <AuditLogsTable />
    </AuthorizedPath>
  )
}

export default layout(Page, { title: 'Audit Logs' })
