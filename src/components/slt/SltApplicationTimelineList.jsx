import { IconCheck, IconClock, IconWorkflow } from '../icons/NavIcons.jsx'

/**
 * @param {object} props
 * @param {{ id: string, title: string, actor: string, dateTimeLabel: string }[]} props.events
 */
function SltApplicationTimelineList({ events }) {
  const list = Array.isArray(events) ? events : []

  if (list.length === 0) {
    return (
      <section className="slt-rq-timeline slt-rq-timeline--empty" aria-label="Timeline">
        <span className="slt-rq-timeline__empty-icon" aria-hidden="true">
          <IconWorkflow width={36} height={36} />
        </span>
        <p className="slt-rq-timeline__empty-text">Timeline events will appear here.</p>
      </section>
    )
  }

  return (
    <section className="slt-rq-timeline" aria-label="Application timeline">
      <ol className="slt-rq-timeline__list">
        {list.map((ev, index) => {
          const isFirst = index === 0
          return (
            <li key={ev.id} className="slt-rq-timeline__item">
              <div className="slt-rq-timeline__node-col">
                <span
                  className={[
                    'slt-rq-timeline__node',
                    isFirst ? 'slt-rq-timeline__node--start' : 'slt-rq-timeline__node--done',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {isFirst ? (
                    <IconClock width={18} height={18} strokeWidth={2} />
                  ) : (
                    <IconCheck width={18} height={18} strokeWidth={2.25} />
                  )}
                </span>
              </div>
              <div className="slt-rq-timeline__body">
                <p className="slt-rq-timeline__title">{ev.title}</p>
                <p className="slt-rq-timeline__meta">
                  {ev.actor}
                  <span aria-hidden="true"> • </span>
                  {ev.dateTimeLabel}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default SltApplicationTimelineList
