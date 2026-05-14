/**
 * Centered empty state inside a panel (icons + title + body).
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.icon
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.className]
 */
function PanelEmptyState({ icon, title, description, className = '' }) {
  return (
    <div className={['panel-empty-state', className].filter(Boolean).join(' ')}>
      <span className="panel-empty-state__icon" aria-hidden="true">
        {icon}
      </span>
      <h2 className="panel-empty-state__title">{title}</h2>
      <p className="panel-empty-state__desc">{description}</p>
    </div>
  )
}

export default PanelEmptyState
