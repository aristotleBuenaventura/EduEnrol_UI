import { useState } from 'react'
import DashboardPanel from '../../components/dashboard/DashboardPanel.jsx'
import RoleSummaryCard from '../../components/dashboard/RoleSummaryCard.jsx'
import UserManagementTable from '../../components/dashboard/UserManagementTable.jsx'
import { IconUsers } from '../../components/icons/NavIcons.jsx'
import { adminUserRoleCounts, adminUsersList } from '../../data/adminUsersDummy.js'

function AdminUsersPage() {
  const [users, setUsers] = useState(adminUsersList)

  const handleToggleStatus = (userId) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)),
    )
  }

  return (
    <div className="admin-users">
      <header className="admin-users__hero">
        <div>
          <h1 className="admin-users__title">User Management</h1>
          <p className="admin-users__subtitle">Manage user accounts and role assignments</p>
        </div>
        <button type="button" className="admin-users__cta">
          <IconUsers width={15} height={15} />
          <span>Add User</span>
        </button>
      </header>

      <section className="admin-users__stats" aria-label="User role summary">
        {adminUserRoleCounts.map((item) => (
          <RoleSummaryCard key={item.id} count={item.count} label={item.label} tone={item.tone} />
        ))}
      </section>

      <DashboardPanel title="All Users" className="admin-users__table-panel">
        <UserManagementTable rows={users} onToggleStatus={handleToggleStatus} />
      </DashboardPanel>
    </div>
  )
}

export default AdminUsersPage
