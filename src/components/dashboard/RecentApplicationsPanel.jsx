import DashboardPanel from './DashboardPanel.jsx'
import StatusPill from './StatusPill.jsx'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.actionTo]
 * @param {{ id: string, studentName: string, meta: string, statusLabel: string, statusTone: 'approved'|'waitlisted'|'pending'|'review'|'declined'|'neutral', date: string }[]} props.items
 */
function RecentApplicationsPanel({ title, actionTo, items }) {
  return (
    <DashboardPanel title={title} actionTo={actionTo}>
      <div className="recent-applications">
        {items.map((item) => (
          <article key={item.id} className="recent-applications__row">
            <div>
              <h3>{item.studentName}</h3>
              <p>{item.meta}</p>
            </div>
            <div className="recent-applications__status">
              <StatusPill label={item.statusLabel} tone={item.statusTone} />
              <span>{item.date}</span>
            </div>
          </article>
        ))}
      </div>
    </DashboardPanel>
  )
}

export default RecentApplicationsPanel
