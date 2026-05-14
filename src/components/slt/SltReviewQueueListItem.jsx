import EnrollmentStatusPill from '../dashboard/EnrollmentStatusPill.jsx'

/**
 * @param {object} props
 * @param {{
 *   id: string,
 *   studentName: string,
 *   applicationId: string,
 *   yearLevel: string,
 *   statusKey: string,
 * }} props.item
 * @param {boolean} props.selected
 * @param {() => void} props.onSelect
 */
function SltReviewQueueListItem({ item, selected, onSelect }) {
  return (
    <button
      type="button"
      className={['slt-rq-list-item', selected ? 'slt-rq-list-item--selected' : ''].join(' ')}
      onClick={onSelect}
      aria-current={selected ? 'true' : undefined}
    >
      <span className="slt-rq-list-item__main">
        <span className="slt-rq-list-item__name">{item.studentName}</span>
        <span className="slt-rq-list-item__meta">
          {item.applicationId} <span aria-hidden="true">•</span> {item.yearLevel}
        </span>
      </span>
      <EnrollmentStatusPill statusKey={item.statusKey} />
    </button>
  )
}

export default SltReviewQueueListItem
