/**
 * Dummy data for the School Administrator (Manager) dashboard.
 * Canonical application list: `managerApplicationRecords` (home queue + Applications tab).
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
    value: 9,
    hint: 'In processing',
    icon: 'document',
  },
  {
    id: 'unassigned',
    title: 'Unassigned',
    value: 4,
    hint: 'Need assignment',
    icon: 'userPlus',
  },
  {
    id: 'overdue',
    title: 'Overdue',
    value: 2,
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
 * Canonical manager application rows — used on Home (queue) and Applications tab.
 * `statusKey` / `priorityKey` must match `src/config/enrollmentApplicationUi.js`.
 */
export const managerApplicationRecords = [
  {
    id: 'app-1',
    studentName: 'Oliver Thompson',
    applicationId: 'ENR-2024-0002',
    yearLevel: 'Year 2',
    statusKey: 'submitted',
    assigneeName: null,
    priorityKey: 'high',
    submittedOn: '03 Feb 2024',
    updatedOn: '03 Feb 2024',
    updatedLabel: '03 Feb',
    updatedNeedsAttention: false,
  },
  {
    id: 'app-2',
    studentName: 'Mia Patel',
    applicationId: 'ENR-2024-0003',
    yearLevel: 'Year 1',
    statusKey: 'adminReview',
    assigneeName: null,
    priorityKey: 'normal',
    submittedOn: '01 Feb 2024',
    updatedOn: '04 Feb 2024',
    updatedLabel: '04 Feb',
    updatedNeedsAttention: false,
  },
  {
    id: 'app-3',
    studentName: 'Liam Wilson',
    applicationId: 'ENR-2024-0004',
    yearLevel: 'Year 2',
    statusKey: 'sltReview',
    assigneeName: 'John Smith',
    priorityKey: 'normal',
    submittedOn: '25 Jan 2024',
    updatedOn: '05 Feb 2024',
    updatedLabel: '05 Feb',
    updatedNeedsAttention: false,
  },
  {
    id: 'app-4',
    studentName: 'Sophie Brown',
    applicationId: 'ENR-2024-0005',
    yearLevel: 'Year 1',
    statusKey: 'interviewScheduled',
    assigneeName: 'Maria Chen',
    priorityKey: 'low',
    submittedOn: '18 Jan 2024',
    updatedOn: '06 Feb 2024',
    updatedLabel: '06 Feb',
    updatedNeedsAttention: false,
  },
  {
    id: 'app-5',
    studentName: 'Noah Davis',
    applicationId: 'ENR-2024-0006',
    yearLevel: 'Year 2',
    statusKey: 'decisionPending',
    assigneeName: 'John Smith',
    priorityKey: 'normal',
    submittedOn: '12 Jan 2024',
    updatedOn: '08 Feb 2024',
    updatedLabel: '08 Feb',
    updatedNeedsAttention: false,
  },
  {
    id: 'app-6',
    studentName: 'Ava Martinez',
    applicationId: 'ENR-2024-0007',
    yearLevel: 'Year 1',
    statusKey: 'approved',
    assigneeName: 'Maria Chen',
    priorityKey: 'normal',
    submittedOn: '05 Jan 2024',
    updatedOn: '10 Feb 2024',
    updatedLabel: '10 Feb',
    updatedNeedsAttention: false,
  },
  {
    id: 'app-7',
    studentName: 'Jack Anderson',
    applicationId: 'ENR-2024-0008',
    yearLevel: 'Year 3',
    statusKey: 'waitlisted',
    assigneeName: null,
    priorityKey: 'low',
    submittedOn: '02 Jan 2024',
    updatedOn: '11 Feb 2024',
    updatedLabel: '11 Feb',
    updatedNeedsAttention: false,
  },
  {
    id: 'app-8',
    studentName: 'Ethan Clark',
    applicationId: 'ENR-2024-0009',
    yearLevel: 'Year 4',
    statusKey: 'declined',
    assigneeName: 'Maria Chen',
    priorityKey: 'normal',
    submittedOn: '28 Dec 2023',
    updatedOn: '09 Feb 2024',
    updatedLabel: '09 Feb',
    updatedNeedsAttention: true,
  },
  {
    id: 'app-9',
    studentName: 'Emma Williams',
    applicationId: 'ENR-2024-0001',
    yearLevel: 'Year 1',
    statusKey: 'draft',
    assigneeName: null,
    priorityKey: 'normal',
    submittedOn: '—',
    updatedOn: '14 May 2024',
    updatedLabel: '14 May',
    updatedNeedsAttention: false,
  },
]

/** Home “Application Queue” table shape (derived from canonical records). */
export const managerApplicationQueueRows = managerApplicationRecords.map((r) => ({
  id: r.id,
  studentName: r.studentName,
  applicationId: r.applicationId,
  yearLevel: r.yearLevel,
  statusKey: r.statusKey,
  assigneeName: r.assigneeName,
  priorityKey: r.priorityKey,
  updatedLabel: r.updatedLabel,
  updatedNeedsAttention: r.updatedNeedsAttention,
}))

/** Options in the “Assign N selected” bulk dropdown (edit to match your school’s SLT list). */
export const managerBulkAssigneeOptions = ['John Smith', 'Maria Chen']

/**
 * Task queue items — `statusKey` matches enrolment pills; sort by `daysOverdue` descending for “oldest first”.
 */
export const managerTaskQueueItems = [
  {
    id: 'tq-1',
    studentName: 'Oliver Thompson',
    applicationId: 'ENR-2024-0002',
    statusKey: 'submitted',
    daysOverdue: 831,
    priorityKey: 'normal',
  },
  {
    id: 'tq-2',
    studentName: 'Mia Patel',
    applicationId: 'ENR-2024-0003',
    statusKey: 'adminReview',
    daysOverdue: 830,
    priorityKey: 'high',
  },
  {
    id: 'tq-3',
    studentName: 'Liam Wilson',
    applicationId: 'ENR-2024-0004',
    statusKey: 'sltReview',
    daysOverdue: 829,
    priorityKey: 'normal',
  },
  {
    id: 'tq-4',
    studentName: 'Sophie Brown',
    applicationId: 'ENR-2024-0005',
    statusKey: 'interviewScheduled',
    daysOverdue: 828,
    priorityKey: 'normal',
  },
  {
    id: 'tq-5',
    studentName: 'Noah Davis',
    applicationId: 'ENR-2024-0006',
    statusKey: 'decisionPending',
    daysOverdue: 826,
    priorityKey: 'normal',
  },
  {
    id: 'tq-6',
    studentName: 'Emma Williams',
    applicationId: 'ENR-2024-0001',
    statusKey: 'draft',
    daysOverdue: 820,
    priorityKey: 'high',
  },
]
