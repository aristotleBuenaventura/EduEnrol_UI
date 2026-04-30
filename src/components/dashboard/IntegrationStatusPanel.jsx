import DashboardPanel from './DashboardPanel.jsx'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {{ id: string, name: string, description: string, statusLabel: string, statusTone: 'connected'|'syncing' }[]} props.items
 * @param {string} [props.lastSync]
 */
function IntegrationStatusPanel({ title, subtitle, items, lastSync }) {
  return (
    <DashboardPanel title={title} className="dashboard-panel--tight">
      <p className="integration-panel__subtitle">{subtitle}</p>
      <div className="integration-panel__list">
        {items.map((item) => (
          <article key={item.id} className="integration-panel__row">
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <span className={['integration-panel__status', `tone-${item.statusTone}`].join(' ')}>{item.statusLabel}</span>
          </article>
        ))}
      </div>
      {lastSync ? <p className="integration-panel__sync-time">Last sync: {lastSync}</p> : null}
    </DashboardPanel>
  )
}

export default IntegrationStatusPanel
