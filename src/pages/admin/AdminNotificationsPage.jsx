import { createElement, useCallback, useState } from 'react'

const NOTIFICATION_OPTIONS = [
  {
    id: 'application-submitted',
    title: 'Application submitted',
    description: 'Notify admin when a new application is submitted',
    defaultEnabled: true,
  },
  {
    id: 'review-completed',
    title: 'Review completed',
    description: 'Notify school administrator when SLT completes a review',
    defaultEnabled: true,
  },
  {
    id: 'decision-made',
    title: 'Decision made',
    description: 'Notify parent when a decision is finalised',
    defaultEnabled: true,
  },
  {
    id: 'overdue-reminder',
    title: 'Overdue reminder',
    description: 'Alert when applications exceed SLA',
    defaultEnabled: true,
  },
]

function IconEnvelope(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path d="M4 6h16v12H4V6Z" strokeLinejoin="round" />
      <path d="m4 7 8 5 8-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconCheckCircle(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2L15.2 9.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMessage(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5H5l-3 3v-12A8.5 8.5 0 0 1 12.5 4H13a8 8 0 0 1 8 8Z" strokeLinejoin="round" />
      <path d="M8.5 10.5h7M8.5 14h4" strokeLinecap="round" />
    </svg>
  )
}

function IconBellSmall(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7" strokeLinejoin="round" />
      <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" strokeLinecap="round" />
    </svg>
  )
}

const iconByOptionId = {
  'application-submitted': IconEnvelope,
  'review-completed': IconCheckCircle,
  'decision-made': IconMessage,
  'overdue-reminder': IconBellSmall,
}

function NotificationRow({ id, title, description, checked, onCheckedChange, icon: Icon }) {
  const toggle = useCallback(() => {
    onCheckedChange(!checked)
  }, [checked, onCheckedChange])

  return (
    <article className="admin-notifications__option">
      <div className="admin-notifications__option-main">
        <span className="admin-notifications__icon-wrap" aria-hidden>
          {createElement(Icon)}
        </span>
        <div className="admin-notifications__option-text">
          <p className="admin-notifications__option-title" id={`${id}-label`}>
            {title}
          </p>
          <p className="admin-notifications__option-desc" id={`${id}-hint`}>
            {description}
          </p>
        </div>
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-hint`}
        className={`admin-notifications__switch${checked ? ' is-on' : ''}`}
        onClick={toggle}
      >
        <span className="admin-notifications__switch-thumb" />
        <span className="admin-notifications__switch-sr">{checked ? 'On' : 'Off'}</span>
      </button>
    </article>
  )
}

function AdminNotificationsPage() {
  const [enabledById, setEnabledById] = useState(() =>
    Object.fromEntries(NOTIFICATION_OPTIONS.map((row) => [row.id, row.defaultEnabled])),
  )

  const handleToggle = (optionId, next) => {
    setEnabledById((previous) => ({ ...previous, [optionId]: next }))
  }

  return (
    <div className="admin-notifications">
      <header className="admin-notifications__hero">
        <h1 className="admin-notifications__title">Notification Settings</h1>
        <p className="admin-notifications__subtitle">Configure email and in-app notification rules.</p>
      </header>

      <section className="admin-notifications__panel" aria-labelledby="email-notifications-heading">
        <h2 className="admin-notifications__panel-heading" id="email-notifications-heading">
          Email Notifications
        </h2>
        <div className="admin-notifications__list">
          {NOTIFICATION_OPTIONS.map((row) => (
            <NotificationRow
              key={row.id}
              id={row.id}
              title={row.title}
              description={row.description}
              checked={enabledById[row.id]}
              onCheckedChange={(next) => handleToggle(row.id, next)}
              icon={iconByOptionId[row.id]}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminNotificationsPage
