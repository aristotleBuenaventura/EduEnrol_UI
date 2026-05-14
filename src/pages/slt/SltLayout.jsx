import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppSidebar from '../../components/layout/AppSidebar.jsx'
import AppTopBar from '../../components/layout/AppTopBar.jsx'
import { sltBrand, sltNavItems, sltRoleLabel } from '../../config/navigation/sltNav.js'
import { sltUserProfile } from '../../data/sltDashboardDummy.js'
import '../../styles/parent-shell.css'

const SLT_BASE_PATH = '/slt'

function SltLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate('/')
  }

  return (
    <div className="parent-app-shell">
      <AppSidebar
        brand={sltBrand}
        roleLabel={sltRoleLabel}
        items={sltNavItems}
        user={sltUserProfile}
        basePath={SLT_BASE_PATH}
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
        />
        <div className="parent-app-shell__scroll">
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </div>
  )
}

export default SltLayout
