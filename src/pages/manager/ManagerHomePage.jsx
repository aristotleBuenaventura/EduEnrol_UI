import ManagerApplicationQueueTable from '../../components/dashboard/ManagerApplicationQueueTable.jsx'
import ManagerKpiCard from '../../components/dashboard/ManagerKpiCard.jsx'
import SltWorkloadMemberCard from '../../components/dashboard/SltWorkloadMemberCard.jsx'
import { IconClock, IconDocument, IconUserPlus, IconUsers } from '../../components/icons/NavIcons.jsx'
import {
  managerApplicationQueueRows,
  managerHomeKpis,
  managerSltWorkloadMembers,
} from '../../data/managerDashboardDummy.js'
import '../../styles/parent-dashboard.css'
import '../../styles/manager-dashboard.css'

const kpiIcons = {
  document: <IconDocument width={22} height={22} />,
  userPlus: <IconUserPlus width={22} height={22} />,
  clock: <IconClock width={22} height={22} />,
  users: <IconUsers width={22} height={22} />,
}

function ManagerHomePage() {
  return (
    <div className="manager-dashboard">
      <header className="manager-dashboard__hero">
        <h1 className="manager-dashboard__title">School Administrator Dashboard</h1>
        <p className="manager-dashboard__subtitle">
          Manage workload distribution and monitor application progress
        </p>
      </header>

      <section className="manager-dashboard__kpis" aria-label="Workload summary">
        {managerHomeKpis.map((kpi) => (
          <ManagerKpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            hint={kpi.hint}
            icon={kpiIcons[kpi.icon] ?? kpiIcons.document}
          />
        ))}
      </section>

      <section aria-labelledby="slt-workload-heading">
        <h2 id="slt-workload-heading" className="manager-dashboard__section-title">
          SLT Workload Distribution
        </h2>
        <div className="manager-dashboard__workload-row">
          {managerSltWorkloadMembers.map((m) => (
            <SltWorkloadMemberCard
              key={m.id}
              fullName={m.fullName}
              email={m.email}
              initials={m.initials}
              activeAssignments={m.activeAssignments}
              progressPercent={m.progressPercent}
            />
          ))}
        </div>
      </section>

      <section className="manager-dashboard__queue-panel" aria-label="Application queue">
        <ManagerApplicationQueueTable rows={managerApplicationQueueRows} />
      </section>
    </div>
  )
}

export default ManagerHomePage
