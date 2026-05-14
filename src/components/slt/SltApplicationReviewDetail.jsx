import { useMemo, useState } from 'react'
import EnrollmentStatusPill from '../dashboard/EnrollmentStatusPill.jsx'
import DetailFieldGrid from '../ui/DetailFieldGrid.jsx'
import SltApplicationDocumentsList from './SltApplicationDocumentsList.jsx'
import SltApplicationTimelineList from './SltApplicationTimelineList.jsx'
import SltApplicationNotesPanel from './SltApplicationNotesPanel.jsx'
import {
  IconCalendar,
  IconCheck,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
  IconUsers,
} from '../icons/NavIcons.jsx'
import '../../styles/enrollment-pills.css'
import '../../styles/detail-field-grid.css'

const TABS = [
  { id: 'student', label: 'Student Details' },
  { id: 'documents', label: 'Documents' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'notes', label: 'Notes' },
]

/**
 * @param {object} props
 * @param {object} props.item — queue row including nested `detail`
 * @param {() => void} props.onRequestInfo
 * @param {() => void} props.onOpenScheduleInterview
 * @param {() => void} props.onApprove
 * @param {() => void} props.onWaitlist
 * @param {() => void} props.onDecline
 * @param {(body: string) => void} props.onAddNote
 */
function SltApplicationReviewDetail({
  item,
  onRequestInfo,
  onOpenScheduleInterview,
  onApprove,
  onWaitlist,
  onDecline,
  onAddNote,
}) {
  const [activeTab, setActiveTab] = useState('student')
  const { detail } = item
  const canScheduleInterview = item.statusKey === 'sltReview'

  const studentRows = useMemo(
    () => [
      { id: 'fn', label: 'Full Name', value: detail.student.fullName },
      { id: 'dob', label: 'Date of Birth', value: detail.student.dateOfBirth },
      { id: 'g', label: 'Gender', value: detail.student.gender },
      { id: 'yl', label: 'Year Level', value: detail.student.yearLevel },
    ],
    [detail.student],
  )

  const caregiverRows = useMemo(
    () => [
      { id: 'n', label: 'Name', value: detail.caregiver.name },
      { id: 'r', label: 'Relationship', value: detail.caregiver.relationship },
      {
        id: 'e',
        label: 'Email',
        value: detail.caregiver.email,
        valuePrefix: <IconMail width={16} height={16} aria-hidden="true" />,
      },
      {
        id: 'p',
        label: 'Phone',
        value: detail.caregiver.phone,
        valuePrefix: <IconPhone width={16} height={16} aria-hidden="true" />,
      },
    ],
    [detail.caregiver],
  )

  return (
    <div className="slt-rq-detail">
      <div className="slt-rq-detail__scroll">
        <header className="slt-rq-detail__header-card">
          <div className="slt-rq-detail__header-main">
            <h2 className="slt-rq-detail__header-name">{item.studentName}</h2>
            <p className="slt-rq-detail__header-meta">
              {item.applicationId} <span aria-hidden="true">•</span> Submitted {item.submittedLabel}
            </p>
          </div>
          <EnrollmentStatusPill statusKey={item.statusKey} />
        </header>

        <div className="slt-rq-detail__tabs" role="tablist" aria-label="Application sections">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={['slt-rq-detail__tab', activeTab === tab.id ? 'slt-rq-detail__tab--active' : ''].join(' ')}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="slt-rq-detail__tab-panels" role="tabpanel">
          {activeTab === 'student' ? (
            <div className="slt-rq-detail__panel-stack">
              <section className="slt-rq-detail-card" aria-labelledby="slt-student-info-h">
                <h3 id="slt-student-info-h" className="slt-rq-detail-card__title">
                  <IconUser width={18} height={18} aria-hidden="true" />
                  Student Information
                </h3>
                <DetailFieldGrid rows={studentRows} />
              </section>

              <section className="slt-rq-detail-card" aria-labelledby="slt-caregiver-h">
                <h3 id="slt-caregiver-h" className="slt-rq-detail-card__title">
                  <IconUsers width={18} height={18} aria-hidden="true" />
                  Caregiver Information
                </h3>
                <DetailFieldGrid rows={caregiverRows} />
              </section>

              <section className="slt-rq-detail-card" aria-labelledby="slt-address-h">
                <h3 id="slt-address-h" className="slt-rq-detail-card__title">
                  <IconMapPin width={18} height={18} aria-hidden="true" />
                  Address &amp; Zoning
                </h3>
                <p className="slt-rq-detail-card__address">{detail.address.lines.join(', ')}</p>
                <span
                  className={[
                    'slt-rq-zone-pill',
                    detail.address.inZone ? 'slt-rq-zone-pill--in' : 'slt-rq-zone-pill--out',
                  ].join(' ')}
                >
                  {detail.address.inZone ? (
                    <>
                      <IconCheck width={14} height={14} aria-hidden="true" />
                      {detail.address.zoneLabel}
                    </>
                  ) : (
                    detail.address.zoneLabel
                  )}
                </span>
              </section>
            </div>
          ) : null}

          {activeTab === 'documents' ? (
            <SltApplicationDocumentsList documents={detail.documents ?? []} />
          ) : null}

          {activeTab === 'timeline' ? (
            <SltApplicationTimelineList events={detail.timeline ?? []} />
          ) : null}

          {activeTab === 'notes' ? (
            <SltApplicationNotesPanel notes={detail.notes ?? []} onAddNote={onAddNote} />
          ) : null}
        </div>
      </div>

      <footer className="slt-rq-detail__actions">
        <button type="button" className="slt-rq-action slt-rq-action--ghost" onClick={onRequestInfo}>
          Request Info
        </button>
        {canScheduleInterview ? (
          <button type="button" className="slt-rq-action slt-rq-action--ghost" onClick={onOpenScheduleInterview}>
            <IconCalendar width={18} height={18} aria-hidden="true" />
            Schedule Interview
          </button>
        ) : null}
        <button type="button" className="slt-rq-action slt-rq-action--approve" onClick={onApprove}>
          <IconCheck width={18} height={18} aria-hidden="true" />
          Approve
        </button>
        <button type="button" className="slt-rq-action slt-rq-action--waitlist" onClick={onWaitlist}>
          <IconClock width={18} height={18} aria-hidden="true" />
          Waitlist
        </button>
        <button type="button" className="slt-rq-action slt-rq-action--decline" onClick={onDecline}>
          Decline
        </button>
      </footer>
    </div>
  )
}

export default SltApplicationReviewDetail
