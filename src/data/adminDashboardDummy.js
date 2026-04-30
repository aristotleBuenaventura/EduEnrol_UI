export const adminUserProfile = {
  firstName: 'System',
  fullName: 'System Administrator',
  email: 'admin@school.nz',
  initials: 'SA',
}

export const adminMetricCards = [
  {
    id: 'total-applications',
    label: 'Total Applications',
    value: '10',
    trend: { direction: 'up', value: '15% vs last month' },
    icon: 'document',
  },
  {
    id: 'avg-processing',
    label: 'Avg. Processing Time',
    value: '12 days',
    trend: { direction: 'down', value: '8% vs last month' },
    icon: 'clock',
  },
  {
    id: 'approval-rate',
    label: 'Approval Rate',
    value: '78%',
    trend: { direction: 'up', value: '3% vs last month' },
    icon: 'check',
  },
  {
    id: 'in-zone-rate',
    label: 'In-Zone Rate',
    value: '70%',
    trend: null,
    icon: 'users',
  },
]

export const adminApplicationsByStatus = [
  { label: 'Draft', value: 1, color: '#9ca3af' },
  { label: 'Submitted', value: 1, color: '#0ea5e9' },
  { label: 'Admin Review', value: 1, color: '#f59e0b' },
  { label: 'SLT Review', value: 2, color: '#eab308' },
]

export const adminApplicationsByYearLevel = [
  { label: 'Year 0', value: 1 },
  { label: 'Year 1', value: 4 },
  { label: 'Year 2', value: 5 },
]

export const adminIntegrations = [
  {
    id: 'enrol',
    name: 'ENROL',
    description: 'Ministry of Education',
    statusLabel: 'Connected',
    statusTone: 'connected',
  },
  {
    id: 'schooltalk',
    name: 'SchoolTalk',
    description: 'Parent Communication',
    statusLabel: 'Connected',
    statusTone: 'connected',
  },
  {
    id: 'etap',
    name: 'ETAP',
    description: 'Student Management',
    statusLabel: 'Syncing...',
    statusTone: 'syncing',
  },
]

export const adminRecentApplications = [
  {
    id: 'ava',
    studentName: 'Ava Martinez',
    meta: 'ENR-2024-0007 • Year 1',
    statusLabel: 'Approved',
    statusTone: 'approved',
    date: '10 Feb',
  },
  {
    id: 'jack',
    studentName: 'Jack Anderson',
    meta: 'ENR-2024-0008 • Year 2',
    statusLabel: 'Waitlisted',
    statusTone: 'waitlisted',
    date: '09 Feb',
  },
  {
    id: 'noah',
    studentName: 'Noah Davis',
    meta: 'ENR-2024-0006 • Year 2',
    statusLabel: 'Decision Pending',
    statusTone: 'pending',
    date: '08 Feb',
  },
  {
    id: 'lucas',
    studentName: 'Lucas Taylor',
    meta: 'ENR-2024-0010 • Year 2',
    statusLabel: 'SLT Review',
    statusTone: 'review',
    date: '08 Feb',
  },
  {
    id: 'charlotte',
    studentName: 'Charlotte White',
    meta: 'ENR-2024-0009 • Year 1',
    statusLabel: 'Declined',
    statusTone: 'declined',
    date: '07 Feb',
  },
]

export const adminRuleViolations = [
  {
    id: 'oliver',
    studentName: 'Oliver Thompson',
    issueCountLabel: '1 issue(s)',
    violations: [{ id: 'out-of-zone', message: 'Address is outside school zone', tone: 'warning' }],
  },
  {
    id: 'jack',
    studentName: 'Jack Anderson',
    issueCountLabel: '2 issue(s)',
    violations: [
      { id: 'zone-warning', message: 'Address is outside school zone', tone: 'warning' },
      { id: 'capacity', message: 'Year 2 has reached capacity (30/30)', tone: 'critical' },
    ],
  },
  {
    id: 'charlotte',
    studentName: 'Charlotte White',
    issueCountLabel: '1 issue(s)',
    violations: [{ id: 'far-out-zone', message: 'Address is significantly outside school zone', tone: 'critical' }],
  },
]
