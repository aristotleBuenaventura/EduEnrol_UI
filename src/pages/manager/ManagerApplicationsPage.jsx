import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ManagerApplicationsTable from '../../components/dashboard/ManagerApplicationsTable.jsx'
import { IconSearch } from '../../components/icons/NavIcons.jsx'
import { managerApplicationsStatusFilters } from '../../config/managerApplicationsFilters.js'
import { managerApplicationRecords } from '../../data/managerDashboardDummy.js'
import '../../styles/parent-dashboard.css'
import '../../styles/manager-dashboard.css'
import '../../styles/manager-applications-page.css'

function rowMatchesSearchToken(row, token) {
  const t = token.trim().toLowerCase()
  if (!t) return true
  const blob = `${row.studentName} ${row.applicationId} ${row.yearLevel}`.toLowerCase()
  return blob.includes(t)
}

function ManagerApplicationsPage() {
  const outlet = useOutletContext()
  const layoutSearch = typeof outlet?.searchQuery === 'string' ? outlet.searchQuery : ''
  const [detailSearch, setDetailSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredRows = useMemo(() => {
    return managerApplicationRecords.filter((row) => {
      if (statusFilter !== 'all' && row.statusKey !== statusFilter) return false
      if (!rowMatchesSearchToken(row, layoutSearch)) return false
      if (!rowMatchesSearchToken(row, detailSearch)) return false
      return true
    })
  }, [layoutSearch, detailSearch, statusFilter])

  return (
    <div className="manager-apps-page">
      <header className="manager-apps-page__hero">
        <h1 className="manager-apps-page__title">Applications</h1>
        <p className="manager-apps-page__subtitle">View and manage all enrolment applications.</p>
      </header>

      <div className="manager-apps-page__toolbar">
        <label className="manager-apps-page__search">
          <IconSearch className="manager-apps-page__search-icon" width={18} height={18} aria-hidden="true" />
          <span className="visually-hidden">Search by name or application ID</span>
          <input
            type="search"
            placeholder="Search by name or ID..."
            value={detailSearch}
            onChange={(e) => setDetailSearch(e.target.value)}
            aria-label="Search by name or application ID"
          />
        </label>
        <label className="manager-apps-page__filter">
          <span className="visually-hidden">Filter by status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            {managerApplicationsStatusFilters.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ManagerApplicationsTable rows={filteredRows} />
    </div>
  )
}

export default ManagerApplicationsPage
