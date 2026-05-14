import '../../styles/manager-assignment-slt-card.css'

/**
 * SLT member summary on the Assignments tab — shows “N active” and a progress bar.
 *
 * @param {object} props
 * @param {string} props.fullName
 * @param {string} props.initials
 * @param {number} props.activeCount
 * @param {number} props.progressPercent — 0–100
 */
function ManagerAssignmentSltCard({ fullName, initials, activeCount, progressPercent }) {
  const width = Math.min(100, Math.max(0, progressPercent))
  return (
    <article className="manager-assign-slt-card">
      <div className="manager-assign-slt-card__header">
        <div className="manager-assign-slt-card__avatar" aria-hidden="true">
          {initials}
        </div>
        <h3 className="manager-assign-slt-card__name">{fullName}</h3>
      </div>
      <p className="manager-assign-slt-card__active">{activeCount} active</p>
      <div className="manager-assign-slt-card__track" role="presentation">
        <div className="manager-assign-slt-card__fill" style={{ width: `${width}%` }} />
      </div>
    </article>
  )
}

export default ManagerAssignmentSltCard
