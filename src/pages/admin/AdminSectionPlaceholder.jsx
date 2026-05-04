import { useLocation } from 'react-router-dom'

const TITLE_BY_PATH = {
  '/admin/form-builder': 'Form Builder',
  '/admin/rules': 'Rules',
  '/admin/users': 'Users',
  '/admin/notifications': 'Notifications',
  '/admin/settings': 'Settings',
}

function AdminSectionPlaceholder() {
  const { pathname } = useLocation()
  const title = TITLE_BY_PATH[pathname] || 'Admin'

  return (
    <div className="parent-placeholder">
      <h1 className="parent-placeholder__title">{title}</h1>
      <p className="parent-placeholder__text">
        Placeholder content - replace this page with your real screen when designs are ready.
      </p>
    </div>
  )
}

export default AdminSectionPlaceholder
