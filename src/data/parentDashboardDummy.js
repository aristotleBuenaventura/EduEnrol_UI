/**
 * Dummy content for the Parent role dashboard.
 * Replace imports with API hooks / loaders when the backend is ready.
 */

export const parentUserProfile = {
  firstName: 'Sarah',
  fullName: 'Sarah Williams',
  email: 'sarah.williams@email.com',
  initials: 'SW',
}

export const parentApplicationStats = {
  draftCount: 1,
  inProgressCount: 0,
  completedCount: 0,
}

export const parentApplicationsPreview = [
  {
    id: 'app-1',
    referenceCode: 'ENR-2024-0001',
    studentName: 'Emma Williams',
    yearLevel: 'Year 1',
    status: 'draft',
    statusLabel: 'Draft',
    hint: 'Continue your application to submit',
    progressPercent: 28,
    continueHref: '/parent/enrol-student',
  },
]

export const parentHelpCards = [
  {
    id: 'help-team',
    variant: 'info',
    title: null,
    body: 'Our enrolment team is here to assist you with any questions.',
    actionLabel: 'Contact School',
    actionHref: '#',
  },
  {
    id: 'help-docs',
    variant: 'documents',
    title: null,
    body: 'Make sure you have birth certificate and proof of address ready.',
    actionLabel: 'View Checklist',
    actionHref: '#',
  },
]
