import DashboardPanel from './DashboardPanel.jsx'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {{ label: string, value: number, color: string }[]} props.segments
 */
function DonutBreakdownPanel({ title, segments }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  const { stops } = segments.reduce(
    (acc, segment) => {
      const start = total > 0 ? (acc.running / total) * 100 : 0
      const nextRunning = acc.running + segment.value
      const end = total > 0 ? (nextRunning / total) * 100 : 0
      return {
        running: nextRunning,
        stops: [...acc.stops, `${segment.color} ${start}% ${end}%`],
      }
    },
    { running: 0, stops: [] },
  )

  const donutStyle = {
    background: `conic-gradient(${stops.join(', ')})`,
  }

  return (
    <DashboardPanel title={title} className="dashboard-panel--tight">
      <div className="donut-breakdown">
        <div className="donut-breakdown__chart" style={donutStyle} aria-label={`${title} chart`} role="img">
          <div className="donut-breakdown__hole" />
        </div>
        <ul className="donut-breakdown__legend">
          {segments.map((segment) => (
            <li key={segment.label}>
              <span className="donut-breakdown__dot" style={{ backgroundColor: segment.color }} aria-hidden="true" />
              <span>{segment.label}</span>
              <strong>{segment.value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </DashboardPanel>
  )
}

export default DonutBreakdownPanel
