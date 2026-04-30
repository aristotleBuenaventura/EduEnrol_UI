/**
 * @param {object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.title
 * @param {string} props.statusText
 * @param {'zoning'|'capacity'|'completeness'|'routing'} [props.tone]
 */
function RuleCategoryCard({ icon, title, statusText, tone = 'zoning' }) {
  return (
    <article className={['rule-category-card', `tone-${tone}`].join(' ')}>
      <span className="rule-category-card__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="rule-category-card__content">
        <h3>{title}</h3>
        <p>{statusText}</p>
      </div>
    </article>
  )
}

export default RuleCategoryCard
