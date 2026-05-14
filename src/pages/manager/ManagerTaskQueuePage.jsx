import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import EnrollmentPriorityPill from '../../components/dashboard/EnrollmentPriorityPill.jsx'
import EnrollmentStatusPill from '../../components/dashboard/EnrollmentStatusPill.jsx'
import { IconClipboard, IconClock, IconWarning } from '../../components/icons/NavIcons.jsx'
import { managerTaskQueueItems } from '../../data/managerDashboardDummy.js'
import '../../styles/parent-dashboard.css'
import '../../styles/manager-dashboard.css'
import '../../styles/enrollment-pills.css'
import '../../styles/manager-task-queue.css'

function itemMatchesSearch(item, token) {
  const t = token.trim().toLowerCase()
  if (!t) return true
  const blob = `${item.studentName} ${item.applicationId}`.toLowerCase()
  return blob.includes(t)
}

function ManagerTaskQueuePage() {
  const outlet = useOutletContext()
  const layoutSearch = typeof outlet?.searchQuery === 'string' ? outlet.searchQuery : ''

  const filteredSorted = useMemo(() => {
    return managerTaskQueueItems
      .filter((item) => itemMatchesSearch(item, layoutSearch))
      .slice()
      .sort((a, b) => b.daysOverdue - a.daysOverdue)
  }, [layoutSearch])

  const totalInQueue = filteredSorted.length
  const overdueCount = filteredSorted.filter((item) => item.daysOverdue > 7).length
  const highPriorityCount = filteredSorted.filter((item) => item.priorityKey === 'high').length

  return (
    <div className="manager-task-queue">
      <header className="manager-task-queue__hero">
        <h1 className="manager-task-queue__title">Task Queue</h1>
        <p className="manager-task-queue__subtitle">Prioritised list of applications requiring action.</p>
      </header>

      <section className="manager-task-queue__stats" aria-label="Queue summary">
        <article className="manager-task-queue__stat">
          <span className="manager-task-queue__stat-icon manager-task-queue__stat-icon--clipboard" aria-hidden="true">
            <IconClipboard width={20} height={20} />
          </span>
          <div>
            <div className="manager-task-queue__stat-value">{totalInQueue}</div>
            <div className="manager-task-queue__stat-label">Total in queue</div>
          </div>
        </article>
        <article className="manager-task-queue__stat">
          <span className="manager-task-queue__stat-icon manager-task-queue__stat-icon--warning" aria-hidden="true">
            <IconWarning width={20} height={20} />
          </span>
          <div>
            <div className="manager-task-queue__stat-value">{overdueCount}</div>
            <div className="manager-task-queue__stat-label">Overdue (&gt;7 days)</div>
          </div>
        </article>
        <article className="manager-task-queue__stat">
          <span className="manager-task-queue__stat-icon manager-task-queue__stat-icon--clock" aria-hidden="true">
            <IconClock width={20} height={20} />
          </span>
          <div>
            <div className="manager-task-queue__stat-value">{highPriorityCount}</div>
            <div className="manager-task-queue__stat-label">High / Urgent priority</div>
          </div>
        </article>
      </section>

      <section className="manager-task-queue__panel" aria-labelledby="task-queue-list-heading">
        <h2 id="task-queue-list-heading" className="manager-task-queue__panel-title">
          Queue (oldest first)
        </h2>
        <ul className="manager-task-queue__list">
          {filteredSorted.length === 0 ? (
            <li className="manager-task-queue__list-empty">
              <p className="manager-task-queue__empty">No tasks match your search.</p>
            </li>
          ) : (
            filteredSorted.map((item) => (
              <li key={item.id} className="manager-task-queue__item">
                <div className="manager-task-queue__item-left">
                  <div className="manager-task-queue__item-main">
                    <p className="manager-task-queue__item-name">{item.studentName}</p>
                    <p className="manager-task-queue__item-id">{item.applicationId}</p>
                  </div>
                  <div className="manager-task-queue__item-status">
                    <EnrollmentStatusPill statusKey={item.statusKey} />
                  </div>
                  <div className="manager-task-queue__item-days">
                    <IconWarning width={15} height={15} aria-hidden="true" />
                    <span>{item.daysOverdue} days</span>
                  </div>
                </div>
                <div className="manager-task-queue__item-right">
                  <div className="manager-task-queue__item-priority">
                    <EnrollmentPriorityPill priorityKey={item.priorityKey} />
                  </div>
                  <div className="manager-task-queue__item-action">
                    <button type="button" className="manager-task-queue__review-btn">
                      Review
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  )
}

export default ManagerTaskQueuePage
