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
function AddressAndZoningStep({ value, onChange }) {
  const patch = (updates) => onChange({ ...value, ...updates })

  return (
    <>
      <h2 className="parent-enrol__section-title">Address & Zoning</h2>
      <p className="parent-enrol__section-desc">Residential address information</p>

      <div className="parent-enrol__fields">
        <div>
          <label className="parent-enrol__field-label" htmlFor="enrol-address-street">
            Home Address
            <RequiredMark />
          </label>
          <span className="parent-enrol__field-hint">Street Address</span>
          <input
            id="enrol-address-street"
            className="parent-enrol__input"
            type="text"
            autoComplete="street-address"
            placeholder="123 Main Street"
            value={value.streetAddress}
            onChange={(e) => patch({ streetAddress: e.target.value })}
          />
        </div>

        <div className="parent-enrol__row parent-enrol__row--two-col">
          <div>
            <label className="parent-enrol__field-label" htmlFor="enrol-address-suburb">
              Suburb
            </label>
            <input
              id="enrol-address-suburb"
              className="parent-enrol__input"
              type="text"
              autoComplete="address-level3"
              placeholder="Suburb"
              value={value.suburb}
              onChange={(e) => patch({ suburb: e.target.value })}
            />
          </div>

          <div>
            <label className="parent-enrol__field-label" htmlFor="enrol-address-city">
              City
            </label>
            <input
              id="enrol-address-city"
              className="parent-enrol__input"
              type="text"
              autoComplete="address-level2"
              placeholder="City"
              value={value.city}
              onChange={(e) => patch({ city: e.target.value })}
            />
          </div>
        </div>

        <div className="parent-enrol__row parent-enrol__row--postcode">
          <div>
            <label className="parent-enrol__field-label" htmlFor="enrol-address-postcode">
              Postcode
            </label>
            <input
              id="enrol-address-postcode"
              className="parent-enrol__input"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="0000"
              value={value.postcode}
              onChange={(e) => patch({ postcode: e.target.value })}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddressAndZoningStep
