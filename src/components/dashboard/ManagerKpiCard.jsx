import '../../styles/manager-kpi-workload.css'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string|number} props.value
 * @param {string} props.hint
 * @param {React.ReactNode} props.icon
 */
function ManagerKpiCard({ title, value, hint, icon }) {
  return (
    <article className="manager-kpi-card">
      <div className="manager-kpi-card__top">
        <span className="manager-kpi-card__title">{title}</span>
        <span className="manager-kpi-card__icon" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div className="manager-kpi-card__value">{value}</div>
      <p className="manager-kpi-card__hint">{hint}</p>
    </article>
  )
}

export default ManagerKpiCard
