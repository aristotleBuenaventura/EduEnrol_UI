import { useLocation } from 'react-router-dom'

const TITLE_BY_PATH = {
  '/parent/enrol-student': 'Enrol Student',
  '/parent/applications': 'My Applications',
  '/parent/notifications': 'Notifications',
}

function ParentSectionPlaceholder() {
  const { pathname } = useLocation()
  const title = TITLE_BY_PATH[pathname] || 'Parent'

  return (
    <div className="parent-placeholder">
      <h1 className="parent-placeholder__title">{title}</h1>
      <p className="parent-placeholder__text">
        Placeholder content — replace this page with your real screen when designs are ready.
      </p>
    </div>
  )
}

export default ParentSectionPlaceholder
