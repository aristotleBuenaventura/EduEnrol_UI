import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  IconBarChart,
  IconCheck,
  IconClock,
  IconX,
} from '../../components/icons/NavIcons.jsx'
import {
  managerReportsApplications,
  managerReportsBarMaxCount,
  managerReportsKpis,
  managerReportsStatusBreakdown,
} from '../../data/managerReportsDummy.js'
import '../../styles/parent-dashboard.css'
import '../../styles/manager-dashboard.css'
import '../../styles/manager-reports-page.css'

const kpiIcons = {
  chart: <IconBarChart width={20} height={20} />,
  check: <IconCheck width={20} height={20} />,
  x: <IconX width={20} height={20} />,
  clock: <IconClock width={20} height={20} />,
}

function appMatchesSearch(app, token) {
  const t = token.trim().toLowerCase()
  if (!t) return true
  const blob = `${app.studentName} ${app.applicationId}`.toLowerCase()
  return blob.includes(t)
}

function ManagerReportsPage() {
  const outlet = useOutletContext()
  const layoutSearch = typeof outlet?.searchQuery === 'string' ? outlet.searchQuery : ''

  const filteredApps = useMemo(
    () => managerReportsApplications.filter((a) => appMatchesSearch(a, layoutSearch)),
    [layoutSearch],
  )

  const detailByStatus = useMemo(() => {
    const map = new Map()
    for (const row of managerReportsStatusBreakdown) {
      map.set(row.statusKey, [])
    }
    for (const app of filteredApps) {
      const list = map.get(app.statusKey)
      if (list) list.push(app)
    }
    return map
  }, [filteredApps])

  return (
    <div className="manager-reports">
      <header className="manager-reports__hero">
        <h1 className="manager-reports__title">Reports</h1>
        <p className="manager-reports__subtitle">Enrolment statistics and performance metrics</p>
      </header>

      <section className="manager-reports__kpis" aria-label="Summary metrics">
        {managerReportsKpis.map((kpi) => (
          <article key={kpi.id} className="manager-reports__kpi">
            <span
              className={`manager-reports__kpi-icon manager-reports__kpi-icon--${kpi.iconTone}`}
              aria-hidden="true"
            >
              {kpiIcons[kpi.iconTone] ?? kpiIcons.chart}
            </span>
            <div>
              <div className="manager-reports__kpi-value">{kpi.value}</div>
              <div className="manager-reports__kpi-title">{kpi.title}</div>
            </div>
          </article>
        ))}
      </section>

      <section className="manager-reports__chart-card" aria-labelledby="reports-chart-heading">
        <div className="manager-reports__chart-head">
          <span className="manager-reports__chart-head-icon" aria-hidden="true">
            <IconBarChart width={18} height={18} />
          </span>
          <h2 id="reports-chart-heading" className="manager-reports__chart-title">
            Applications by Status
          </h2>
        </div>
        <div className="manager-reports__chart-rows">
          {managerReportsStatusBreakdown.map((row) => {
            const pct = Math.round((row.count / managerReportsBarMaxCount) * 100)
            const emphasis = row.count === managerReportsBarMaxCount && row.count > 1
            return (
              <div key={row.statusKey} className="manager-reports__bar-row">
                <span className="manager-reports__bar-label">{row.chartLabel}</span>
                <div className="manager-reports__bar-track">
                  <div
                    className={
                      emphasis
                        ? 'manager-reports__bar-fill manager-reports__bar-fill--emphasis'
                        : 'manager-reports__bar-fill'
                    }
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="manager-reports__bar-count">{row.count}</span>
              </div>
            )
          })}
        </div>
      </section>

      <div className="manager-reports__details" aria-label="Applications by status">
        {managerReportsStatusBreakdown.map((row) => {
          const items = detailByStatus.get(row.statusKey) ?? []
          if (items.length === 0) return null
          return (
            <section key={row.statusKey} className="manager-reports__detail">
              <h3 className="manager-reports__detail-title">
                {row.chartLabel} ({items.length})
              </h3>
              <div className="manager-reports__detail-cards">
                {items.map((app) => (
                  <article key={`${row.statusKey}-${app.applicationId}`} className="manager-reports__detail-card">
                    <p className="manager-reports__detail-name">{app.studentName}</p>
                    <p className="manager-reports__detail-id">{app.applicationId}</p>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {layoutSearch.trim() && filteredApps.length === 0 ? (
        <p className="manager-reports__search-empty">No applications match your search.</p>
      ) : null}
    </div>
  )
}

export default ManagerReportsPage
