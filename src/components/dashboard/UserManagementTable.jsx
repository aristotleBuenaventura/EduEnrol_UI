/**
 * @param {object} props
 * @param {{ id: string, initials: string, name: string, email: string, roleLabel: string, roleTone: 'parent'|'slt'|'manager'|'admin', created: string, isActive: boolean }[]} props.rows
 * @param {(userId: string) => void} [props.onToggleStatus]
 */
function UserManagementTable({ rows, onToggleStatus }) {
  return (
    <div className="user-mgmt-table__wrap">
      <table className="user-mgmt-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Created</th>
            <th>Status</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <div className="user-mgmt-table__user">
                  <span className="user-mgmt-table__avatar" aria-hidden="true">
                    {row.initials}
                  </span>
                  <div>
                    <strong>{row.name}</strong>
                    <p>{row.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <span className={['user-mgmt-table__role', `tone-${row.roleTone}`].join(' ')}>{row.roleLabel}</span>
              </td>
              <td className="user-mgmt-table__created">{row.created}</td>
              <td>
                <button
                  type="button"
                  className={['user-mgmt-table__toggle', row.isActive ? 'is-on' : 'is-off'].join(' ')}
                  aria-label={row.isActive ? `Deactivate ${row.name}` : `Activate ${row.name}`}
                  onClick={() => onToggleStatus?.(row.id)}
                >
                  <span />
                </button>
              </td>
              <td>
                <button type="button" className="user-mgmt-table__edit-btn" aria-label={`Edit ${row.name}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 20h8M16 4l4 4-9.5 9.5L6 18l.5-4.5L16 4Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagementTable
