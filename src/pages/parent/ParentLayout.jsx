import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppSidebar from '../../components/layout/AppSidebar.jsx'
import AppTopBar from '../../components/layout/AppTopBar.jsx'
import { parentBrand, parentNavItems, parentRoleLabel } from '../../config/navigation/parentNav.js'
import { parentUserProfile } from '../../data/parentDashboardDummy.js'
import '../../styles/parent-shell.css'
import '../../styles/parent-dashboard.css'

const PARENT_BASE_PATH = '/parent'

/**
 * Parent account shell — swap `parentNavItems` / profile source for other roles later.
 */
function ParentLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <div className="parent-app-shell">
      <AppSidebar
        brand={parentBrand}
        roleLabel={parentRoleLabel}
        items={parentNavItems}
        user={parentUserProfile}
        basePath={PARENT_BASE_PATH}
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
        />
        <div className="parent-app-shell__scroll">
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </div>
  )
}

export default ParentLayout
