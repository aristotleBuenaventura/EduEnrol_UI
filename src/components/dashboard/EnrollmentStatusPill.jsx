import { enrollmentStatusLabels } from '../../config/enrollmentApplicationUi.js'
import '../../styles/enrollment-pills.css'

const KNOWN = new Set(Object.keys(enrollmentStatusLabels))

/**
 * @param {object} props
 * @param {keyof typeof enrollmentStatusLabels | string} props.statusKey
 * @param {string} [props.label] — override display text (defaults from config)
 */
function EnrollmentStatusPill({ statusKey, label }) {
  const safeKey = KNOWN.has(statusKey) ? statusKey : 'unknown'
  const text = label ?? enrollmentStatusLabels[statusKey] ?? String(statusKey ?? '—')
  return (
    <span className={`enrollment-status-pill enrollment-status-pill--${safeKey}`}>{text}</span>
  )
}

export default EnrollmentStatusPill
