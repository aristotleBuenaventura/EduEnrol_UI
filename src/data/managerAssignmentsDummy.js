/**
 * Initial state for Manager → Assignments (demo).
 * Reset page to restore; counts update when rows are assigned.
 */

export const managerAssignmentsInitialMembers = [
  { id: 'js', fullName: 'John Smith', initials: 'JS', activeCount: 2 },
  { id: 'mc', fullName: 'Maria Chen', initials: 'MC', activeCount: 2 },
]

export const managerAssignmentsInitialUnassigned = [
  {
    id: 'ua-1',
    studentName: 'Oliver Thompson',
    applicationId: 'ENR-2024-0002',
    statusKey: 'submitted',
  },
  {
    id: 'ua-2',
    studentName: 'Mia Patel',
    applicationId: 'ENR-2024-0003',
    statusKey: 'adminReview',
  },
]

/** Max active count used to scale the progress bar (visual cap). */
export const managerAssignmentsProgressCap = 6
