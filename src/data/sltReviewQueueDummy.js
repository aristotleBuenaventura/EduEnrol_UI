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
  documents: [],
  timeline: [],
  notes: [],
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
      documents: [
        { id: 'enr-0004-bc', fileName: 'liam_bc.pdf', documentType: 'Birth Certificate' },
        { id: 'enr-0004-imm', fileName: 'imm_records.pdf', documentType: 'Immunisation' },
      ],
      timeline: [
        {
          id: 't4-1',
          title: 'Draft → Submitted',
          actor: 'Emma Wilson',
          dateTimeLabel: '25 Jan 2024, 08:00',
        },
        {
          id: 't4-2',
          title: 'Submitted → Admin Review',
          actor: 'David Jones',
          dateTimeLabel: '28 Jan 2024, 08:00',
        },
        {
          id: 't4-3',
          title: 'Admin Review → Slt Review',
          actor: 'David Jones',
          dateTimeLabel: '05 Feb 2024, 08:00',
        },
      ],
      notes: [
        {
          id: 'n4-demo',
          authorName: 'Current User',
          createdAt: '2024-05-14T11:12:00+12:00',
          body: `Information request sent to emma.w@email.com
Subject: Additional information required — Application ENR-2024-0004

Kia ora Emma,

Thank you for submitting an enrolment application for Liam Wilson (ENR-2024-0004).

To proceed with the review, we need the following additional information:

•
•
•

Please reply to this email with the requested details at your earliest convenience.

Ngā mihi,
Senior Leadership Team`,
        },
      ],
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
      documents: [
        { id: 'enr-0005-bc', fileName: 'sophie_birth_cert.pdf', documentType: 'Birth Certificate' },
        { id: 'enr-0005-id', fileName: 'passport_scan.pdf', documentType: 'Proof of identity' },
        { id: 'enr-0005-res', fileName: 'proof_of_address.pdf', documentType: 'Proof of address' },
      ],
      timeline: [
        {
          id: 't5-1',
          title: 'Draft → Submitted',
          actor: 'James Brown',
          dateTimeLabel: '18 Jan 2024, 14:20',
        },
        {
          id: 't5-2',
          title: 'Submitted → Admin Review',
          actor: 'David Jones',
          dateTimeLabel: '19 Jan 2024, 09:15',
        },
        {
          id: 't5-3',
          title: 'Admin Review → Slt Review',
          actor: 'David Jones',
          dateTimeLabel: '22 Jan 2024, 11:00',
        },
        {
          id: 't5-4',
          title: 'Slt Review → Interview Scheduled',
          actor: 'John Smith',
          dateTimeLabel: '30 Jan 2024, 15:45',
        },
      ],
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
      documents: [
        { id: 'enr-0006-bc', fileName: 'noah_birth_certificate.pdf', documentType: 'Birth Certificate' },
        { id: 'enr-0006-health', fileName: 'health_questionnaire.pdf', documentType: 'Health questionnaire' },
      ],
      timeline: [
        {
          id: 't6-1',
          title: 'Draft → Submitted',
          actor: 'Rachel Davis',
          dateTimeLabel: '26 Jan 2024, 10:05',
        },
        {
          id: 't6-2',
          title: 'Submitted → Admin Review',
          actor: 'David Jones',
          dateTimeLabel: '27 Jan 2024, 08:30',
        },
        {
          id: 't6-3',
          title: 'Admin Review → Slt Review',
          actor: 'David Jones',
          dateTimeLabel: '01 Feb 2024, 09:00',
        },
        {
          id: 't6-4',
          title: 'Slt Review → Interview Scheduled',
          actor: 'John Smith',
          dateTimeLabel: '08 Feb 2024, 13:10',
        },
        {
          id: 't6-5',
          title: 'Interview Scheduled → Decision Pending',
          actor: 'John Smith',
          dateTimeLabel: '12 Feb 2024, 16:00',
        },
      ],
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
      documents: [
        { id: 'enr-0010-bc', fileName: 'lucas_birth_cert.pdf', documentType: 'Birth Certificate' },
        { id: 'enr-0010-imm', fileName: 'immunisation_record.pdf', documentType: 'Immunisation' },
        { id: 'enr-0010-res', fileName: 'utilities_bill.pdf', documentType: 'Proof of residence' },
      ],
      timeline: [
        {
          id: 't10-1',
          title: 'Draft → Submitted',
          actor: 'Amanda Taylor',
          dateTimeLabel: '01 Feb 2024, 11:22',
        },
        {
          id: 't10-2',
          title: 'Submitted → Admin Review',
          actor: 'David Jones',
          dateTimeLabel: '02 Feb 2024, 08:00',
        },
        {
          id: 't10-3',
          title: 'Admin Review → Slt Review',
          actor: 'David Jones',
          dateTimeLabel: '04 Feb 2024, 09:30',
        },
      ],
    }),
  },
]
