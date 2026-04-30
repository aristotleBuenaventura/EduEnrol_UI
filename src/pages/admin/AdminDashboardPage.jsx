import AdminMetricCard from '../../components/dashboard/AdminMetricCard.jsx'
import BarChartPanel from '../../components/dashboard/BarChartPanel.jsx'
import DonutBreakdownPanel from '../../components/dashboard/DonutBreakdownPanel.jsx'
import IntegrationStatusPanel from '../../components/dashboard/IntegrationStatusPanel.jsx'
import RecentApplicationsPanel from '../../components/dashboard/RecentApplicationsPanel.jsx'
import RuleViolationsPanel from '../../components/dashboard/RuleViolationsPanel.jsx'
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconDocument,
  IconUsers,
  IconWarning,
} from '../../components/icons/NavIcons.jsx'
import {
  adminApplicationsByStatus,
  adminApplicationsByYearLevel,
  adminIntegrations,
  adminMetricCards,
  adminRecentApplications,
  adminRuleViolations,
} from '../../data/adminDashboardDummy.js'

const metricIconByName = {
  document: IconDocument,
  clock: IconClock,
  check: IconCheck,
  users: IconUsers,
}

function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__hero">
        <div>
          <h1 className="admin-dashboard__title">Admin Dashboard</h1>
          <p className="admin-dashboard__subtitle">Overview of all enrolment activities</p>
        </div>
        <button type="button" className="admin-dashboard__cta">
          Manage Forms
          <IconArrowRight width={16} height={16} />
        </button>
      </header>

      <section className="admin-dashboard__metrics" aria-label="Admin metrics">
        {adminMetricCards.map((card) => {
          const Icon = metricIconByName[card.icon] ?? IconDocument
          return <AdminMetricCard key={card.id} label={card.label} value={card.value} trend={card.trend} icon={<Icon />} />
        })}
      </section>

      <section className="admin-dashboard__grid admin-dashboard__grid--top">
        <DonutBreakdownPanel title="Applications by Status" segments={adminApplicationsByStatus} />
        <BarChartPanel title="Applications by Year Level" bars={adminApplicationsByYearLevel} />
        <IntegrationStatusPanel
          title="System Integrations"
          subtitle="External Integrations"
          items={adminIntegrations}
          lastSync="10 Feb 2024, 08:30"
        />
      </section>

      <section className="admin-dashboard__grid admin-dashboard__grid--bottom">
        <RecentApplicationsPanel title="Recent Applications" actionTo="/admin/workflow" items={adminRecentApplications} />
        <RuleViolationsPanel
          title="Rule Violations"
          items={adminRuleViolations}
          action={<span className="admin-dashboard__section-icon" aria-hidden="true"><IconWarning /></span>}
        />
      </section>
    </div>
  )
}

export default AdminDashboardPage
