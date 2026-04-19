import { Link } from 'react-router-dom'
import { IconArrowRight } from '../icons/NavIcons.jsx'

/**
 * @param {object} props
 * @param {string} props.studentName
 * @param {string} props.statusLabel
 * @param {string} props.referenceCode
 * @param {string} props.yearLevel
 * @param {string} props.hint
 * @param {number} props.progressPercent — 0–100
 * @param {string} props.continueTo — route for primary action
 * @param {string} [props.continueLabel]
 */
function ApplicationRow({
  studentName,
  statusLabel,
  referenceCode,
  yearLevel,
  hint,
  progressPercent,
  continueTo,
  continueLabel = 'Continue',
}) {
  const clamped = Math.min(100, Math.max(0, progressPercent))

  return (
    <article className="application-row">
      <div className="application-row__main">
        <div className="application-row__title-line">
          <h3 className="application-row__name">{studentName}</h3>
          <span className="application-row__badge">{statusLabel}</span>
        </div>
        <p className="application-row__meta">
          {referenceCode} <span aria-hidden="true">•</span> {yearLevel}
        </p>
        <p className="application-row__hint">{hint}</p>
        <div className="application-row__progress" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
          <div className="application-row__progress-track">
            <div className="application-row__progress-fill" style={{ width: `${clamped}%` }} />
          </div>
          <span className="application-row__progress-label">{clamped}%</span>
        </div>
      </div>
      <div className="application-row__action">
        <Link to={continueTo} className="application-row__continue">
          {continueLabel}
          <IconArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default ApplicationRow
