/**
 * @param {object} props
 * @param {string} props.label
 * @param {'approved'|'waitlisted'|'pending'|'review'|'declined'|'neutral'} [props.tone]
 */
function StatusPill({ label, tone = 'neutral' }) {
  return <span className={['status-pill', `tone-${tone}`].join(' ')}>{label}</span>
}

export default StatusPill
