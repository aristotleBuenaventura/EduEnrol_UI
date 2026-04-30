/**
 * @param {object} props
 * @param {string} props.id
 * @param {React.ReactNode} props.icon
 * @param {string} props.title
 * @param {'zoning'|'capacity'|'completeness'|'routing'} [props.tone]
 * @param {string} props.category
 * @param {number} props.priority
 * @param {string} props.description
 * @param {string} props.condition
 * @param {string} props.action
 * @param {boolean} [props.isActive]
 * @param {boolean} [props.isEditing]
 * @param {() => void} [props.onEdit]
 * @param {() => void} [props.onToggle]
 * @param {() => void} [props.onSave]
 * @param {(field: 'description'|'condition'|'action', value: string) => void} [props.onFieldChange]
 */
function RuleConfigCard({
  id,
  icon,
  title,
  tone = 'routing',
  category,
  priority,
  description,
  condition,
  action,
  isActive = true,
  isEditing = false,
  onEdit,
  onToggle,
  onSave,
  onFieldChange,
}) {
  return (
    <article
      className={['rule-config-card', `tone-${tone}`, isEditing ? 'is-editing' : '', !isActive ? 'is-inactive' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <header className="rule-config-card__header">
        <div className="rule-config-card__identity">
          <span className="rule-config-card__icon" aria-hidden="true">
            {icon}
          </span>
          <div className="rule-config-card__heading">
            <div className="rule-config-card__title-row">
              <h3>{title}</h3>
              {!isEditing ? (
                <>
                  <span className="rule-config-card__tag">{category}</span>
                  <span className="rule-config-card__tag">Priority: {priority}</span>
                </>
              ) : null}
            </div>
            {!isEditing ? <p>{description}</p> : null}
          </div>
        </div>
        <div className="rule-config-card__controls">
          <button
            type="button"
            className={['rule-config-card__edit-btn', isEditing ? 'is-active' : ''].join(' ')}
            aria-label={isEditing ? `Editing ${title}` : `Edit ${title}`}
            onClick={onEdit}
            disabled={!isActive}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20h8M16 4l4 4-9.5 9.5L6 18l.5-4.5L16 4Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={['rule-config-card__toggle', isActive ? 'is-on' : 'is-off'].join(' ')}
            aria-label={isActive ? `Disable ${title}` : `Enable ${title}`}
            onClick={onToggle}
          >
            <span />
          </button>
        </div>
      </header>

      {!isEditing ? (
        <div className="rule-config-card__logic-row">
          <div className="rule-config-card__logic-box">
            <span>Condition: </span>
            {condition}
          </div>
          <div className="rule-config-card__logic-box">
            <span>Action: </span>
            {action}
          </div>
        </div>
      ) : (
        <div className="rule-config-card__editor">
          <label htmlFor={`${id}-description`} className="rule-config-card__edit-label sr-only">
            Rule description
          </label>
          <textarea
            id={`${id}-description`}
            value={description}
            onChange={(event) => onFieldChange?.('description', event.target.value)}
            className="rule-config-card__textarea"
          />

          <div className="rule-config-card__editor-grid">
            <div className="rule-config-card__editor-field">
              <label htmlFor={`${id}-condition`}>Condition</label>
              <input
                id={`${id}-condition`}
                type="text"
                value={condition}
                onChange={(event) => onFieldChange?.('condition', event.target.value)}
              />
            </div>
            <div className="rule-config-card__editor-field">
              <label htmlFor={`${id}-action`}>Action</label>
              <input
                id={`${id}-action`}
                type="text"
                value={action}
                onChange={(event) => onFieldChange?.('action', event.target.value)}
              />
            </div>
          </div>

          <button type="button" className="rule-config-card__save-btn" onClick={onSave}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 4h11l3 3v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8 4v5h8V4M8 20v-5h8v5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <span>Save</span>
          </button>
        </div>
      )}
    </article>
  )
}

export default RuleConfigCard
