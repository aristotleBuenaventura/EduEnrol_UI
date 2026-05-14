/**
 * Shared labels for enrolment application queue UI.
 * Keys map to CSS modifiers on {@link ../components/dashboard/EnrollmentStatusPill.jsx}
 * and {@link ../components/dashboard/EnrollmentPriorityPill.jsx}.
 */

export const enrollmentStatusLabels = {
  draft: 'Draft',
  submitted: 'Submitted',
  adminReview: 'Admin Review',
  sltReview: 'SLT Review',
  interviewScheduled: 'Interview Scheduled',
  decisionPending: 'Decision Pending',
  approved: 'Approved',
  waitlisted: 'Waitlisted',
  declined: 'Declined',
}

export const enrollmentPriorityLabels = {
  normal: 'normal',
  high: 'high',
  low: 'low',
}
