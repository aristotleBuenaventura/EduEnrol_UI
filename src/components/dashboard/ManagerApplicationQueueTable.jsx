import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EnrollmentPriorityPill from './EnrollmentPriorityPill.jsx'
import EnrollmentStatusPill from './EnrollmentStatusPill.jsx'
import { enrollmentStatusLabels } from '../../config/enrollmentApplicationUi.js'
import { managerBulkAssigneeOptions } from '../../data/managerDashboardDummy.js'
import { IconChevronDown, IconWarning } from '../icons/NavIcons.jsx'
import '../../styles/enrollment-pills.css'
import '../../styles/manager-application-table.css'

const UNASSIGNED_VALUE = '__unassigned__'

function cloneRows(source) {
  return source.map((r) => ({ ...r }))
}

/**
 * Filterable application queue with row selection, select-all (current filter view),
 * and bulk assignee updates. Remount with a new `key` when replacing `rows` from the server.
 *
 * @param {object} props
 * @param {Array<{ id: string, studentName: string, applicationId: string, yearLevel: string, statusKey: string, assigneeName: string | null, priorityKey: string, updatedLabel: string, updatedNeedsAttention: boolean }>} props.rows
 * @param {string} [props.title]
 * @param {string[]} [props.bulkAssignees] — names shown in “Assign N selected”
 */
function ManagerApplicationQueueTable({
  rows,
  title = 'Application Queue',
  bulkAssignees = managerBulkAssigneeOptions,
}) {
  const [localRows, setLocalRows] = useState(() => cloneRows(rows))
  const [statusFilter, setStatusFilter] = useState('all')
  const [assigneeFilter, setAssigneeFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const [bulkOpen, setBulkOpen] = useState(false)
  const selectAllRef = useRef(null)
  const bulkWrapRef = useRef(null)

  const setStatusFilterAndClearSelection = useCallback((value) => {
    setStatusFilter(value)
    setSelectedIds(new Set())
  }, [])

  const setAssigneeFilterAndClearSelection = useCallback((value) => {
    setAssigneeFilter(value)
    setSelectedIds(new Set())
  }, [])

  const hasUnassigned = useMemo(() => localRows.some((r) => r.assigneeName == null), [localRows])

  const statusOptions = useMemo(() => {
    const keys = [...new Set(localRows.map((r) => r.statusKey))]
    return [
      { value: 'all', label: 'All Statuses' },
      ...keys.map((k) => ({ value: k, label: enrollmentStatusLabels[k] ?? k })),
    ]
  }, [localRows])

  const assigneeOptions = useMemo(() => {
    const names = [...new Set(localRows.map((r) => r.assigneeName).filter(Boolean))].sort()
    const opts = [{ value: 'all', label: 'All Assignees' }]
    if (hasUnassigned) opts.push({ value: UNASSIGNED_VALUE, label: 'Unassigned' })
    names.forEach((n) => opts.push({ value: n, label: n }))
    return opts
  }, [localRows, hasUnassigned])

  const filteredRows = useMemo(() => {
    return localRows.filter((r) => {
      if (statusFilter !== 'all' && r.statusKey !== statusFilter) return false
      if (assigneeFilter === 'all') return true
      if (assigneeFilter === UNASSIGNED_VALUE) return r.assigneeName == null
      return r.assigneeName === assigneeFilter
    })
  }, [localRows, statusFilter, assigneeFilter])

  const allFilteredSelected =
    filteredRows.length > 0 && filteredRows.every((r) => selectedIds.has(r.id))

  const selectedCount = selectedIds.size

  useEffect(() => {
    const el = selectAllRef.current
    if (!el) return
    const n = filteredRows.length
    const c = filteredRows.filter((r) => selectedIds.has(r.id)).length
    el.indeterminate = n > 0 && c > 0 && c < n
  }, [filteredRows, selectedIds])

  useEffect(() => {
    if (!bulkOpen) return
    function handlePointerDown(e) {
      if (bulkWrapRef.current && !bulkWrapRef.current.contains(e.target)) {
        setBulkOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [bulkOpen])

  const toggleSelectAllFiltered = useCallback(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allFilteredSelected) {
        filteredRows.forEach((r) => next.delete(r.id))
      } else {
        filteredRows.forEach((r) => next.add(r.id))
      }
      return next
    })
  }, [allFilteredSelected, filteredRows])

  const toggleRow = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const assignSelectedTo = useCallback((name) => {
    setLocalRows((prev) =>
      prev.map((r) => (selectedIds.has(r.id) ? { ...r, assigneeName: name } : r)),
    )
    setSelectedIds(new Set())
    setBulkOpen(false)
  }, [selectedIds])

  return (
    <div className="manager-app-table-wrap">
      <div className="manager-app-table__title-row">
        <h2 className="manager-app-table__heading">{title}</h2>
        <div className="manager-app-table__title-actions">
          {selectedCount > 0 ? (
            <div className="manager-app-table__bulk" ref={bulkWrapRef}>
              <button
                type="button"
                className="manager-app-table__bulk-btn"
                aria-expanded={bulkOpen}
                aria-haspopup="listbox"
                aria-label={`Assign ${selectedCount} selected applications`}
                onClick={() => setBulkOpen((o) => !o)}
              >
                Assign {selectedCount} selected
                <IconChevronDown className="manager-app-table__bulk-chevron" width={14} height={14} aria-hidden="true" />
              </button>
              {bulkOpen ? (
                <ul className="manager-app-table__bulk-menu" role="listbox">
                  {bulkAssignees.map((name) => (
                    <li key={name} role="presentation">
                      <button
                        type="button"
                        className="manager-app-table__bulk-option"
                        role="option"
                        onClick={() => assignSelectedTo(name)}
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
          <div className="manager-app-table__filters">
            <label className="manager-app-table__filter">
              <span className="visually-hidden">Filter by status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilterAndClearSelection(e.target.value)}
                aria-label="Filter by status"
              >
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="manager-app-table__filter">
              <span className="visually-hidden">Filter by assignee</span>
              <select
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilterAndClearSelection(e.target.value)}
                aria-label="Filter by assignee"
              >
                {assigneeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="manager-app-table__scroll">
        <table className="manager-app-table">
          <thead>
            <tr>
              <th className="manager-app-table__th manager-app-table__th--check" scope="col">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  className="manager-app-table__checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleSelectAllFiltered}
                  disabled={filteredRows.length === 0}
                  aria-label="Select all applications in the current list"
                />
              </th>
              <th className="manager-app-table__th" scope="col">
                Application
              </th>
              <th className="manager-app-table__th" scope="col">
                Status
              </th>
              <th className="manager-app-table__th" scope="col">
                Assignee
              </th>
              <th className="manager-app-table__th" scope="col">
                Priority
              </th>
              <th className="manager-app-table__th" scope="col">
                Updated
              </th>
              <th className="manager-app-table__th manager-app-table__th--action" scope="col">
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td className="manager-app-table__td manager-app-table__td--check">
                  <input
                    type="checkbox"
                    className="manager-app-table__checkbox"
                    checked={selectedIds.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`Select ${row.studentName}`}
                  />
                </td>
                <td className="manager-app-table__td">
                  <div className="manager-app-table__app">
                    <span className="manager-app-table__app-name">{row.studentName}</span>
                    <span className="manager-app-table__app-meta">
                      {row.applicationId} <span aria-hidden="true">·</span> {row.yearLevel}
                    </span>
                  </div>
                </td>
                <td className="manager-app-table__td">
                  <EnrollmentStatusPill statusKey={row.statusKey} />
                </td>
                <td className="manager-app-table__td">
                  {row.assigneeName ? (
                    <span className="manager-app-table__assignee">{row.assigneeName}</span>
                  ) : (
                    <span className="manager-app-table__assignee manager-app-table__assignee--unassigned">
                      Unassigned
                    </span>
                  )}
                </td>
                <td className="manager-app-table__td">
                  <EnrollmentPriorityPill priorityKey={row.priorityKey} />
                </td>
                <td className="manager-app-table__td">
                  <span
                    className={
                      row.updatedNeedsAttention
                        ? 'manager-app-table__updated manager-app-table__updated--warn'
                        : 'manager-app-table__updated'
                    }
                  >
                    {row.updatedNeedsAttention ? (
                      <IconWarning className="manager-app-table__warn-icon" width={14} height={14} aria-hidden="true" />
                    ) : null}
                    {row.updatedLabel}
                  </span>
                </td>
                <td className="manager-app-table__td manager-app-table__td--action">
                  <button type="button" className="manager-app-table__view-btn">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManagerApplicationQueueTable
