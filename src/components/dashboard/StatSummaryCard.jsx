/**
 * @param {object} props
 * @param {string|number} props.value
 * @param {string} props.label
 * @param {React.ReactNode} props.icon
 * @param {'mint' | 'sky' | 'success'} [props.tone]
 */
function StatSummaryCard({ value, label, icon, tone = 'mint' }) {
  return (
    <article className={`stat-summary-card tone-${tone}`}>
      <div className="stat-summary-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="stat-summary-card__body">
        <div className="stat-summary-card__value">{value}</div>
        <div className="stat-summary-card__label">{label}</div>
      </div>
    </article>
  )
}

export default StatSummaryCard
