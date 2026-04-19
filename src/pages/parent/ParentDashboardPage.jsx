import { Link } from 'react-router-dom'
import StatSummaryCard from '../../components/dashboard/StatSummaryCard.jsx'
import ApplicationListPanel from '../../components/dashboard/ApplicationListPanel.jsx'
import ApplicationRow from '../../components/dashboard/ApplicationRow.jsx'
import InfoActionCard from '../../components/dashboard/InfoActionCard.jsx'
import { IconClock, IconFileStack, IconInfo, IconPencil, IconCheck } from '../../components/icons/NavIcons.jsx'
import {
  parentApplicationStats,
  parentApplicationsPreview,
  parentHelpCards,
  parentUserProfile,
} from '../../data/parentDashboardDummy.js'
const PARENT_APPLICATIONS_PATH = '/parent/applications'

function ParentDashboardPage() {
  const { firstName } = parentUserProfile
  const stats = parentApplicationStats

  return (
    <div className="parent-dashboard">
      <header className="parent-dashboard__hero">
        <div>
          <h1 className="parent-dashboard__title">Welcome, {firstName}</h1>
          <p className="parent-dashboard__subtitle">Manage your child&apos;s enrolment applications</p>
        </div>
        <Link to="/parent/enrol-student" className="parent-dashboard__cta">
          + New Enrolment
        </Link>
      </header>

      <section className="parent-dashboard__stats" aria-label="Application summary">
        <StatSummaryCard
          value={stats.draftCount}
          label="Draft applications"
          tone="mint"
          icon={<IconPencil width={20} height={20} />}
        />
        <StatSummaryCard
          value={stats.inProgressCount}
          label="In progress"
          tone="sky"
          icon={<IconClock width={20} height={20} />}
        />
        <StatSummaryCard
          value={stats.completedCount}
          label="Completed"
          tone="success"
          icon={<IconCheck width={20} height={20} />}
        />
      </section>

      <ApplicationListPanel title="My Applications" viewAllTo={PARENT_APPLICATIONS_PATH}>
        {parentApplicationsPreview.map((app) => (
          <ApplicationRow
            key={app.id}
            studentName={app.studentName}
            statusLabel={app.statusLabel}
            referenceCode={app.referenceCode}
            yearLevel={app.yearLevel}
            hint={app.hint}
            progressPercent={app.progressPercent}
            continueTo={app.continueHref}
          />
        ))}
      </ApplicationListPanel>

      <section className="parent-dashboard__help-grid" aria-label="Help and documents">
        {parentHelpCards.map((card) => (
          <InfoActionCard
            key={card.id}
            variant={card.variant}
            title={card.title}
            body={card.body}
            actionLabel={card.actionLabel}
            actionHref={card.actionHref}
            icon={
              card.variant === 'documents' ? (
                <IconFileStack width={22} height={22} />
              ) : (
                <IconInfo width={22} height={22} />
              )
            }
          />
        ))}
      </section>
    </div>
  )
}

export default ParentDashboardPage
