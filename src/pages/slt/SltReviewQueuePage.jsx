import { useCallback, useMemo, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import AppToast from '../../components/ui/AppToast.jsx'
import PanelEmptyState from '../../components/ui/PanelEmptyState.jsx'
import SltApplicationReviewDetail from '../../components/slt/SltApplicationReviewDetail.jsx'
import ScheduleInterviewModal from '../../components/slt/ScheduleInterviewModal.jsx'
import RequestAdditionalInfoModal from '../../components/slt/RequestAdditionalInfoModal.jsx'
import SltResolvedApplicationCard from '../../components/slt/SltResolvedApplicationCard.jsx'
import SltReviewQueueListItem from '../../components/slt/SltReviewQueueListItem.jsx'
import { IconDocument } from '../../components/icons/NavIcons.jsx'
import { sltReviewQueueInitialItems } from '../../data/sltReviewQueueDummy.js'
import { buildRequestInfoEmailBody, caregiverFirstName } from '../../data/requestAdditionalInfoEmailTemplate.js'
import '../../styles/enrollment-pills.css'
import '../../styles/panel-empty-state.css'
import '../../styles/slt-review-queue-page.css'

function rowMatchesSearch(item, query) {
  const t = query.trim().toLowerCase()
  if (!t) return true
  const blob = `${item.studentName} ${item.applicationId} ${item.yearLevel}`.toLowerCase()
  return blob.includes(t)
}

function SltReviewQueuePage() {
  const outlet = useOutletContext()
  const layoutSearch = typeof outlet?.searchQuery === 'string' ? outlet.searchQuery : ''

  const [queue, setQueue] = useState(() => [...sltReviewQueueInitialItems])
  const [selectedId, setSelectedId] = useState(null)
  const [lastResolved, setLastResolved] = useState(null)
  const [scheduleModalItemId, setScheduleModalItemId] = useState(null)
  const [requestInfoModalItemId, setRequestInfoModalItemId] = useState(null)
  const [toast, setToast] = useState(null)
  const toastSeq = useRef(0)

  const dismissToast = useCallback(() => setToast(null), [])

  const pushToast = useCallback((payload) => {
    toastSeq.current += 1
    setToast({ key: toastSeq.current, ...payload })
  }, [])

  const filteredQueue = useMemo(
    () => queue.filter((item) => rowMatchesSearch(item, layoutSearch)),
    [queue, layoutSearch],
  )

  const effectiveSelectedId = useMemo(() => {
    if (!selectedId) return null
    return filteredQueue.some((i) => i.id === selectedId) ? selectedId : null
  }, [filteredQueue, selectedId])

  const selectedItem = useMemo(() => {
    if (!effectiveSelectedId) return null
    return queue.find((i) => i.id === effectiveSelectedId) ?? null
  }, [queue, effectiveSelectedId])

  const requestInfoModalPayload = useMemo(() => {
    if (!requestInfoModalItemId) return null
    const row = queue.find((i) => i.id === requestInfoModalItemId)
    if (!row?.detail?.caregiver) return null
    const first = caregiverFirstName(row.detail.caregiver.name)
    return {
      initialTo: row.detail.caregiver.email,
      initialSubject: `Additional information required — Application ${row.applicationId}`,
      initialMessage: buildRequestInfoEmailBody({
        caregiverFirstName: first,
        studentName: row.studentName,
        applicationId: row.applicationId,
      }),
    }
  }, [queue, requestInfoModalItemId])

  const removeFromQueue = useCallback((id) => {
    setQueue((q) => q.filter((x) => x.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
  }, [])

  const handleApprove = useCallback(() => {
    if (!selectedItem) return
    setLastResolved({
      studentName: selectedItem.studentName,
      applicationId: selectedItem.applicationId,
      submittedLabel: selectedItem.submittedLabel,
      statusKey: 'approved',
    })
    removeFromQueue(selectedItem.id)
    pushToast({
      title: 'Application approved',
      description: 'Student record will be created and synced.',
    })
  }, [pushToast, removeFromQueue, selectedItem])

  const handleWaitlist = useCallback(() => {
    if (!selectedItem) return
    setLastResolved({
      studentName: selectedItem.studentName,
      applicationId: selectedItem.applicationId,
      submittedLabel: selectedItem.submittedLabel,
      statusKey: 'waitlisted',
    })
    removeFromQueue(selectedItem.id)
    pushToast({ title: 'Application waitlisted' })
  }, [pushToast, removeFromQueue, selectedItem])

  const handleDecline = useCallback(() => {
    if (!selectedItem) return
    setLastResolved({
      studentName: selectedItem.studentName,
      applicationId: selectedItem.applicationId,
      submittedLabel: selectedItem.submittedLabel,
      statusKey: 'declined',
    })
    removeFromQueue(selectedItem.id)
    pushToast({ title: 'Application declined' })
  }, [pushToast, removeFromQueue, selectedItem])

  const handleOpenScheduleInterview = useCallback(() => {
    if (!selectedItem || selectedItem.statusKey !== 'sltReview') return
    setScheduleModalItemId(selectedItem.id)
  }, [selectedItem])

  const handleConfirmScheduleInterview = useCallback(() => {
    if (!scheduleModalItemId) return
    setQueue((q) =>
      q.map((row) =>
        row.id === scheduleModalItemId ? { ...row, statusKey: 'interviewScheduled' } : row,
      ),
    )
    setScheduleModalItemId(null)
    pushToast({
      title: 'Interview scheduled',
      description: 'The application status has been updated to Interview Scheduled.',
    })
  }, [pushToast, scheduleModalItemId])

  const handleRequestInfo = useCallback(() => {
    if (!selectedItem) return
    setRequestInfoModalItemId(selectedItem.id)
  }, [selectedItem])

  const closeRequestInfoModal = useCallback(() => {
    setRequestInfoModalItemId(null)
  }, [])

  const appendQueueNote = useCallback((rowId, note) => {
    setQueue((q) =>
      q.map((row) =>
        row.id === rowId
          ? {
              ...row,
              detail: {
                ...row.detail,
                notes: [note, ...(row.detail.notes ?? [])],
              },
            }
          : row,
      ),
    )
  }, [])

  const handleAddNote = useCallback(
    (rowId, body) => {
      const trimmed = body.trim()
      if (!trimmed) return
      appendQueueNote(rowId, {
        id: crypto.randomUUID(),
        authorName: 'Current User',
        createdAt: new Date().toISOString(),
        body: trimmed,
      })
    },
    [appendQueueNote],
  )

  const handleSendRequestInfo = useCallback(
    ({ to, subject, message }) => {
      const rowId = requestInfoModalItemId
      if (rowId == null) return
      const noteBody = ['Information request sent to ' + to, 'Subject: ' + subject, '', message].join('\n')
      appendQueueNote(rowId, {
        id: crypto.randomUUID(),
        authorName: 'Current User',
        createdAt: new Date().toISOString(),
        body: noteBody,
      })
      setRequestInfoModalItemId(null)
      pushToast({
        title: 'Email sent to caregiver',
        description: `Sent to ${to}`,
      })
    },
    [appendQueueNote, pushToast, requestInfoModalItemId],
  )

  const closeScheduleModal = useCallback(() => {
    setScheduleModalItemId(null)
  }, [])

  return (
    <div className="slt-rq-page">
      <header className="slt-rq-page__hero">
        <h1 className="slt-rq-page__title">Application Review</h1>
        <p className="slt-rq-page__subtitle">Review and manage enrolment applications</p>
      </header>

      <div className="slt-rq-page__cols">
        <aside className="slt-rq-list-panel" aria-label="Review queue">
          <h2 className="slt-rq-list-panel__head">Review Queue ({filteredQueue.length})</h2>
          <div className="slt-rq-list-panel__list">
            {filteredQueue.length === 0 ? (
              <p className="slt-rq-list-panel__empty">No applications match your search.</p>
            ) : (
              filteredQueue.map((item) => (
                <SltReviewQueueListItem
                  key={item.id}
                  item={item}
                  selected={item.id === effectiveSelectedId}
                  onSelect={() => {
                    setScheduleModalItemId((mid) => (mid != null && item.id !== mid ? null : mid))
                    setRequestInfoModalItemId((rid) => (rid != null && item.id !== rid ? null : rid))
                    setSelectedId(item.id)
                  }}
                />
              ))
            )}
          </div>
        </aside>

        <section className="slt-rq-right" aria-label="Application detail">
          {selectedItem ? (
            <SltApplicationReviewDetail
              item={selectedItem}
              onRequestInfo={handleRequestInfo}
              onOpenScheduleInterview={handleOpenScheduleInterview}
              onApprove={handleApprove}
              onWaitlist={handleWaitlist}
              onDecline={handleDecline}
              onAddNote={(body) => handleAddNote(selectedItem.id, body)}
            />
          ) : (
            <div className="slt-rq-right-card">
              <PanelEmptyState
                icon={<IconDocument width={40} height={40} />}
                title="Select an Application"
                description="Choose an application from the queue to start reviewing"
              />
            </div>
          )}
        </section>
      </div>

      {lastResolved ? (
        <div className="slt-rq-resolved">
          <p className="slt-rq-resolved__label">Latest decision</p>
          <SltResolvedApplicationCard
            studentName={lastResolved.studentName}
            applicationId={lastResolved.applicationId}
            submittedLabel={lastResolved.submittedLabel}
            statusKey={lastResolved.statusKey}
          />
        </div>
      ) : null}

      <ScheduleInterviewModal
        key={scheduleModalItemId ?? 'schedule-modal-closed'}
        isOpen={scheduleModalItemId != null}
        onClose={closeScheduleModal}
        onConfirm={handleConfirmScheduleInterview}
      />

      {requestInfoModalItemId != null && requestInfoModalPayload != null ? (
        <RequestAdditionalInfoModal
          key={requestInfoModalItemId}
          onClose={closeRequestInfoModal}
          initialTo={requestInfoModalPayload.initialTo}
          initialSubject={requestInfoModalPayload.initialSubject}
          initialMessage={requestInfoModalPayload.initialMessage}
          onSend={handleSendRequestInfo}
        />
      ) : null}

      {toast ? (
        <AppToast
          key={toast.key}
          title={toast.title}
          description={toast.description ? toast.description : undefined}
          onDismiss={dismissToast}
        />
      ) : null}
    </div>
  )
}

export default SltReviewQueuePage
