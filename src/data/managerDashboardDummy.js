/**
 * Dummy data for the School Administrator (Manager) dashboard.
 * Edit this file to change copy, metrics, workload, and queue rows.
 */

export const managerUserProfile = {
  fullName: 'David Jones',
  email: 'david.jones@school.nz',
  initials: 'DJ',
}

/** Top KPI strip — `icon` matches NavIcon `name` for the home page icon map */
export const managerHomeKpis = [
  {
    id: 'totalActive',
    title: 'Total Active',
    value: 4,
    hint: 'In processing',
    icon: 'document',
  },
  {
    id: 'unassigned',
    title: 'Unassigned',
    value: 2,
    hint: 'Need assignment',
    icon: 'userPlus',
  },
  {
    id: 'overdue',
    title: 'Overdue',
    value: 3,
    hint: '> 7 days in current stage',
    icon: 'clock',
  },
  {
    id: 'sltMembers',
    title: 'SLT Members',
    value: 2,
    hint: 'Available reviewers',
    icon: 'users',
  },
]

/**
 * SLT workload cards — `progressPercent` controls the bar fill (0–100).
 */
export const managerSltWorkloadMembers = [
  {
    id: 'js',
    fullName: 'John Smith',
    email: 'john.smith@school.nz',
    initials: 'JS',
    activeAssignments: 2,
    progressPercent: 72,
  },
  {
    id: 'mc',
    fullName: 'Maria Chen',
    email: 'maria.chen@school.nz',
    initials: 'MC',
    activeAssignments: 1,
    progressPercent: 44,
  },
]

/**
 * Application queue rows — `statusKey` / `priorityKey` must match
 * `src/config/enrollmentApplicationUi.js` and pill CSS modifiers.
 * `assigneeName`: string or null (renders as Unassigned).
 */
export const managerApplicationQueueRows = [
  {
    id: 'r1',
    studentName: 'Emma Williams',
    applicationId: 'ENR-2024-0001',
    yearLevel: 'Year 1',
    statusKey: 'draft',
    assigneeName: 'John Smith',
    priorityKey: 'normal',
    updatedLabel: '14 May',
    updatedNeedsAttention: false,
  },
  {
    id: 'r2',
    studentName: 'Oliver Brown',
    applicationId: 'ENR-2024-0002',
    yearLevel: 'Year 3',
    statusKey: 'submitted',
    assigneeName: null,
    priorityKey: 'high',
    updatedLabel: '12 May',
    updatedNeedsAttention: false,
  },
  {
    id: 'r3',
    studentName: 'Sophia Martinez',
    applicationId: 'ENR-2024-0003',
    yearLevel: 'Year 2',
    statusKey: 'adminReview',
    assigneeName: 'Maria Chen',
    priorityKey: 'normal',
    updatedLabel: '03 Feb',
    updatedNeedsAttention: true,
  },
  {
    id: 'r4',
    studentName: 'Liam Wilson',
    applicationId: 'ENR-2024-0004',
    yearLevel: 'Year 2',
    statusKey: 'interviewScheduled',
    assigneeName: 'John Smith',
    priorityKey: 'low',
    updatedLabel: '10 May',
    updatedNeedsAttention: false,
  },
  {
    id: 'r5',
    studentName: 'Ava Thompson',
    applicationId: 'ENR-2024-0005',
    yearLevel: 'Year 1',
    statusKey: 'approved',
    assigneeName: 'Maria Chen',
    priorityKey: 'normal',
    updatedLabel: '08 May',
    updatedNeedsAttention: false,
  },
  {
    id: 'r6',
    studentName: 'Noah Davis',
    applicationId: 'ENR-2024-0006',
    yearLevel: 'Year 2',
    statusKey: 'waitlisted',
    assigneeName: null,
    priorityKey: 'high',
    updatedLabel: '01 Feb',
    updatedNeedsAttention: true,
  },
  {
    id: 'r7',
    studentName: 'Mia Garcia',
    applicationId: 'ENR-2024-0007',
    yearLevel: 'Year 4',
    statusKey: 'declined',
    assigneeName: 'John Smith',
    priorityKey: 'normal',
    updatedLabel: '28 Apr',
    updatedNeedsAttention: false,
  },
  {
    id: 'r8',
    studentName: 'James Robinson',
    applicationId: 'ENR-2024-0008',
    yearLevel: 'Year 5',
    statusKey: 'submitted',
    assigneeName: 'Maria Chen',
    priorityKey: 'low',
    updatedLabel: '22 Apr',
    updatedNeedsAttention: false,
  },
  {
    id: 'r9',
    studentName: 'Charlotte Lee',
    applicationId: 'ENR-2024-0009',
    yearLevel: 'Year 1',
    statusKey: 'adminReview',
    assigneeName: null,
    priorityKey: 'normal',
    updatedLabel: '15 Jan',
    updatedNeedsAttention: true,
  },
  {
    id: 'r10',
    studentName: 'Lucas Taylor',
    applicationId: 'ENR-2024-0010',
    yearLevel: 'Year 3',
    statusKey: 'draft',
    assigneeName: 'John Smith',
    priorityKey: 'high',
    updatedLabel: '14 May',
    updatedNeedsAttention: false,
  },
]

/** Options in the “Assign N selected” bulk dropdown (edit to match your school’s SLT list). */
export const managerBulkAssigneeOptions = ['John Smith', 'Maria Chen']
