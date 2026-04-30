import { Link } from 'react-router-dom'

/**
 * Generic dashboard panel wrapper for role dashboards.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} [props.action]
 * @param {string} [props.actionLabel]
 * @param {string} [props.actionTo]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
function DashboardPanel({ title, action, actionLabel, actionTo, className = '', children }) {
  return (
    <section className={['dashboard-panel', className].filter(Boolean).join(' ')}>
      <header className="dashboard-panel__header">
        <h2>{title}</h2>
        {action ??
          (actionTo ? (
            <Link to={actionTo} className="dashboard-panel__action">
              {actionLabel ?? 'View All'}
            </Link>
          ) : null)}
      </header>
      <div className="dashboard-panel__body">{children}</div>
    </section>
  )
}

export default DashboardPanel
