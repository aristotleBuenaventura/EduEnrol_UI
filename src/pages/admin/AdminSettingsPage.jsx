import { useCallback, useState } from 'react'
import { IconCalendar, IconSettings } from '../../components/icons/NavIcons.jsx'

const DEFAULT_SCHOOL_NAME = 'EduEnroll NZ Demo School'

function IconSchoolBuilding(props) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <path d="M4 21V10l8-5 8 5v11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9h.01M15 9h.01" strokeLinecap="round" />
    </svg>
  )
}

function SettingsSwitch({ id, checked, onCheckedChange, label, description }) {
  const toggle = useCallback(() => {
    onCheckedChange(!checked)
  }, [checked, onCheckedChange])

  return (
    <div className="admin-settings__row">
      <div className="admin-settings__row-text">
        <p className="admin-settings__row-label" id={`${id}-label`}>
          {label}
        </p>
        <p className="admin-settings__row-hint" id={`${id}-hint`}>
          {description}
        </p>
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-hint`}
        className={`admin-settings__switch${checked ? ' is-on' : ''}`}
        onClick={toggle}
      >
        <span className="admin-settings__switch-thumb" />
        <span className="admin-settings__switch-sr">{checked ? 'On' : 'Off'}</span>
      </button>
    </div>
  )
}

function AdminSettingsPage() {
  const [schoolName, setSchoolName] = useState(DEFAULT_SCHOOL_NAME)
  const [enrolmentOpen, setEnrolmentOpen] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSaveSchool = () => {
    const trimmed = schoolName.trim()
    setSchoolName(trimmed || DEFAULT_SCHOOL_NAME)
    setSaveMessage('Changes saved')
    window.setTimeout(() => setSaveMessage(''), 2500)
  }

  return (
    <div className="admin-settings">
      <header className="admin-settings__hero">
        <h1 className="admin-settings__title">Settings</h1>
        <p className="admin-settings__subtitle">System-wide configuration</p>
      </header>

      <div className="admin-settings__grid">
        <section className="admin-settings__card" aria-labelledby="school-details-heading">
          <div className="admin-settings__card-head">
            <span className="admin-settings__card-icon" aria-hidden>
              <IconSchoolBuilding />
            </span>
            <h2 className="admin-settings__card-title" id="school-details-heading">
              School Details
            </h2>
          </div>
          <div className="admin-settings__card-body">
            <label className="admin-settings__field-label" htmlFor="admin-school-name">
              School Name
            </label>
            <input
              id="admin-school-name"
              type="text"
              className="admin-settings__input"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              autoComplete="organization"
            />
            <div className="admin-settings__actions">
              <button type="button" className="admin-settings__btn-primary" onClick={handleSaveSchool}>
                Save Changes
              </button>
              {saveMessage ? (
                <span className="admin-settings__save-hint" role="status">
                  {saveMessage}
                </span>
              ) : null}
            </div>
          </div>
        </section>

        <section className="admin-settings__card" aria-labelledby="enrolment-period-heading">
          <div className="admin-settings__card-head">
            <span className="admin-settings__card-icon" aria-hidden>
              <IconCalendar width={22} height={22} />
            </span>
            <h2 className="admin-settings__card-title" id="enrolment-period-heading">
              Enrolment Period
            </h2>
          </div>
          <div className="admin-settings__card-body admin-settings__card-body--flush">
            <SettingsSwitch
              id="switch-enrolment-open"
              checked={enrolmentOpen}
              onCheckedChange={setEnrolmentOpen}
              label="Enrolment Open"
              description="Allow new applications to be submitted"
            />
          </div>
        </section>

        <section className="admin-settings__card" aria-labelledby="system-heading">
          <div className="admin-settings__card-head">
            <span className="admin-settings__card-icon" aria-hidden>
              <IconSettings width={22} height={22} />
            </span>
            <h2 className="admin-settings__card-title" id="system-heading">
              System
            </h2>
          </div>
          <div className="admin-settings__card-body admin-settings__card-body--flush">
            <SettingsSwitch
              id="switch-maintenance-mode"
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
              label="Maintenance Mode"
              description="Temporarily disable access for non-admin users"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminSettingsPage
