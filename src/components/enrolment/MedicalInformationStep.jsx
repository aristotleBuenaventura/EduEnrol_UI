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
 */
function MedicalInformationStep({ value, onChange }) {
  const patch = (updates) => onChange({ ...value, ...updates })

  return (
    <>
      <h2 className="parent-enrol__section-title">Medical Information</h2>
      <p className="parent-enrol__section-desc">Health and medical details</p>

      <div className="parent-enrol__fields">
        <div>
          <span className="parent-enrol__field-label" id="enrol-label-medical-conditions">
            Does the student have any medical conditions?
            <RequiredMark />
          </span>
          <div className="parent-enrol__yn-row" role="group" aria-labelledby="enrol-label-medical-conditions">
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.hasMedicalConditions === 'yes' ? ' is-selected' : ''}`}
              onClick={() => patch({ hasMedicalConditions: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.hasMedicalConditions === 'no' ? ' is-selected' : ''}`}
              onClick={() => patch({ hasMedicalConditions: 'no' })}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <span className="parent-enrol__field-label" id="enrol-label-allergies">
            Does the student have any allergies?
            <RequiredMark />
          </span>
          <div className="parent-enrol__yn-row" role="group" aria-labelledby="enrol-label-allergies">
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.hasAllergies === 'yes' ? ' is-selected' : ''}`}
              onClick={() => patch({ hasAllergies: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.hasAllergies === 'no' ? ' is-selected' : ''}`}
              onClick={() => patch({ hasAllergies: 'no' })}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-medications">
            Current Medications
          </label>
          <textarea
            id="enrol-medications"
            className="parent-enrol__input parent-enrol__textarea"
            rows={3}
            placeholder="Enter current medications"
            value={value.currentMedications}
            onChange={(e) => patch({ currentMedications: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-doctor-name">
            Doctor/Medical Centre Name
          </label>
          <input
            id="enrol-doctor-name"
            className="parent-enrol__input"
            type="text"
            placeholder="Enter doctor/medical centre name"
            value={value.doctorName}
            onChange={(e) => patch({ doctorName: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-doctor-phone">
            Doctor Phone Number
          </label>
          <input
            id="enrol-doctor-phone"
            className="parent-enrol__input"
            type="tel"
            autoComplete="tel"
            placeholder="Enter doctor phone number"
            value={value.doctorPhone}
            onChange={(e) => patch({ doctorPhone: e.target.value })}
          />
        </div>

        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-special-needs">
            Special Educational Needs
          </label>
          <span className="parent-enrol__field-hint">Please describe any learning support requirements</span>
          <textarea
            id="enrol-special-needs"
            className="parent-enrol__input parent-enrol__textarea"
            rows={3}
            placeholder="Enter special educational needs"
            value={value.specialEducationalNeeds}
            onChange={(e) => patch({ specialEducationalNeeds: e.target.value })}
          />
        </div>
      </div>
    </>
  )
}

export default MedicalInformationStep
