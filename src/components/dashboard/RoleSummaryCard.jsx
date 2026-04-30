/**
 * Reusable role summary card for admin/staff screens.
 *
 * @param {object} props
 * @param {string|number} props.count
 * @param {string} props.label
 * @param {'parent'|'slt'|'manager'|'admin'} [props.tone]
 */
function RoleSummaryCard({ count, label, tone = 'parent' }) {
  return (
    <article className={['role-summary-card', `tone-${tone}`].join(' ')}>
      <span className="role-summary-card__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3 18.5 5.8v5.5c0 4.1-2.8 7.9-6.5 9.3-3.7-1.4-6.5-5.2-6.5-9.3V5.8L12 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="role-summary-card__content">
        <strong>{count}</strong>
        <span>{label}</span>
      </div>
    </article>
  )
}

export default RoleSummaryCard
