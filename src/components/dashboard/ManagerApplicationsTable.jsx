import EnrollmentStatusPill from './EnrollmentStatusPill.jsx'
import { IconDocument, IconEye } from '../icons/NavIcons.jsx'
import '../../styles/enrollment-pills.css'
import '../../styles/manager-application-table.css'
import '../../styles/manager-applications-table.css'

/**
 * Applications tab table (no row selection).
 *
 * @param {object} props
 * @param {object[]} props.rows
 */
function ManagerApplicationsTable({ rows }) {
  return (
    <div className="manager-apps-card">
      <header className="manager-apps-card__head">
        <span className="manager-apps-card__doc-icon" aria-hidden="true">
          <IconDocument width={20} height={20} />
        </span>
        <h2 className="manager-apps-card__title">All Applications ({rows.length})</h2>
      </header>
      <div className="manager-apps-card__scroll">
        <table className="manager-app-table manager-apps-card__table">
          <thead>
            <tr>
              <th className="manager-app-table__th" scope="col">
                Application
              </th>
              <th className="manager-app-table__th" scope="col">
                Status
              </th>
              <th className="manager-app-table__th" scope="col">
                Assignee
              </th>
              <th className="manager-app-table__th" scope="col">
                Submitted
              </th>
              <th className="manager-app-table__th" scope="col">
                Updated
              </th>
              <th className="manager-app-table__th manager-app-table__th--action" scope="col">
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="manager-app-table__td" colSpan={6}>
                  <p className="manager-apps-card__empty">No applications match your filters.</p>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td className="manager-app-table__td">
                    <div className="manager-app-table__app">
                      <span className="manager-app-table__app-name">{row.studentName}</span>
                      <span className="manager-app-table__app-meta">
                        {row.applicationId} <span aria-hidden="true">·</span> {row.yearLevel}
                      </span>
                    </div>
                  </td>
                  <td className="manager-app-table__td">
                    <EnrollmentStatusPill statusKey={row.statusKey} />
                  </td>
                  <td className="manager-app-table__td">
                    {row.assigneeName ? (
                      <span className="manager-app-table__assignee">{row.assigneeName}</span>
                    ) : (
                      <span className="manager-app-table__assignee manager-app-table__assignee--unassigned">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="manager-app-table__td manager-apps-card__date">{row.submittedOn}</td>
                  <td className="manager-app-table__td manager-apps-card__date">{row.updatedOn}</td>
                  <td className="manager-app-table__td manager-app-table__td--action">
                    <button type="button" className="manager-apps-card__view-icon" aria-label={`View ${row.studentName}`}>
                      <IconEye width={20} height={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManagerApplicationsTable
