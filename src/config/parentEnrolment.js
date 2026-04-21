/**
 * Parent enrolment wizard — step labels and defaults.
 * Replace `defaultYearLevelOptions` at runtime (e.g. from API) when wiring data.
 */

export const defaultYearLevelOptions = [
  'Year 0',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Year 6',
]

/** Relationship to student — replace at runtime (e.g. API) via setter in the page */
export const defaultCaregiverRelationshipOptions = ['Mother', 'Father', 'Guardian', 'Grandparent', 'Other']

export const enrolmentWizardSteps = [
  { id: 'student', label: 'Student Details', shortLabel: 'Student' },
  { id: 'caregiver', label: 'Caregiver Information', shortLabel: 'Caregiver' },
  { id: 'address', label: 'Address & Zoning', shortLabel: 'Address' },
  { id: 'previous', label: 'Previous School', shortLabel: 'School' },
  { id: 'medical', label: 'Medical Information', shortLabel: 'Medical' },
  { id: 'documents', label: 'Documents', shortLabel: 'Docs' },
  { id: 'review', label: 'Review & Submit', shortLabel: 'Review' },
]
