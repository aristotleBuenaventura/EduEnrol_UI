import { enrollmentPriorityLabels } from '../../config/enrollmentApplicationUi.js'
import '../../styles/enrollment-pills.css'

const KNOWN = new Set(Object.keys(enrollmentPriorityLabels))

/**
 * @param {object} props
 * @param {keyof typeof enrollmentPriorityLabels | string} props.priorityKey
 * @param {string} [props.label]
 */
function EnrollmentPriorityPill({ priorityKey, label }) {
  const safeKey = KNOWN.has(priorityKey) ? priorityKey : 'unknown'
  const text = label ?? enrollmentPriorityLabels[priorityKey] ?? String(priorityKey ?? '—')
  return (
    <span className={`enrollment-priority-pill enrollment-priority-pill--${safeKey}`}>{text}</span>
  )
}

export default EnrollmentPriorityPill
