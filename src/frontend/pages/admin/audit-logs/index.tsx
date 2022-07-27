import { ReactElement } from 'react'
import { AdminPermission } from '../../../_enums/adminPermission'
import layout from '../../../layouts/admin'
import AuditLogsTable from '../../../components/auditLogs/View/table'
import NoPermissions from '../../../components/_common/NoPermissions'
import { authenticateUser } from '../../../_utils/auth/authenticateUser'

const Page = (): ReactElement => {
  if (!authenticateUser(AdminPermission.VIEW_AUDIT_LOGS)) return <NoPermissions />

  return (
    <>
      <AuditLogsTable />
    </>
  )
}

export default layout(Page, { title: 'Audit Logs' })
