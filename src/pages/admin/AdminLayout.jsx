import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppSidebar from '../../components/layout/AppSidebar.jsx'
import AppTopBar from '../../components/layout/AppTopBar.jsx'
import { adminBrand, adminNavItems, adminRoleLabel } from '../../config/navigation/adminNav.js'
import { adminUserProfile } from '../../data/adminDashboardDummy.js'
import '../../styles/parent-shell.css'
import '../../styles/admin-dashboard.css'

const ADMIN_BASE_PATH = '/admin'

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  return (
    <div className="parent-app-shell">
      <AppSidebar
        brand={adminBrand}
        roleLabel={adminRoleLabel}
        items={adminNavItems}
        user={adminUserProfile}
        basePath={ADMIN_BASE_PATH}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        onSignOut={() => navigate('/staff-login')}
      />
      <div className="parent-app-shell__column">
        <AppTopBar
          searchPlaceholder="Search applications..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notificationCount={2}
        />
        <div className="parent-app-shell__scroll">
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
