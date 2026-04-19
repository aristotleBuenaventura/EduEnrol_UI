/**
 * Parent role navigation — swap or load from config/API per user type
 * (SLT, Parent, Manager, Admin).
 */

export const parentNavItems = [
  { id: 'dashboard', label: 'Dashboard', path: 'dashboard', icon: 'dashboard' },
  { id: 'enrol', label: 'Enrol Student', path: 'enrol-student', icon: 'gradCap' },
  { id: 'applications', label: 'My Applications', path: 'applications', icon: 'document' },
  { id: 'notifications', label: 'Notifications', path: 'notifications', icon: 'bell' },
]

export const parentBrand = {
  title: 'EduEnroll',
  subtitle: 'New Zealand',
}

export const parentRoleLabel = 'Logged in as Parent'
