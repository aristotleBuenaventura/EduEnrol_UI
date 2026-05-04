import { useCallback, useMemo, useState } from 'react'
import { IconArrowRight, IconCheck, IconSearch, IconSchool } from '../../components/icons/NavIcons.jsx'
import { adminUserProfile } from '../../data/adminDashboardDummy.js'
import { searchMoeSampleSchools } from '../../data/registerSchoolMoeSample.js'

const STEPS_MOE = [
  { id: 1, label: 'Find school' },
  { id: 2, label: 'School details' },
  { id: 3, label: 'Confirm address' },
]

const STEPS_MANUAL = [
  { id: 1, label: 'Find school' },
  { id: 2, label: 'Enter school details' },
]

function IconSchoolLarge(props) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      <path d="M4 21V11l8-5 8 5v10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLinkChain(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" strokeLinecap="round" />
    </svg>
  )
}

function IconInfo(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6M12 8h.01" strokeLinecap="round" />
    </svg>
  )
}

function initialWizardState() {
  return {
    flow: 'moe',
    step: 1,
    successPhase: false,
    schoolNameInput: '',
    searchPerformed: false,
    moeResults: [],
    showNoResults: false,
    selectedResultId: null,
    selectedSchool: null,
    principalName: '',
    schoolType: '',
    rollSize: '',
    confirmSchoolName: '',
    street: '',
    suburb: '',
    city: 'Auckland',
    postcode: '',
  }
}

function AdminRegisterSchoolPage() {
  const [linkedSchools, setLinkedSchools] = useState([])
  const [wizardActive, setWizardActive] = useState(false)
  const [wizard, setWizard] = useState(initialWizardState)

  const resetWizard = useCallback(() => {
    setWizard(initialWizardState())
  }, [])

  const openWizard = () => {
    resetWizard()
    setWizardActive(true)
  }

  const closeWizard = () => {
    setWizardActive(false)
    resetWizard()
  }

  const updateWizard = (patch) => {
    setWizard((w) => ({ ...w, ...patch }))
  }

  const handleSearch = () => {
    const q = wizard.schoolNameInput.trim()
    const { results, noMatch } = searchMoeSampleSchools(q)
    updateWizard({
      searchPerformed: true,
      moeResults: results,
      showNoResults: noMatch,
      selectedResultId: null,
      selectedSchool: null,
    })
  }

  const handleSelectResult = (row) => {
    updateWizard({
      selectedResultId: row.id,
      selectedSchool: { ...row, isManual: false },
    })
  }

  const handleManualEntry = () => {
    const seedName = wizard.schoolNameInput.trim()
    updateWizard({
      flow: 'manual',
      step: 2,
      showNoResults: false,
      searchPerformed: false,
      moeResults: [],
      selectedResultId: null,
      selectedSchool: null,
      principalName: '',
      schoolType: '',
      rollSize: '',
      confirmSchoolName: seedName,
      street: '',
      suburb: '',
      city: '',
      postcode: '',
    })
  }

  const step1CanNext = Boolean(wizard.selectedSchool)

  const step2CanNext =
    wizard.principalName.trim().length > 0 &&
    wizard.schoolType.trim().length > 0 &&
    wizard.rollSize.trim().length > 0

  const addressFormComplete =
    wizard.confirmSchoolName.trim().length > 0 &&
    wizard.street.trim().length > 0 &&
    wizard.suburb.trim().length > 0 &&
    wizard.city.trim().length > 0 &&
    wizard.postcode.trim().length > 0

  const step3CanSubmit = addressFormComplete

  const goNextFromStep1 = () => {
    if (!step1CanNext) return
    updateWizard({ step: 2 })
  }

  const goNextFromStep2 = () => {
    if (!step2CanNext) return
    const s = wizard.selectedSchool
    updateWizard({
      step: 3,
      confirmSchoolName: s?.name ?? '',
      city: s?.location || 'Auckland',
      street: '',
      suburb: '',
      postcode: '',
    })
  }

  const goBack = () => {
    if (wizard.successPhase) return
    if (wizard.step === 1) {
      closeWizard()
      return
    }
    if (wizard.step === 2) {
      if (wizard.flow === 'manual') {
        updateWizard({
          flow: 'moe',
          step: 1,
          showNoResults: true,
          searchPerformed: true,
          moeResults: [],
          confirmSchoolName: '',
          street: '',
          suburb: '',
          city: 'Auckland',
          postcode: '',
        })
        return
      }
      updateWizard({ step: 1, principalName: '', schoolType: '', rollSize: '' })
      return
    }
    if (wizard.step === 3) {
      updateWizard({ step: 2 })
    }
  }

  const handleSubmitRegistration = () => {
    if (wizard.flow === 'manual' && wizard.step === 2) {
      if (!addressFormComplete) return
      updateWizard({ successPhase: true })
      return
    }
    if (wizard.step !== 3) return
    if (!step3CanSubmit) return
    updateWizard({ successPhase: true })
  }

  const handleSuccessOkay = () => {
    const name = wizard.confirmSchoolName.trim()
    if (!name) return
    const s = wizard.selectedSchool
    const subtitle =
      wizard.flow === 'manual' || !s ? `${wizard.city.trim()} • Manual` : `${s.location} • MOE #${s.moeNumber}`
    setLinkedSchools((prev) => [
      ...prev,
      {
        id: `school-${Date.now()}`,
        name,
        subtitle,
        linkedEmail: adminUserProfile.email,
      },
    ])
    setWizardActive(false)
    resetWizard()
  }

  const hubHasSchools = linkedSchools.length > 0

  const stepper = useMemo(() => {
    if (!wizardActive || wizard.successPhase) return null
    const steps = wizard.flow === 'manual' ? STEPS_MANUAL : STEPS_MOE
    return (
      <div className="register-school__stepper" aria-label="Registration progress">
        <div className="register-school__stepper-inner">
          {steps.flatMap((s, index) => {
            const done = wizard.step > s.id
            const active = wizard.step === s.id
            const stepEl = (
              <div
                key={`step-${s.id}`}
                className={['register-school__step', done ? 'is-done' : '', active ? 'is-active' : ''].filter(Boolean).join(' ')}
              >
                <span className="register-school__step-index" aria-hidden>
                  {done ? (
                    <svg className="register-school__step-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </span>
                <span>{s.label}</span>
              </div>
            )
            if (index === 0) return [stepEl]
            return [<span key={`line-${s.id}`} className="register-school__step-line" aria-hidden />, stepEl]
          })}
        </div>
      </div>
    )
  }, [wizardActive, wizard.successPhase, wizard.flow, wizard.step])

  const pageTitle = 'Register School'
  const pageSubtitle = 'Link a school to your administrator account so you can manage its enrolments.'

  const renderHub = () => (
    <section className="register-school__card">
      <header className="register-school__card-head">
        <span className="register-school__card-icon" aria-hidden>
          <IconSchool width={22} height={22} />
        </span>
        <h2 className="register-school__card-title">Your linked school</h2>
      </header>
      <div className="register-school__card-body">
        {!hubHasSchools ? (
          <>
            <div className="register-school__card-body--center" style={{ paddingTop: '0.5rem' }}>
              <div className="register-school__empty-icon-wrap">
                <IconSchoolLarge />
              </div>
              <h3 className="register-school__empty-title">No school linked yet</h3>
              <p className="register-school__empty-text">Register your school to start managing enrolments.</p>
              <button type="button" className="register-school__btn register-school__btn--primary" onClick={openWizard}>
                Register School
                <IconArrowRight width={16} height={16} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {linkedSchools.map((school) => (
                <div key={school.id} className="register-school__linked-box">
                  <div className="register-school__linked-icon" aria-hidden>
                    <IconSchool width={22} height={22} />
                  </div>
                  <div>
                    <p className="register-school__linked-name">{school.name}</p>
                    <p className="register-school__linked-meta">{school.subtitle}</p>
                    <span className="register-school__badge">
                      <IconLinkChain />
                      Linked to {school.linkedEmail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="register-school__hint-below">
              Your account is already linked to a school. You can register an additional school below.
            </p>
            <button type="button" className="register-school__btn register-school__btn--primary" onClick={openWizard}>
              + Register another school
            </button>
          </>
        )}
      </div>
    </section>
  )

  const renderSuccess = () => (
    <section className="register-school__card">
      <div className="register-school__card-body register-school__card-body--center">
        <div className="register-school__success-icon-wrap" aria-hidden>
          <IconCheck width={28} height={28} strokeWidth={2} />
        </div>
        <h3 className="register-school__success-title">School registered successfully</h3>
        <p className="register-school__success-text">
          <strong>{wizard.confirmSchoolName.trim()}</strong> is now linked to your administrator account.
        </p>
        <span className="register-school__badge" style={{ marginBottom: '1rem' }}>
          <IconLinkChain />
          Linked to {adminUserProfile.email}
        </span>
        <div className="register-school__success-actions">
          <button type="button" className="register-school__btn register-school__btn--primary" onClick={handleSuccessOkay}>
            Okay
          </button>
        </div>
      </div>
    </section>
  )

  const renderStep1 = () => (
    <section className="register-school__card">
      <header className="register-school__card-head">
        <span className="register-school__card-icon" aria-hidden>
          <IconSearch width={20} height={20} />
        </span>
        <h2 className="register-school__card-title">Find your school</h2>
      </header>
      <div className="register-school__card-body">
        <div className="register-school__row-search">
          <div className="register-school__field">
            <label className="register-school__label" htmlFor="rs-school-search">
              School name
            </label>
            <input
              id="rs-school-search"
              type="text"
              className="register-school__input"
              placeholder="e.g. Auckland Grammar"
              value={wizard.schoolNameInput}
              onChange={(e) => updateWizard({ schoolNameInput: e.target.value })}
            />
          </div>
          <button type="button" className="register-school__btn register-school__btn--primary" onClick={handleSearch}>
            <IconSearch width={18} height={18} />
            Search
          </button>
        </div>
        <p className="register-school__helper">We check the MOE zoning database for matching schools.</p>

        {wizard.searchPerformed && wizard.showNoResults ? (
          <div className="register-school__alert" role="alert">
            <span className="register-school__alert-icon" aria-hidden>
              !
            </span>
            <div>
              <p className="register-school__alert-title">Could not find school</p>
              <p className="register-school__alert-text">
                No schools matched &lsquo;{wizard.schoolNameInput.trim() || '(empty)'}&rsquo; in the zoning database. You can register it
                manually by entering the school name and address.
              </p>
              <button type="button" className="register-school__btn register-school__btn--primary" onClick={handleManualEntry}>
                Enter school details manually
                <IconArrowRight width={16} height={16} />
              </button>
            </div>
          </div>
        ) : null}

        {wizard.searchPerformed && !wizard.showNoResults && wizard.moeResults.length > 0 ? (
          <>
            <p className="register-school__results-cap">
              {wizard.moeResults.length} {wizard.moeResults.length === 1 ? 'MATCH' : 'MATCHES'} FOUND IN ZONING DATABASE
            </p>
            {wizard.moeResults.map((row) => (
              <button
                key={row.id}
                type="button"
                className={['register-school__result', wizard.selectedResultId === row.id ? 'is-selected' : '']
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleSelectResult(row)}
              >
                <div className="register-school__result-main">
                  <span className="register-school__result-icon" aria-hidden>
                    <IconSchool width={18} height={18} />
                  </span>
                  <span>
                    <span className="register-school__result-name">{row.name}</span>
                    <div className="register-school__result-meta">
                      {row.location} • MOE #{row.moeNumber}
                    </div>
                  </span>
                </div>
                {wizard.selectedResultId === row.id ? (
                  <span className="register-school__result-check" aria-hidden>
                    <IconCheck width={20} height={20} strokeWidth={2.5} />
                  </span>
                ) : null}
              </button>
            ))}
          </>
        ) : null}

        <div className="register-school__footer">
          <button type="button" className="register-school__btn register-school__btn--ghost" onClick={goBack}>
            ← Cancel
          </button>
          <button type="button" className="register-school__btn register-school__btn--primary" disabled={!step1CanNext} onClick={goNextFromStep1}>
            Next
            <IconArrowRight width={16} height={16} />
          </button>
        </div>
      </div>
    </section>
  )

  const renderManualAddressStep = () => (
    <section className="register-school__card">
      <header className="register-school__card-head register-school__card-head--plain">
        <h2 className="register-school__card-title">Enter school name &amp; address</h2>
      </header>
      <div className="register-school__card-body">
        <p className="register-school__helper" style={{ marginTop: 0, marginBottom: '1rem' }}>
          This school wasn&apos;t found in the zoning database. Please enter its details manually so it can be registered.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label className="register-school__label" htmlFor="rs-manual-name">
              School name <span className="req">*</span>
            </label>
            <input
              id="rs-manual-name"
              type="text"
              className="register-school__input"
              value={wizard.confirmSchoolName}
              onChange={(e) => updateWizard({ confirmSchoolName: e.target.value })}
              autoComplete="organization"
            />
          </div>
          <div>
            <label className="register-school__label" htmlFor="rs-manual-street">
              Street address <span className="req">*</span>
            </label>
            <input
              id="rs-manual-street"
              type="text"
              className="register-school__input"
              value={wizard.street}
              onChange={(e) => updateWizard({ street: e.target.value })}
              autoComplete="street-address"
            />
          </div>
          <div className="register-school__grid2">
            <div>
              <label className="register-school__label" htmlFor="rs-manual-suburb">
                Suburb <span className="req">*</span>
              </label>
              <input
                id="rs-manual-suburb"
                type="text"
                className="register-school__input"
                value={wizard.suburb}
                onChange={(e) => updateWizard({ suburb: e.target.value })}
              />
            </div>
            <div>
              <label className="register-school__label" htmlFor="rs-manual-city">
                City <span className="req">*</span>
              </label>
              <input
                id="rs-manual-city"
                type="text"
                className="register-school__input"
                value={wizard.city}
                onChange={(e) => updateWizard({ city: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="register-school__label" htmlFor="rs-manual-post">
              Postcode <span className="req">*</span>
            </label>
            <input
              id="rs-manual-post"
              type="text"
              className="register-school__input"
              value={wizard.postcode}
              onChange={(e) => updateWizard({ postcode: e.target.value })}
              autoComplete="postal-code"
            />
          </div>
        </div>
        {!addressFormComplete ? (
          <p className="register-school__validation">Please complete all required fields before submitting.</p>
        ) : null}
        <div className="register-school__footer">
          <button type="button" className="register-school__btn register-school__btn--ghost" onClick={goBack}>
            ← Back
          </button>
          <button
            type="button"
            className="register-school__btn register-school__btn--primary"
            disabled={!addressFormComplete}
            onClick={handleSubmitRegistration}
          >
            Submit registration
          </button>
        </div>
      </div>
    </section>
  )

  const renderStep2 = () => {
    const s = wizard.selectedSchool
    return (
      <section className="register-school__card">
        <header className="register-school__card-head register-school__card-head--plain">
          <h2 className="register-school__card-title">School details</h2>
        </header>
        <div className="register-school__card-body">
          <p className="register-school__helper" style={{ marginTop: 0, marginBottom: '0.85rem' }}>
            Found in zoning database: <strong>{s?.name}</strong>
          </p>
          <div className="register-school__info-banner">
            <IconInfo style={{ flexShrink: 0, color: '#163a5c' }} />
            <span>
              School name and address have been auto-loaded from the MOE zoning database. Just add a few extra details below.
            </span>
          </div>
          <div className="register-school__grid2">
            <div>
              <label className="register-school__label" htmlFor="rs-principal">
                Principal name <span className="req">*</span>
              </label>
              <input
                id="rs-principal"
                type="text"
                className="register-school__input"
                value={wizard.principalName}
                onChange={(e) => updateWizard({ principalName: e.target.value })}
              />
            </div>
            <div>
              <label className="register-school__label" htmlFor="rs-type">
                School type <span className="req">*</span>
              </label>
              <input
                id="rs-type"
                type="text"
                className="register-school__input"
                placeholder="e.g. Secondary, Co-ed"
                value={wizard.schoolType}
                onChange={(e) => updateWizard({ schoolType: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label className="register-school__label" htmlFor="rs-roll">
              Approximate roll size <span className="req">*</span>
            </label>
            <input
              id="rs-roll"
              type="text"
              className="register-school__input"
              value={wizard.rollSize}
              onChange={(e) => updateWizard({ rollSize: e.target.value })}
            />
          </div>
          <div className="register-school__footer">
            <button type="button" className="register-school__btn register-school__btn--ghost" onClick={goBack}>
              ← Back
            </button>
            <button type="button" className="register-school__btn register-school__btn--primary" disabled={!step2CanNext} onClick={goNextFromStep2}>
              Next
              <IconArrowRight width={16} height={16} />
            </button>
          </div>
        </div>
      </section>
    )
  }

  const renderStep3 = () => (
    <section className="register-school__card">
      <header className="register-school__card-head register-school__card-head--plain">
        <h2 className="register-school__card-title">Confirm school name &amp; address</h2>
      </header>
      <div className="register-school__card-body">
        <p className="register-school__helper" style={{ marginTop: 0, marginBottom: '1rem' }}>
          Review the information loaded from the zoning database and confirm.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label className="register-school__label" htmlFor="rs-confirm-name">
              School name <span className="req">*</span>
            </label>
            <input
              id="rs-confirm-name"
              type="text"
              className={['register-school__input', wizard.confirmSchoolName.trim() ? 'is-filled' : ''].filter(Boolean).join(' ')}
              value={wizard.confirmSchoolName}
              onChange={(e) => updateWizard({ confirmSchoolName: e.target.value })}
            />
          </div>
          <div>
            <label className="register-school__label" htmlFor="rs-street">
              Street address <span className="req">*</span>
            </label>
            <input
              id="rs-street"
              type="text"
              className={['register-school__input', wizard.street.trim() ? 'is-filled' : ''].filter(Boolean).join(' ')}
              value={wizard.street}
              onChange={(e) => updateWizard({ street: e.target.value })}
            />
          </div>
          <div className="register-school__grid2">
            <div>
              <label className="register-school__label" htmlFor="rs-suburb">
                Suburb <span className="req">*</span>
              </label>
              <input
                id="rs-suburb"
                type="text"
                className={['register-school__input', wizard.suburb.trim() ? 'is-filled' : ''].filter(Boolean).join(' ')}
                value={wizard.suburb}
                onChange={(e) => updateWizard({ suburb: e.target.value })}
              />
            </div>
            <div>
              <label className="register-school__label" htmlFor="rs-city">
                City <span className="req">*</span>
              </label>
              <input
                id="rs-city"
                type="text"
                className={['register-school__input', wizard.city.trim() ? 'is-filled' : ''].filter(Boolean).join(' ')}
                value={wizard.city}
                onChange={(e) => updateWizard({ city: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="register-school__label" htmlFor="rs-post">
              Postcode <span className="req">*</span>
            </label>
            <input
              id="rs-post"
              type="text"
              className={['register-school__input', wizard.postcode.trim() ? 'is-filled' : ''].filter(Boolean).join(' ')}
              value={wizard.postcode}
              onChange={(e) => updateWizard({ postcode: e.target.value })}
            />
          </div>
        </div>
        {!step3CanSubmit ? (
          <p className="register-school__validation">Please complete all required fields before submitting.</p>
        ) : null}
        <div className="register-school__footer">
          <button type="button" className="register-school__btn register-school__btn--ghost" onClick={goBack}>
            ← Back
          </button>
          <button
            type="button"
            className="register-school__btn register-school__btn--primary"
            disabled={!step3CanSubmit}
            onClick={handleSubmitRegistration}
          >
            Submit registration
          </button>
        </div>
      </div>
    </section>
  )

  return (
    <div className="register-school">
      <header className="register-school__hero">
        <h1 className="register-school__title">{pageTitle}</h1>
        <p className="register-school__subtitle">{pageSubtitle}</p>
      </header>

      {!wizardActive ? renderHub() : null}

      {wizardActive && !wizard.successPhase ? (
        <>
          {stepper}
          {wizard.step === 1 ? renderStep1() : null}
          {wizard.step === 2 && wizard.flow === 'manual' ? renderManualAddressStep() : null}
          {wizard.step === 2 && wizard.flow === 'moe' ? renderStep2() : null}
          {wizard.step === 3 ? renderStep3() : null}
        </>
      ) : null}

      {wizardActive && wizard.successPhase ? renderSuccess() : null}
    </div>
  )
}

export default AdminRegisterSchoolPage
