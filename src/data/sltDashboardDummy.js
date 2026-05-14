export const sltUserProfile = {
  fullName: 'John Smith',
  email: 'john.smith@school.nz',
  initials: 'JS',
}

/** Summary metrics for SLT home */
export const sltHomeStats = [
  {
    id: 'pendingReviews',
    title: 'Pending Reviews',
    value: 1,
    hint: 'Awaiting your review',
  },
  {
    id: 'upcomingInterviews',
    title: 'Upcoming Interviews',
    value: 0,
    hint: 'Scheduled this week',
  },
  {
    id: 'pendingDecisions',
    title: 'Pending Decisions',
    value: 1,
    hint: 'Interview completed',
  },
  {
    id: 'completedMonth',
    title: 'Completed This Month',
    value: 0,
    hint: 'Decisions made',
  },
]

export const sltReviewQueuePreview = {
  studentName: 'Liam Wilson',
  referenceCode: 'ENR-2024-0004',
  yearLevel: 'Year 2',
}

export const sltDecisionPendingPreview = {
  studentName: 'Noah Davis',
  yearLevel: 'Year 2',
  zoneLabel: 'In Zone',
  interviewNote: 'Interview: Positive',
  statusLabel: 'Decision Pending',
}
