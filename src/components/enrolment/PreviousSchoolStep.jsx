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
function PreviousSchoolStep({ value, onChange }) {
  const patch = (updates) => onChange({ ...value, ...updates })

  return (
    <>
      <h2 className="parent-enrol__section-title">Previous School</h2>
      <p className="parent-enrol__section-desc">Information about previous schooling</p>

      <div className="parent-enrol__fields">
        <div>
          <span className="parent-enrol__field-label" id="enrol-label-previous-school">
            Has the student attended another school?
            <RequiredMark />
          </span>
          <div className="parent-enrol__yn-row" role="group" aria-labelledby="enrol-label-previous-school">
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.attendedAnotherSchool === 'yes' ? ' is-selected' : ''}`}
              onClick={() => patch({ attendedAnotherSchool: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.attendedAnotherSchool === 'no' ? ' is-selected' : ''}`}
              onClick={() => patch({ attendedAnotherSchool: 'no' })}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviousSchoolStep
