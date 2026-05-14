import { useCallback, useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ManagerAssignmentSltCard from '../../components/dashboard/ManagerAssignmentSltCard.jsx'
import EnrollmentStatusPill from '../../components/dashboard/EnrollmentStatusPill.jsx'
import { IconChevronDown, IconUserPlus, IconUsers } from '../../components/icons/NavIcons.jsx'
import {
  managerAssignmentsInitialMembers,
  managerAssignmentsInitialUnassigned,
  managerAssignmentsProgressCap,
} from '../../data/managerAssignmentsDummy.js'
import '../../styles/parent-dashboard.css'
import '../../styles/manager-dashboard.css'
import '../../styles/enrollment-pills.css'
import '../../styles/manager-assignments-page.css'

function cloneMembers(m) {
  return m.map((row) => ({ ...row }))
}

function cloneUnassigned(rows) {
  return rows.map((row) => ({ ...row }))
}

function rowMatchesSearch(row, token) {
  const t = token.trim().toLowerCase()
  if (!t) return true
  const blob = `${row.studentName} ${row.applicationId}`.toLowerCase()
  return blob.includes(t)
}

function ManagerAssignmentsPage() {
  const outlet = useOutletContext()
  const layoutSearch = typeof outlet?.searchQuery === 'string' ? outlet.searchQuery : ''

  const [members, setMembers] = useState(() => cloneMembers(managerAssignmentsInitialMembers))
  const [unassigned, setUnassigned] = useState(() => cloneUnassigned(managerAssignmentsInitialUnassigned))
  const [openAssignId, setOpenAssignId] = useState(null)

  const filteredUnassigned = useMemo(
    () => unassigned.filter((row) => rowMatchesSearch(row, layoutSearch)),
    [unassigned, layoutSearch],
  )

  useEffect(() => {
    if (openAssignId == null) return
    function handlePointerDown(event) {
      const roots = document.querySelectorAll('[data-assign-menu-root]')
      for (const root of roots) {
        if (root.contains(event.target)) return
      }
      setOpenAssignId(null)
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [openAssignId])

  const handleAssign = useCallback((rowId, assigneeFullName) => {
    setUnassigned((prev) => prev.filter((r) => r.id !== rowId))
    setMembers((prev) =>
      prev.map((m) =>
        m.fullName === assigneeFullName ? { ...m, activeCount: m.activeCount + 1 } : m,
      ),
    )
    setOpenAssignId(null)
  }, [])

  const assigneeNames = useMemo(() => members.map((m) => m.fullName), [members])

  return (
    <div className="manager-assign-page">
      <header className="manager-assign-page__hero">
        <h1 className="manager-assign-page__title">Assignments</h1>
        <p className="manager-assign-page__subtitle">Assign applications to SLT members for review</p>
      </header>

      <div className="manager-assign-page__slt-row" aria-label="SLT members">
        {members.map((m) => (
          <ManagerAssignmentSltCard
            key={m.id}
            fullName={m.fullName}
            initials={m.initials}
            activeCount={m.activeCount}
            progressPercent={Math.min(100, Math.round((m.activeCount / managerAssignmentsProgressCap) * 100))}
          />
        ))}
      </div>

      <section className="manager-assign-page__panel" aria-labelledby="unassigned-heading">
        <div className="manager-assign-page__panel-head">
          <span className="manager-assign-page__panel-icon" aria-hidden="true">
            <IconUserPlus width={18} height={18} />
          </span>
          <h2 id="unassigned-heading" className="manager-assign-page__panel-title">
            Unassigned Applications ({unassigned.length})
          </h2>
        </div>

        {unassigned.length === 0 ? (
          <div className="manager-assign-page__empty">
            <div className="manager-assign-page__empty-icon" aria-hidden="true">
              <IconUsers width={26} height={26} />
            </div>
            <p className="manager-assign-page__empty-text">All applications have been assigned</p>
          </div>
        ) : filteredUnassigned.length === 0 ? (
          <div className="manager-assign-page__empty">
            <p className="manager-assign-page__empty-text">No applications match your search.</p>
          </div>
        ) : (
          <ul className="manager-assign-page__list">
            {filteredUnassigned.map((row) => (
              <li key={row.id} className="manager-assign-page__row">
                <div className="manager-assign-page__row-main">
                  <p className="manager-assign-page__row-name">{row.studentName}</p>
                  <p className="manager-assign-page__row-id">{row.applicationId}</p>
                  <div className="manager-assign-page__row-meta">
                    <EnrollmentStatusPill statusKey={row.statusKey} />
                  </div>
                </div>
                <div className="manager-assign-page__assign-wrap" data-assign-menu-root>
                  <button
                    type="button"
                    className="manager-assign-page__assign-btn"
                    aria-expanded={openAssignId === row.id}
                    aria-haspopup="listbox"
                    aria-label={`Assign ${row.studentName}`}
                    onClick={() => setOpenAssignId((cur) => (cur === row.id ? null : row.id))}
                  >
                    Assign to...
                    <IconChevronDown width={14} height={14} aria-hidden="true" />
                  </button>
                  {openAssignId === row.id ? (
                    <ul className="manager-assign-page__assign-menu" role="listbox">
                      {assigneeNames.map((name) => (
                        <li key={name} role="presentation">
                          <button
                            type="button"
                            className="manager-assign-page__assign-option"
                            role="option"
                            onClick={() => handleAssign(row.id, name)}
                          >
                            {name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default ManagerAssignmentsPage
