import DashboardPanel from './DashboardPanel.jsx'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} [props.action]
 * @param {{ id: string, studentName: string, issueCountLabel: string, violations: { id: string, message: string, tone: 'warning'|'critical'|'neutral' }[] }[]} props.items
 */
function RuleViolationsPanel({ title, action, items }) {
  return (
    <DashboardPanel title={title} action={action}>
      <div className="rule-violations">
        {items.map((item) => (
          <article key={item.id} className="rule-violations__row">
            <header>
              <h3>{item.studentName}</h3>
              <span>{item.issueCountLabel}</span>
            </header>
            <ul>
              {item.violations.map((violation) => (
                <li key={violation.id}>
                  <span className={['rule-violations__dot', `tone-${violation.tone}`].join(' ')} aria-hidden="true" />
                  <span>{violation.message}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </DashboardPanel>
  )
}

export default RuleViolationsPanel
