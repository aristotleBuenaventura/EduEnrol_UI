import '../../styles/manager-kpi-workload.css'

/**
 * @param {object} props
 * @param {string} props.fullName
 * @param {string} props.email
 * @param {string} props.initials
 * @param {number} props.activeAssignments
 * @param {number} props.progressPercent — bar width 0–100
 */
function SltWorkloadMemberCard({ fullName, email, initials, activeAssignments, progressPercent }) {
  const width = Math.min(100, Math.max(0, progressPercent))
  return (
    <article className="slt-workload-card">
      <div className="slt-workload-card__header">
        <div className="slt-workload-card__avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <h3 className="slt-workload-card__name">{fullName}</h3>
          <p className="slt-workload-card__email">{email}</p>
        </div>
      </div>
      <p className="slt-workload-card__assignments">Active assignments {activeAssignments}</p>
      <div className="slt-workload-card__track" role="presentation">
        <div className="slt-workload-card__fill" style={{ width: `${width}%` }} />
      </div>
    </article>
  )
}

export default SltWorkloadMemberCard
