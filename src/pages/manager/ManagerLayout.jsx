import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppSidebar from '../../components/layout/AppSidebar.jsx'
import AppTopBar from '../../components/layout/AppTopBar.jsx'
import { managerBrand, managerNavItems, managerRoleLabel } from '../../config/navigation/managerNav.js'
import { managerUserProfile } from '../../data/managerDashboardDummy.js'
import '../../styles/parent-shell.css'
import '../../styles/parent-dashboard.css'

const MANAGER_BASE_PATH = '/manager'

function ManagerLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <div className="parent-app-shell">
      <AppSidebar
        brand={managerBrand}
        roleLabel={managerRoleLabel}
        items={managerNavItems}
        user={managerUserProfile}
        basePath={MANAGER_BASE_PATH}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        onSignOut={handleSignOut}
      />
      <div className="parent-app-shell__column">
        <AppTopBar
          searchPlaceholder="Search applications..."
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notificationCount={2}
          notificationBadgeTone="accent"
          demoTag="Demo: Manager"
        />
        <div className="parent-app-shell__scroll">
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </div>
  )
}

export default ManagerLayout
