import { Link } from 'react-router-dom'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.viewAllTo]
 * @param {string} [props.viewAllLabel]
 * @param {React.ReactNode} props.children
 */
function ApplicationListPanel({ title, viewAllTo, viewAllLabel = 'View All', children }) {
  return (
    <section className="application-list-panel">
      <header className="application-list-panel__header">
        <h2>{title}</h2>
        {viewAllTo ? (
          <Link to={viewAllTo} className="application-list-panel__view-all">
            {viewAllLabel}
          </Link>
        ) : null}
      </header>
      <div className="application-list-panel__list">{children}</div>
    </section>
  )
}

export default ApplicationListPanel
