import DashboardPanel from './DashboardPanel.jsx'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {{ label: string, value: number }[]} props.bars
 * @param {number} [props.max]
 */
function BarChartPanel({ title, bars, max }) {
  const computedMax = max ?? Math.max(1, ...bars.map((bar) => bar.value))

  return (
    <DashboardPanel title={title} className="dashboard-panel--tight">
      <div className="mini-bar-chart" role="img" aria-label={`${title} chart`}>
        <div className="mini-bar-chart__axis">
          {[...Array(5)].map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="mini-bar-chart__bars">
          {bars.map((bar) => (
            <div key={bar.label} className="mini-bar-chart__bar-group">
              <div className="mini-bar-chart__bar-wrap">
                <div className="mini-bar-chart__bar" style={{ height: `${(bar.value / computedMax) * 100}%` }} />
              </div>
              <span className="mini-bar-chart__label">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  )
}

export default BarChartPanel
