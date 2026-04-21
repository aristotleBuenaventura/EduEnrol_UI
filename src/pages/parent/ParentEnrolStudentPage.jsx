import { useMemo, useState } from 'react'
import CaregiverInformationStep from '../../components/enrolment/CaregiverInformationStep.jsx'
import { initialCaregiverDetails } from '../../components/enrolment/caregiverDetailsDefaults.js'
import StudentDetailsStep from '../../components/enrolment/StudentDetailsStep.jsx'
import { initialStudentDetails } from '../../components/enrolment/studentDetailsDefaults.js'
import {
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconSave,
} from '../../components/icons/NavIcons.jsx'
import {
  defaultCaregiverRelationshipOptions,
  defaultYearLevelOptions,
  enrolmentWizardSteps,
} from '../../config/parentEnrolment.js'
import '../../styles/parent-enrolment.css'

const FORM_TITLE = 'Enrolment Application'
const FORM_SUBTITLE = 'Standard Enrolment Form 2024'

function PlaceholderStep({ title }) {
  return (
    <div className="parent-enrol__placeholder-step">
      <p className="parent-enrol__section-title" style={{ marginBottom: '0.5rem' }}>
        {title}
      </p>
      <p>Step content will be added when the design is ready.</p>
    </div>
  )
}

function ParentEnrolStudentPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [studentDetails, setStudentDetails] = useState(initialStudentDetails)
  const [caregiverDetails, setCaregiverDetails] = useState(initialCaregiverDetails)
  const [yearLevelOptions, _setYearLevelOptions] = useState(() => [...defaultYearLevelOptions])
  const [relationshipOptions, _setCaregiverRelationshipOptions] = useState(() => [...defaultCaregiverRelationshipOptions])

  const totalSteps = enrolmentWizardSteps.length
  const currentStep = enrolmentWizardSteps[stepIndex]
  const progressPct = ((stepIndex + 1) / totalSteps) * 100

  const stepBody = useMemo(() => {
    switch (currentStep.id) {
      case 'student':
        return (
          <StudentDetailsStep
            value={studentDetails}
            onChange={setStudentDetails}
            yearLevelOptions={yearLevelOptions}
          />
        )
      case 'caregiver':
        return (
          <CaregiverInformationStep
            value={caregiverDetails}
            onChange={setCaregiverDetails}
            relationshipOptions={relationshipOptions}
          />
        )
      default:
        return <PlaceholderStep title={currentStep.label} />
    }
  }, [currentStep, studentDetails, yearLevelOptions, caregiverDetails, relationshipOptions])

  const goNext = () => setStepIndex((i) => Math.min(i + 1, totalSteps - 1))
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0))

  const handleSaveDraft = () => {
    /* Persist draft — wire to API */
  }

  const showAutosave = stepIndex > 0

  return (
    <div className="parent-enrol">
      <header className="parent-enrol__header">
        <h1 className="parent-enrol__title">{FORM_TITLE}</h1>
        <p className="parent-enrol__subtitle">{FORM_SUBTITLE}</p>

        <div className="parent-enrol__meta-row">
          <span className="parent-enrol__step-label">
            Step {stepIndex + 1} of {totalSteps}
          </span>
          {showAutosave ? (
            <span className="parent-enrol__autosave">
              <span className="parent-enrol__autosave-icon" aria-hidden="true">
                <IconCheck width={18} height={18} />
              </span>
              Progress saved automatically
            </span>
          ) : null}
        </div>

        <div
          className="parent-enrol__progress-track"
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Form progress, step ${stepIndex + 1} of ${totalSteps}`}
        >
          <div className="parent-enrol__progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      <div className="parent-enrol__tabs-scroll">
        <ol className="parent-enrol__tabs" aria-label="Enrolment steps">
          {enrolmentWizardSteps.map((s, i) => {
            const isPast = i < stepIndex
            const isActive = i === stepIndex
            return (
              <li key={s.id} className="parent-enrol__tabs-item">
                {isPast ? (
                  <button
                    type="button"
                    className="parent-enrol__tab is-done"
                    onClick={() => setStepIndex(i)}
                    aria-label={`Go to ${s.label}`}
                  >
                    <span className="parent-enrol__tab-check" aria-hidden="true">
                      <IconCheck width={16} height={16} />
                    </span>
                    {s.label}
                  </button>
                ) : (
                  <span className={`parent-enrol__tab${isActive ? ' is-active' : ''}`} aria-current={isActive ? 'step' : undefined}>
                    {s.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="parent-enrol__card">{stepBody}</div>

      <footer className="parent-enrol__footer">
        <button type="button" className="parent-enrol__btn parent-enrol__btn--back" onClick={goBack} disabled={stepIndex === 0}>
          <IconChevronLeft width={18} height={18} />
          Back
        </button>
        <div className="parent-enrol__footer-actions">
          <button type="button" className="parent-enrol__btn parent-enrol__btn--ghost" onClick={handleSaveDraft}>
            <IconSave width={20} height={20} />
            Save Draft
          </button>
          <button type="button" className="parent-enrol__btn parent-enrol__btn--primary" onClick={goNext} disabled={stepIndex >= totalSteps - 1}>
            Next
            <IconArrowRight width={18} height={18} />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default ParentEnrolStudentPage
