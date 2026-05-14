import EnrollmentStatusPill from '../dashboard/EnrollmentStatusPill.jsx'
import '../../styles/enrollment-pills.css'

/**
 * Summary row after a terminal SLT action (matches “resolved application” card pattern).
 *
 * @param {object} props
 * @param {string} props.studentName
 * @param {string} props.applicationId
 * @param {string} props.submittedLabel
 * @param {'approved' | 'waitlisted' | 'declined'} props.statusKey
 */
function SltResolvedApplicationCard({ studentName, applicationId, submittedLabel, statusKey }) {
  return (
    <article className="slt-rq-resolved-card" aria-label="Latest completed application">
      <div className="slt-rq-resolved-card__main">
        <p className="slt-rq-resolved-card__name">{studentName}</p>
        <p className="slt-rq-resolved-card__meta">
          {applicationId} <span aria-hidden="true">•</span> Submitted {submittedLabel}
        </p>
      </div>
      <EnrollmentStatusPill statusKey={statusKey} />
    </article>
  )
}

export default SltResolvedApplicationCard
