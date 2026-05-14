import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DayButton,
  DayPicker,
  NextMonthButton,
  PreviousMonthButton,
} from 'react-day-picker'
import 'react-day-picker/style.css'
import { isBefore, startOfDay, startOfMonth } from 'date-fns'
import { IconCalendar, IconChevronDown } from '../icons/NavIcons.jsx'

function toYmd(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseYmd(s) {
  if (!s?.trim()) return undefined
  const parts = s.split('-').map(Number)
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return undefined
  const [y, m, day] = parts
  return new Date(y, m - 1, day)
}

function formatTriggerLabel(isoDate) {
  if (!isoDate?.trim()) return ''
  const d = parseYmd(isoDate)
  if (!d || Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-NZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Interview date: “Pick a date” trigger + popover calendar (react-day-picker).
 *
 * @param {object} props
 * @param {string} props.id — id for the trigger (label `htmlFor`)
 * @param {string} props.value — `yyyy-mm-dd` or empty
 * @param {(ymd: string) => void} props.onChange
 * @param {string} [props.hintId] — for aria-describedby on trigger
 */
function ScheduleInterviewDateField({ id, value, onChange, hintId }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const selected = parseYmd(value)
  const display = formatTriggerLabel(value)

  const todayStart = useMemo(() => startOfDay(new Date()), [])
  const disabledMatchers = useMemo(() => ({ before: todayStart }), [todayStart])
  const defaultMonth = useMemo(() => selected ?? startOfMonth(todayStart), [selected, todayStart])

  useEffect(() => {
    if (!open) return undefined
    const onDocMouseDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open])

  return (
    <div className="schedule-interview-date-field" ref={wrapRef}>
      <div className="schedule-interview-modal__control schedule-interview-modal__control--date">
        <span className="schedule-interview-modal__control-icon" aria-hidden="true">
          <IconCalendar width={18} height={18} />
        </span>
        <button
          id={id}
          type="button"
          className="schedule-interview-date-field__trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-describedby={hintId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={display ? '' : 'schedule-interview-date-field__trigger-placeholder'}>
            {display || 'Pick a date'}
          </span>
          <IconChevronDown width={16} height={16} className="schedule-interview-date-field__chevron" aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div
          className="schedule-interview-calendar-popover"
          role="dialog"
          aria-label="Choose interview date"
          onKeyDown={(e) => {
            if (e.key === 'Escape') e.stopPropagation()
          }}
        >
          <DayPicker
            mode="single"
            required={false}
            selected={selected}
            onSelect={(d) => {
              if (!d) return
              if (isBefore(startOfDay(d), todayStart)) return
              onChange(toYmd(d))
              setOpen(false)
            }}
            defaultMonth={defaultMonth}
            disabled={disabledMatchers}
            weekStartsOn={0}
            captionLayout="label"
            showOutsideDays
            navLayout="around"
            className="slt-schedule-rdp"
            components={{
              DayButton: (props) => <DayButton {...props} type="button" />,
              PreviousMonthButton: (props) => <PreviousMonthButton {...props} type="button" />,
              NextMonthButton: (props) => <NextMonthButton {...props} type="button" />,
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ScheduleInterviewDateField
