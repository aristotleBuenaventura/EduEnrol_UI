import { useEffect } from 'react'
import { IconCheck } from '../icons/NavIcons.jsx'
import '../../styles/app-toast.css'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {import('react').ReactNode} [props.icon]
 * @param {number} [props.durationMs]
 * @param {() => void} props.onDismiss
 */
function AppToast({ title, description, icon, durationMs = 4200, onDismiss }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      onDismiss()
    }, durationMs)
    return () => window.clearTimeout(t)
  }, [durationMs, onDismiss])

  return (
    <div className="app-toast" role="status" aria-live="polite">
      <span className="app-toast__icon" aria-hidden="true">
        {icon ?? <IconCheck width={14} height={14} strokeWidth={2.5} />}
      </span>
      <div>
        <p className="app-toast__title">{title}</p>
        {description ? <p className="app-toast__desc">{description}</p> : null}
      </div>
    </div>
  )
}

export default AppToast
