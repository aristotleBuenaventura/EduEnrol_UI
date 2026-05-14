import { useEffect, useId, useState } from 'react'
import { IconMail, IconX } from '../icons/NavIcons.jsx'
import '../../styles/request-additional-info-modal.css'

/**
 * @param {object} props
 * @param {() => void} props.onClose
 * @param {string} props.initialTo
 * @param {string} props.initialSubject
 * @param {string} props.initialMessage
 * @param {(payload: { to: string, subject: string, message: string }) => void} props.onSend
 */
function RequestAdditionalInfoModal({ onClose, initialTo, initialSubject, initialMessage, onSend }) {
  const titleId = useId()
  const descId = useId()
  const [to, setTo] = useState(initialTo)
  const [subject, setSubject] = useState(initialSubject)
  const [message, setMessage] = useState(initialMessage)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedTo = to.trim()
    if (!trimmedTo) return
    onSend({ to: trimmedTo, subject: subject.trim(), message: message.trim() })
  }

  return (
    <div className="request-info-modal-root" role="presentation">
      <button type="button" className="request-info-modal__backdrop" aria-label="Close" onClick={onClose} />
      <div
        className="request-info-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <header className="request-info-modal__header">
          <div>
            <h2 id={titleId} className="request-info-modal__title">
              Request Additional Information
            </h2>
            <p id={descId} className="request-info-modal__subtitle">
              Compose an email to the caregiver detailing the specific information you need.
            </p>
          </div>
          <button type="button" className="request-info-modal__close" onClick={onClose} aria-label="Close">
            <IconX width={20} height={20} />
          </button>
        </header>

        <form className="request-info-modal__form" onSubmit={handleSubmit}>
          <div className="request-info-modal__field">
            <label className="request-info-modal__label" htmlFor="request-info-to">
              To
            </label>
            <input
              id="request-info-to"
              className="request-info-modal__input"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="request-info-modal__field">
            <label className="request-info-modal__label" htmlFor="request-info-subject">
              Subject
            </label>
            <input
              id="request-info-subject"
              className="request-info-modal__input"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="request-info-modal__field request-info-modal__field--grow">
            <label className="request-info-modal__label" htmlFor="request-info-message">
              Message
            </label>
            <textarea
              id="request-info-message"
              className="request-info-modal__textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              spellCheck="true"
            />
          </div>

          <footer className="request-info-modal__footer">
            <button type="button" className="request-info-modal__btn request-info-modal__btn--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="request-info-modal__btn request-info-modal__btn--primary">
              <IconMail width={18} height={18} aria-hidden="true" />
              Send Email
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default RequestAdditionalInfoModal
