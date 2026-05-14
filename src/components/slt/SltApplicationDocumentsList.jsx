import { IconDocument, IconEye } from '../icons/NavIcons.jsx'

/**
 * @param {object} props
 * @param {{ id: string, fileName: string, documentType: string }[]} props.documents
 * @param {(doc: { id: string, fileName: string, documentType: string }) => void} [props.onView]
 */
function SltApplicationDocumentsList({ documents, onView }) {
  const list = Array.isArray(documents) ? documents : []

  if (list.length === 0) {
    return (
      <section className="slt-rq-docs slt-rq-docs--empty" aria-label="Documents">
        <span className="slt-rq-docs__empty-icon" aria-hidden="true">
          <IconDocument width={36} height={36} />
        </span>
        <p className="slt-rq-docs__empty-text">No documents attached for this application.</p>
      </section>
    )
  }

  return (
    <section className="slt-rq-docs" aria-label="Uploaded documents">
      <ul className="slt-rq-docs__list">
        {list.map((doc) => (
          <li key={doc.id} className="slt-rq-docs__row">
            <span className="slt-rq-docs__icon-wrap" aria-hidden="true">
              <IconDocument width={22} height={22} />
            </span>
            <div className="slt-rq-docs__main">
              <p className="slt-rq-docs__file-name">{doc.fileName}</p>
              <p className="slt-rq-docs__doc-type">{doc.documentType}</p>
            </div>
            <button
              type="button"
              className="slt-rq-docs__view-btn"
              onClick={() => onView?.(doc)}
              aria-label={`View ${doc.fileName}`}
            >
              <IconEye width={16} height={16} aria-hidden="true" />
              View
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SltApplicationDocumentsList
