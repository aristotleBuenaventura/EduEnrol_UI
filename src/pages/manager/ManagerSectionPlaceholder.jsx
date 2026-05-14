import { useLocation } from 'react-router-dom'

const TITLE_BY_PATH = {
  '/manager/applications': 'Applications',
  '/manager/task-queue': 'Task Queue',
  '/manager/assignments': 'Assignments',
  '/manager/reports': 'Reports',
}

function ManagerSectionPlaceholder() {
  const { pathname } = useLocation()
  const title = TITLE_BY_PATH[pathname] ?? 'Manager'

  return (
    <div className="parent-placeholder">
      <h1 className="parent-placeholder__title">{title}</h1>
      <p className="parent-placeholder__text">
        Placeholder content — replace this page with your real screen when designs are ready.
      </p>
    </div>
  )
}

export default ManagerSectionPlaceholder
