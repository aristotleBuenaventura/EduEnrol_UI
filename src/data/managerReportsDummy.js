/**
 * Manager → Reports dummy data (edit to change metrics and lists).
 * Chart bar width uses max count in `managerReportsStatusBreakdown`.
 */

export const managerReportsKpis = [
  {
    id: 'total',
    title: 'Total applications',
    value: 10,
    iconTone: 'chart',
  },
  {
    id: 'approved',
    title: 'Approved',
    value: 1,
    iconTone: 'check',
  },
  {
    id: 'declined',
    title: 'Declined',
    value: 1,
    iconTone: 'x',
  },
  {
    id: 'avg',
    title: 'Avg processing time',
    value: '848d',
    iconTone: 'clock',
  },
]

/** Row order matches the “Applications by Status” chart top-to-bottom */
export const managerReportsStatusBreakdown = [
  { statusKey: 'draft', chartLabel: 'Draft', count: 1 },
  { statusKey: 'submitted', chartLabel: 'Submitted', count: 1 },
  { statusKey: 'adminReview', chartLabel: 'Admin Review', count: 1 },
  { statusKey: 'sltReview', chartLabel: 'SLT Review', count: 2 },
  { statusKey: 'interviewScheduled', chartLabel: 'Interview', count: 1 },
  { statusKey: 'decisionPending', chartLabel: 'Decision Pending', count: 1 },
  { statusKey: 'approved', chartLabel: 'Approved', count: 1 },
  { statusKey: 'waitlisted', chartLabel: 'Waitlisted', count: 1 },
  { statusKey: 'declined', chartLabel: 'Declined', count: 1 },
]

/** Flat list for detail sections — grouped by `statusKey` on the page */
export const managerReportsApplications = [
  { statusKey: 'draft', studentName: 'Emma Williams', applicationId: 'ENR-2024-0001' },
  { statusKey: 'submitted', studentName: 'Oliver Thompson', applicationId: 'ENR-2024-0002' },
  { statusKey: 'adminReview', studentName: 'Mia Patel', applicationId: 'ENR-2024-0003' },
  { statusKey: 'sltReview', studentName: 'Liam Wilson', applicationId: 'ENR-2024-0004' },
  { statusKey: 'sltReview', studentName: 'Aria Kim', applicationId: 'ENR-2024-0010' },
  { statusKey: 'interviewScheduled', studentName: 'Sophie Brown', applicationId: 'ENR-2024-0005' },
  { statusKey: 'decisionPending', studentName: 'Noah Davis', applicationId: 'ENR-2024-0006' },
  { statusKey: 'approved', studentName: 'Ava Martinez', applicationId: 'ENR-2024-0007' },
  { statusKey: 'waitlisted', studentName: 'Jack Anderson', applicationId: 'ENR-2024-0008' },
  { statusKey: 'declined', studentName: 'Sarah Miller', applicationId: 'ENR-2024-0009' },
]

export const managerReportsBarMaxCount = Math.max(
  ...managerReportsStatusBreakdown.map((row) => row.count),
  1,
)
