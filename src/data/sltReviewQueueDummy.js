/**
 * Dummy SLT review queue — shape matches {@link ../pages/slt/SltReviewQueuePage.jsx} expectations.
 */

const baseDetail = (overrides) => ({
  student: {
    fullName: '',
    dateOfBirth: '',
    gender: '',
    yearLevel: '',
  },
  caregiver: {
    name: '',
    relationship: '',
    email: '',
    phone: '',
  },
  address: {
    lines: [],
    zoneLabel: 'In Zone',
    inZone: true,
  },
  ...overrides,
})

/** Initial queue rows for the SLT Application Review page. */
export const sltReviewQueueInitialItems = [
  {
    id: 'enr-2024-0004',
    studentName: 'Liam Wilson',
    applicationId: 'ENR-2024-0004',
    yearLevel: 'Year 2',
    statusKey: 'sltReview',
    submittedLabel: '15 Jan 2024',
    detail: baseDetail({
      student: {
        fullName: 'Liam Wilson',
        dateOfBirth: '22 Mar 2018',
        gender: 'Male',
        yearLevel: 'Year 2',
      },
      caregiver: {
        name: 'Emma Wilson',
        relationship: 'Mother',
        email: 'emma.w@email.com',
        phone: '021-555-0142',
      },
      address: {
        lines: ['14 Kelburn Parade', 'Kelburn, Wellington', '6012'],
        zoneLabel: 'In Zone',
        inZone: true,
      },
    }),
  },
  {
    id: 'enr-2024-0005',
    studentName: 'Sophie Brown',
    applicationId: 'ENR-2024-0005',
    yearLevel: 'Year 1',
    statusKey: 'interviewScheduled',
    submittedLabel: '20 Jan 2024',
    detail: baseDetail({
      student: {
        fullName: 'Sophie Brown',
        dateOfBirth: '04 Aug 2018',
        gender: 'Female',
        yearLevel: 'Year 1',
      },
      caregiver: {
        name: 'James Brown',
        relationship: 'Father',
        email: 'james.brown@email.com',
        phone: '027-555-0199',
      },
      address: {
        lines: ['8 Hobson Street', 'Thorndon, Wellington', '6011'],
        zoneLabel: 'Out of Zone',
        inZone: false,
      },
    }),
  },
  {
    id: 'enr-2024-0006',
    studentName: 'Noah Davis',
    applicationId: 'ENR-2024-0006',
    yearLevel: 'Year 2',
    statusKey: 'decisionPending',
    submittedLabel: '28 Jan 2024',
    detail: baseDetail({
      student: {
        fullName: 'Noah Davis',
        dateOfBirth: '11 Feb 2018',
        gender: 'Male',
        yearLevel: 'Year 2',
      },
      caregiver: {
        name: 'Rachel Davis',
        relationship: 'Mother',
        email: 'rachel.d@email.com',
        phone: '021-555-0601',
      },
      address: {
        lines: ['102 Adelaide Road', 'Newtown, Wellington', '6021'],
        zoneLabel: 'In Zone',
        inZone: true,
      },
    }),
  },
  {
    id: 'enr-2024-0010',
    studentName: 'Lucas Taylor',
    applicationId: 'ENR-2024-0010',
    yearLevel: 'Year 2',
    statusKey: 'sltReview',
    submittedLabel: '01 Feb 2024',
    detail: baseDetail({
      student: {
        fullName: 'Lucas Taylor',
        dateOfBirth: '09 Dec 2017',
        gender: 'Male',
        yearLevel: 'Year 2',
      },
      caregiver: {
        name: 'Amanda Taylor',
        relationship: 'Mother',
        email: 'amanda.t@email.com',
        phone: '021-555-0852',
      },
      address: {
        lines: ['23 Wadestown Road', 'Wadestown, Wellington', '6012'],
        zoneLabel: 'In Zone',
        inZone: true,
      },
    }),
  },
]
