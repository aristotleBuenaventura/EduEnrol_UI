/**
 * Reusable KPI card for admin and other staff dashboards.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {{ direction: 'up' | 'down', value: string } | null} [props.trend]
 * @param {React.ReactNode} props.icon
 */
function AdminMetricCard({ label, value, trend = null, icon }) {
  const trendClass = trend ? `is-${trend.direction}` : ''

  return (
    <article className="admin-metric-card">
      <div className="admin-metric-card__content">
        <p className="admin-metric-card__label">{label}</p>
        <p className="admin-metric-card__value">{value}</p>
        {trend ? <p className={['admin-metric-card__trend', trendClass].join(' ')}>{trend.value}</p> : null}
      </div>
      <div className="admin-metric-card__icon" aria-hidden="true">
        {icon}
      </div>
    </article>
  )
}

export default AdminMetricCard
