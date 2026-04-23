/**
 * Parent role navigation — swap or load from config/API per user type
 * (SLT, Parent, Manager, Admin).
 */

export const parentNavItems = [
  { id: 'dashboard', label: 'Home', subLabel: 'Kainga', path: 'dashboard', icon: 'dashboard' },
  { id: 'enrol', label: 'Enrol Student', subLabel: 'Whakaurunga', path: 'enrol-student', icon: 'gradCap' },
  { id: 'applications', label: 'Applications', subLabel: 'Tono', path: 'applications', icon: 'document' },
  { id: 'notifications', label: 'Notifications', subLabel: 'Panui', path: 'notifications', icon: 'bell' },
]

export const parentBrand = {
  title: 'EduEnroll',
  subtitle: 'Aotearoa NZ',
}

export const parentRoleLabel = 'Parent'
