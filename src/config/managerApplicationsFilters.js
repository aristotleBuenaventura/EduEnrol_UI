/**
 * Fixed status filter options for the Manager Applications tab.
 * `value` matches `statusKey` on application records (`interviewScheduled` shows as "Interview").
 */

export const managerApplicationsStatusFilters = [
  { value: 'all', label: 'All Statuses' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'adminReview', label: 'Admin Review' },
  { value: 'sltReview', label: 'SLT Review' },
  { value: 'interviewScheduled', label: 'Interview' },
  { value: 'decisionPending', label: 'Decision Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'declined', label: 'Declined' },
  { value: 'waitlisted', label: 'Waitlisted' },
  { value: 'draft', label: 'Draft' },
]
