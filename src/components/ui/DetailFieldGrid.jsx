/**
 * Simple two-column label / value grid for detail panels.
 *
 * @param {object} props
 * @param {{ id: string, label: string, value: string, valuePrefix?: import('react').ReactNode }[]} props.rows
 */
function DetailFieldGrid({ rows }) {
  return (
    <div className="detail-field-grid">
      {rows.map((row) => (
        <div key={row.id} className="detail-field-grid__cell">
          <div className="detail-field-grid__label">{row.label}</div>
          <div className="detail-field-grid__value">
            {row.valuePrefix ? <span className="detail-field-grid__prefix">{row.valuePrefix}</span> : null}
            {row.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DetailFieldGrid
