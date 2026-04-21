function RequiredMark() {
  return (
    <span className="parent-enrol__required" aria-hidden="true">
      {' '}
      *
    </span>
  )
}

/**
 * @param {object} props
 * @param {object} props.value
 * @param {(patch: object) => void} props.onChange
 * @param {string[]} props.relationshipOptions
 */
function CaregiverInformationStep({ value, onChange, relationshipOptions }) {
  const patch = (updates) => onChange({ ...value, ...updates })

  return (
    <>
      <h2 className="parent-enrol__section-title">Caregiver Information</h2>
      <p className="parent-enrol__section-desc">Details of parents/caregivers</p>

      <div className="parent-enrol__fields">
        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-caregiver-relationship">
            Relationship to Student
            <RequiredMark />
          </label>
          <select
            id="enrol-caregiver-relationship"
            className="parent-enrol__select"
            value={value.relationship}
            onChange={(e) => patch({ relationship: e.target.value })}
          >
            <option value="">Select relationship to student</option>
            {relationshipOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-caregiver-first">
            First Name
            <RequiredMark />
          </label>
          <input
            id="enrol-caregiver-first"
            className="parent-enrol__input"
            type="text"
            autoComplete="given-name"
            placeholder="Enter first name"
            value={value.firstName}
            onChange={(e) => patch({ firstName: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-caregiver-last">
            Last Name
            <RequiredMark />
          </label>
          <input
            id="enrol-caregiver-last"
            className="parent-enrol__input"
            type="text"
            autoComplete="family-name"
            placeholder="Enter last name"
            value={value.lastName}
            onChange={(e) => patch({ lastName: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-caregiver-email">
            Email Address
            <RequiredMark />
          </label>
          <input
            id="enrol-caregiver-email"
            className="parent-enrol__input"
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            value={value.email}
            onChange={(e) => patch({ email: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-caregiver-phone">
            Phone Number
            <RequiredMark />
          </label>
          <input
            id="enrol-caregiver-phone"
            className="parent-enrol__input"
            type="tel"
            autoComplete="tel"
            placeholder="Enter phone number"
            value={value.phone}
            onChange={(e) => patch({ phone: e.target.value })}
          />
        </div>

        <div>
          <span className="parent-enrol__field-label" id="enrol-label-primary">
            Is this the primary contact?
            <RequiredMark />
          </span>
          <div className="parent-enrol__yn-row" role="group" aria-labelledby="enrol-label-primary">
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.primaryContact === 'yes' ? ' is-selected' : ''}`}
              onClick={() => patch({ primaryContact: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.primaryContact === 'no' ? ' is-selected' : ''}`}
              onClick={() => patch({ primaryContact: 'no' })}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <span className="parent-enrol__field-label" id="enrol-label-pickup">
            Can this person pick up the student?
            <RequiredMark />
          </span>
          <div className="parent-enrol__yn-row" role="group" aria-labelledby="enrol-label-pickup">
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.canPickUp === 'yes' ? ' is-selected' : ''}`}
              onClick={() => patch({ canPickUp: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.canPickUp === 'no' ? ' is-selected' : ''}`}
              onClick={() => patch({ canPickUp: 'no' })}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CaregiverInformationStep
