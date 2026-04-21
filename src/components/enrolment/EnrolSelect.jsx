import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { IconCheck } from '../icons/NavIcons.jsx'

function normalizeOptions(options) {
  return options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
}

function Chevron({ open }) {
  return (
    <svg
      className={`enrol-select__chevron${open ? ' is-open' : ''}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Custom enrolment dropdown — rounded panel; orange = hover / active highlight (moves with pointer).
 * On open, the current value row is highlighted in orange until the pointer hovers another option.
 *
 * @param {object} props
 * @param {string} props.id — id for label[htmlFor] / input association
 * @param {string} props.value — controlled value (empty string = placeholder)
 * @param {(next: string) => void} props.onChange
 * @param {readonly (string | { value: string, label: string })[]} props.options
 * @param {string} props.placeholder
 * @param {'up' | 'down'} [props.menuPlacement='up'] — panel opens toward top (default) or bottom
 */
function EnrolSelect({ id, value, onChange, options, placeholder, menuPlacement = 'up' }) {
  const listId = useId()
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)
  /** Which option shows orange — follows mouse; on menu open defaults to `value` when set */
  const [highlightedValue, setHighlightedValue] = useState(null)
  const items = normalizeOptions(options)

  const selected = items.find((o) => o.value === value)
  const displayLabel = selected ? selected.label : placeholder

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (open) {
      setHighlightedValue(value ? value : null)
    } else {
      setHighlightedValue(null)
    }
    // Seed orange highlight only when opening/closing; pointer updates highlight afterward.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleRootLeave = useCallback((e) => {
    if (rootRef.current?.contains(e.relatedTarget)) return
    setHighlightedValue(value ? value : null)
  }, [value])

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, close])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  const pick = (v) => {
    onChange(v)
    close()
  }

  return (
    <div
      ref={rootRef}
      className={`enrol-select enrol-select--menu-${menuPlacement}`}
      onMouseLeave={open ? handleRootLeave : undefined}
    >
      <button
        id={id}
        type="button"
        className="enrol-select__control"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value ? 'enrol-select__value' : 'enrol-select__value enrol-select__value--placeholder'}>{displayLabel}</span>
        <Chevron open={open} />
      </button>

      {open ? (
        <div id={listId} className="enrol-select__menu" role="listbox" aria-label="Options">
          <div className="enrol-select__menu-inner">
            {items.map((opt) => {
              const isSelected = opt.value === value
              const isHighlighted = highlightedValue !== null && opt.value === highlightedValue
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`enrol-select__option${isSelected ? ' is-selected' : ''}${isHighlighted ? ' is-highlighted' : ''}`}
                  onMouseEnter={() => setHighlightedValue(opt.value)}
                  onClick={() => pick(opt.value)}
                >
                  <span className="enrol-select__option-check" aria-hidden>
                    {isSelected ? <IconCheck width={16} height={16} /> : null}
                  </span>
                  <span className="enrol-select__option-label">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default EnrolSelect
