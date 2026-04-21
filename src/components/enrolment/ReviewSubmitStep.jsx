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
function ReviewSubmitStep({ value, onChange }) {
  const patch = (updates) => onChange({ ...value, ...updates })

  return (
    <>
      <h2 className="parent-enrol__section-title">Review & Submit</h2>
      <p className="parent-enrol__section-desc">Review your application and submit</p>

      <div className="parent-enrol__fields">
        <div>
          <span className="parent-enrol__field-label" id="enrol-label-review-accuracy">
            I confirm that all information provided is accurate
            <RequiredMark />
          </span>
          <div className="parent-enrol__yn-row" role="group" aria-labelledby="enrol-label-review-accuracy">
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.confirmsAccuracy === 'yes' ? ' is-selected' : ''}`}
              onClick={() => patch({ confirmsAccuracy: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.confirmsAccuracy === 'no' ? ' is-selected' : ''}`}
              onClick={() => patch({ confirmsAccuracy: 'no' })}
            >
              No
            </button>
          </div>
        </div>

        <div>
          <span className="parent-enrol__field-label" id="enrol-label-review-privacy">
            I agree to the school's privacy policy and terms
            <RequiredMark />
          </span>
          <div className="parent-enrol__yn-row" role="group" aria-labelledby="enrol-label-review-privacy">
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.agreesPrivacyTerms === 'yes' ? ' is-selected' : ''}`}
              onClick={() => patch({ agreesPrivacyTerms: 'yes' })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`parent-enrol__yn-btn${value.agreesPrivacyTerms === 'no' ? ' is-selected' : ''}`}
              onClick={() => patch({ agreesPrivacyTerms: 'no' })}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewSubmitStep
