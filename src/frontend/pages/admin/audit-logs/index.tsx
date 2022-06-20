import React, { ReactElement } from 'react'
import layout from '../../../layouts'
import AuditLogsTable from '../../../components/auditLogs/Showcase/table'

const Page = (): ReactElement => {
  return (
    <>
      <AuditLogsTable />
    </>
  )
}

export default layout(Page, { title: 'Audit Logs' })
