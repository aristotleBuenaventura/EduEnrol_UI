import { useRef } from 'react'
import { IconCalendar } from '../icons/NavIcons.jsx'
import EnrolSelect from './EnrolSelect.jsx'

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say']
const ETHNICITIES = ['NZ European', 'Māori', 'Pacific Islander', 'Asian', 'Other']

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
 * @param {string[]} props.yearLevelOptions
 */
function StudentDetailsStep({ value, onChange, yearLevelOptions }) {
  const dateInputRef = useRef(null)

  const patch = (updates) => onChange({ ...value, ...updates })

  const openDatePicker = () => {
    const el = dateInputRef.current
    if (!el) return
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker()
        return
      } catch {
        /* showPicker can throw if not user-gesture in some browsers */
      }
    }
    el.focus()
    el.click()
  }

  return (
    <>
      <h2 className="parent-enrol__section-title">Student Details</h2>
      <p className="parent-enrol__section-desc">Basic information about the student.</p>

      <div className="parent-enrol__fields">
        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-first-name">
            First Name
            <RequiredMark />
          </label>
          <input
            id="enrol-first-name"
            className="parent-enrol__input"
            type="text"
            autoComplete="given-name"
            placeholder="Enter first name"
            value={value.firstName}
            onChange={(e) => patch({ firstName: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-middle-name">
            Middle Name(s)
          </label>
          <input
            id="enrol-middle-name"
            className="parent-enrol__input"
            type="text"
            autoComplete="additional-name"
            placeholder="Enter middle name(s)"
            value={value.middleName}
            onChange={(e) => patch({ middleName: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-last-name">
            Last Name
            <RequiredMark />
          </label>
          <input
            id="enrol-last-name"
            className="parent-enrol__input"
            type="text"
            autoComplete="family-name"
            placeholder="Enter last name"
            value={value.lastName}
            onChange={(e) => patch({ lastName: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-preferred">
            Preferred Name
          </label>
          <input
            id="enrol-preferred"
            className="parent-enrol__input"
            type="text"
            placeholder="Enter preferred name"
            value={value.preferredName}
            onChange={(e) => patch({ preferredName: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-dob">
            Date of Birth
            <RequiredMark />
          </label>
          <div className="parent-enrol__date-wrap">
            <input
              ref={dateInputRef}
              id="enrol-dob"
              className="parent-enrol__input"
              type="date"
              value={value.dateOfBirth}
              onChange={(e) => patch({ dateOfBirth: e.target.value })}
            />
            <button
              type="button"
              className="parent-enrol__date-btn"
              aria-label="Open calendar"
              onClick={openDatePicker}
            >
              <IconCalendar width={20} height={20} />
            </button>
          </div>
        </div>

        <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
          <legend className="parent-enrol__field-label" style={{ marginBottom: '0.45rem', padding: 0 }}>
            Gender
            <RequiredMark />
          </legend>
          <div className="parent-enrol__radio-grid">
            {GENDERS.map((g) => (
              <label key={g} className="parent-enrol__radio-option">
                <input
                  type="radio"
                  name="enrol-gender"
                  value={g}
                  checked={value.gender === g}
                  onChange={() => patch({ gender: g })}
                />
                <span className="parent-enrol__radio-pill">{g}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
          <legend className="parent-enrol__field-label" style={{ marginBottom: '0.45rem', padding: 0 }}>
            Ethnicity
            <RequiredMark />
          </legend>
          <div className="parent-enrol__radio-grid">
            {ETHNICITIES.map((eth) => (
              <label key={eth} className="parent-enrol__radio-option">
                <input
                  type="radio"
                  name="enrol-ethnicity"
                  value={eth}
                  checked={value.ethnicity === eth}
                  onChange={() => patch({ ethnicity: eth })}
                />
                <span className="parent-enrol__radio-pill">{eth}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-year">
            Year Level
            <RequiredMark />
          </label>
          <EnrolSelect
            id="enrol-year"
            value={value.yearLevel}
            onChange={(yearLevel) => patch({ yearLevel })}
            options={yearLevelOptions}
            placeholder="Select year level"
          />
        </div>
      </div>
    </>
  )
}

export default StudentDetailsStep
