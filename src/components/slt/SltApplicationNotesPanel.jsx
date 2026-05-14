import { useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { IconMessageCircle } from '../icons/NavIcons.jsx'

function formatNoteWhen(iso) {
  try {
    return format(parseISO(iso), 'd MMM, HH:mm')
  } catch {
    return ''
  }
}

/**
 * @param {object} props
 * @param {{ id: string, authorName: string, createdAt: string, body: string }[]} props.notes
 * @param {(body: string) => void} props.onAddNote
 * @param {string} [props.authorLabel]
 */
function SltApplicationNotesPanel({ notes, onAddNote, authorLabel = 'Current User' }) {
  const [draft, setDraft] = useState('')

  const sorted = useMemo(() => {
    const list = Array.isArray(notes) ? notes : []
    const t = (iso) => {
      const ms = parseISO(iso).getTime()
      return Number.isNaN(ms) ? 0 : ms
    }
    return [...list].sort((a, b) => t(b.createdAt) - t(a.createdAt))
  }, [notes])

  const submit = () => {
    const text = draft.trim()
    if (!text) return
    onAddNote(text)
    setDraft('')
  }

  return (
    <div className="slt-rq-notes">
      <div className="slt-rq-notes__composer">
        <label className="slt-rq-notes__label visually-hidden" htmlFor="slt-rq-note-input">
          Add a note
        </label>
        <div className="slt-rq-notes__composer-row">
          <textarea
            id="slt-rq-note-input"
            className="slt-rq-notes__textarea"
            rows={3}
            placeholder="Add a note..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                submit()
              }
            }}
          />
          <button
            type="button"
            className="slt-rq-notes__send"
            onClick={submit}
            disabled={!draft.trim()}
            aria-label="Add note"
          >
            <IconMessageCircle width={22} height={22} strokeWidth={1.85} />
          </button>
        </div>
      </div>

      {sorted.length > 0 ? (
        <ul className="slt-rq-notes__list">
          {sorted.map((note) => (
            <li key={note.id} className="slt-rq-notes__item">
              <div className="slt-rq-notes__item-head">
                <span className="slt-rq-notes__author">{note.authorName || authorLabel}</span>
                <time className="slt-rq-notes__when" dateTime={note.createdAt}>
                  {formatNoteWhen(note.createdAt)}
                </time>
              </div>
              <p className="slt-rq-notes__body">{note.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="slt-rq-notes__empty">No internal notes yet.</p>
      )}
    </div>
  )
}

export default SltApplicationNotesPanel
