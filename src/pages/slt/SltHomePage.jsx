import { Link } from 'react-router-dom'
import ApplicationListPanel from '../../components/dashboard/ApplicationListPanel.jsx'
import {
  IconCalendar,
  IconCheckCircle,
  IconClipboard,
  IconClock,
  IconEye,
} from '../../components/icons/NavIcons.jsx'
import {
  sltDecisionPendingPreview,
  sltHomeStats,
  sltReviewQueuePreview,
  sltUserProfile,
} from '../../data/sltDashboardDummy.js'
import '../../styles/parent-dashboard.css'
import '../../styles/slt-dashboard.css'

const SLT_REVIEW_QUEUE_PATH = '/slt/review-queue'
const SLT_INTERVIEWS_PATH = '/slt/interviews'

const statIcons = {
  pendingReviews: <IconClipboard width={22} height={22} />,
  upcomingInterviews: <IconCalendar width={22} height={22} />,
  pendingDecisions: <IconClock width={22} height={22} />,
  completedMonth: <IconCheckCircle width={22} height={22} />,
}

function SltHomePage() {
  const { fullName } = sltUserProfile
  const review = sltReviewQueuePreview
  const decision = sltDecisionPendingPreview

  return (
    <div className="slt-dashboard">
      <header className="slt-dashboard__hero">
        <h1 className="slt-dashboard__title">SLT Dashboard</h1>
        <p className="slt-dashboard__subtitle">
          Welcome back, {fullName}. Here&apos;s your enrolment overview.
        </p>
      </header>

      <section className="slt-dashboard__stats" aria-label="Enrolment summary">
        {sltHomeStats.map((row) => (
          <article key={row.id} className="slt-stat-card">
            <div className="slt-stat-card__top">
              <span className="slt-stat-card__title">{row.title}</span>
              <span className="slt-stat-card__icon" aria-hidden="true">
                {statIcons[row.id]}
              </span>
            </div>
            <div className="slt-stat-card__value">{row.value}</div>
            <p className="slt-stat-card__hint">{row.hint}</p>
          </article>
        ))}
      </section>

      <div className="slt-dashboard__mid">
        <ApplicationListPanel
          title="Applications for Review"
          viewAllTo={SLT_REVIEW_QUEUE_PATH}
          viewAllLabel="View All →"
        >
          <div className="slt-review-row">
            <div className="slt-review-row__main">
              <p className="slt-review-row__name">{review.studentName}</p>
              <p className="slt-review-row__meta">
                {review.referenceCode} <span aria-hidden="true">•</span> {review.yearLevel}
              </p>
            </div>
            <Link to={SLT_REVIEW_QUEUE_PATH} className="slt-review-row__btn">
              <IconEye width={18} height={18} aria-hidden="true" />
              Review
            </Link>
          </div>
        </ApplicationListPanel>

        <section className="application-list-panel slt-interviews-card" aria-labelledby="slt-upcoming-heading">
          <header className="application-list-panel__header">
            <h2 id="slt-upcoming-heading">Upcoming Interviews</h2>
            <Link to={SLT_INTERVIEWS_PATH} className="application-list-panel__view-all">
              View All
            </Link>
          </header>
          <div className="slt-interviews-empty">
            <span className="slt-interviews-empty__icon" aria-hidden="true">
              <IconCalendar width={44} height={44} />
            </span>
            <p>No interviews scheduled</p>
          </div>
        </section>
      </div>

      <section className="slt-decisions" aria-labelledby="slt-decisions-heading">
        <h2 id="slt-decisions-heading" className="slt-decisions__title">
          Decisions Pending
        </h2>
        <article className="slt-decision-card">
          <div className="slt-decision-card__main">
            <p className="slt-decision-card__name">{decision.studentName}</p>
            <p className="slt-decision-card__meta">
              {decision.yearLevel} <span aria-hidden="true">•</span> {decision.zoneLabel}
            </p>
            <p className="slt-decision-card__interview">{decision.interviewNote}</p>
          </div>
          <div className="slt-decision-card__aside">
            <span className="slt-decision-card__badge">{decision.statusLabel}</span>
            <div className="slt-decision-card__actions">
              <button type="button" className="slt-decision-card__btn slt-decision-card__btn--approve">
                Approve
              </button>
              <button type="button" className="slt-decision-card__btn slt-decision-card__btn--waitlist">
                Waitlist
              </button>
              <button type="button" className="slt-decision-card__btn slt-decision-card__btn--decline">
                Decline
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

export default SltHomePage
