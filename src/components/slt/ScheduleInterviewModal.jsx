import { useEffect, useId, useState } from 'react'
import { IconCalendar, IconClock, IconX } from '../icons/NavIcons.jsx'
import ScheduleInterviewDateField from './ScheduleInterviewDateField.jsx'
import '../../styles/schedule-interview-modal.css'

/**
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {() => void} props.onConfirm
 */
function ScheduleInterviewModal({ isOpen, onClose, onConfirm }) {
  const titleId = useId()
  const descId = useId()
  const [interviewDate, setInterviewDate] = useState('')
  const [time, setTime] = useState('09:00')
  const [location, setLocation] = useState("Principal's Office")
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const dateSelected = Boolean(interviewDate?.trim())

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!dateSelected) return
    onConfirm()
  }

  return (
    <div className="schedule-interview-modal-root" role="presentation">
      <button type="button" className="schedule-interview-modal__backdrop" aria-label="Close" onClick={onClose} />
      <div
        className="schedule-interview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <header className="schedule-interview-modal__header">
          <div>
            <h2 id={titleId} className="schedule-interview-modal__title">
              Schedule Interview
            </h2>
            <p id={descId} className="schedule-interview-modal__subtitle">
              Select a date, time, and location for the interview.
            </p>
          </div>
          <button type="button" className="schedule-interview-modal__close" onClick={onClose} aria-label="Close">
            <IconX width={20} height={20} />
          </button>
        </header>

        <form className="schedule-interview-modal__form" onSubmit={handleSubmit}>
          <div className="schedule-interview-modal__field">
            <label className="schedule-interview-modal__label" htmlFor="slt-schedule-date">
              Interview Date
            </label>
            <ScheduleInterviewDateField
              id="slt-schedule-date"
              value={interviewDate}
              onChange={setInterviewDate}
              hintId="slt-schedule-date-hint"
            />
            <p id="slt-schedule-date-hint" className="schedule-interview-modal__hint">
              {dateSelected ? 'Tap the date field above to change your selection.' : 'Open the calendar and choose an interview date.'}
            </p>
          </div>

          <div className="schedule-interview-modal__field">
            <label className="schedule-interview-modal__label" htmlFor="slt-schedule-time">
              Time
            </label>
            <div className="schedule-interview-modal__control schedule-interview-modal__control--time">
              <input
                id="slt-schedule-time"
                className="schedule-interview-modal__input schedule-interview-modal__input--time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <span className="schedule-interview-modal__control-icon schedule-interview-modal__control-icon--end" aria-hidden="true">
                <IconClock width={20} height={20} />
              </span>
            </div>
          </div>

          <div className="schedule-interview-modal__field">
            <label className="schedule-interview-modal__label" htmlFor="slt-schedule-location">
              Location
            </label>
            <input
              id="slt-schedule-location"
              className="schedule-interview-modal__input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="schedule-interview-modal__field">
            <label className="schedule-interview-modal__label" htmlFor="slt-schedule-notes">
              Notes (optional)
            </label>
            <textarea
              id="slt-schedule-notes"
              className="schedule-interview-modal__textarea"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any details for the parent or panel..."
            />
          </div>

          <footer className="schedule-interview-modal__footer">
            <button type="button" className="schedule-interview-modal__btn schedule-interview-modal__btn--secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="schedule-interview-modal__btn schedule-interview-modal__btn--primary"
              disabled={!dateSelected}
            >
              <IconCalendar width={18} height={18} aria-hidden="true" />
              Schedule
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default ScheduleInterviewModal
