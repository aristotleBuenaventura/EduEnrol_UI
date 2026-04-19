/**
 * @param {object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.body
 * @param {string} props.actionLabel
 * @param {string} [props.actionHref]
 * @param {() => void} [props.onAction]
 * @param {'info' | 'documents'} [props.variant]
 */
function InfoActionCard({ icon, body, actionLabel, actionHref, onAction, variant = 'info' }) {
  const className = ['info-action-card', `variant-${variant}`].join(' ')

  const content = (
    <>
      <div className="info-action-card__icon" aria-hidden="true">
        {icon}
      </div>
      <p className="info-action-card__body">{body}</p>
      {actionHref ? (
        <a href={actionHref} className="info-action-card__btn">
          {actionLabel}
        </a>
      ) : (
        <button type="button" className="info-action-card__btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </>
  )

  return <article className={className}>{content}</article>
}

export default InfoActionCard
