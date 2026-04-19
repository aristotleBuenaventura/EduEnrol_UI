import { NavLink } from 'react-router-dom'
import NavIcon from '../icons/NavIcon.jsx'
import { IconChevronLeft, IconChevronRight, IconGradCap, IconSignOut } from '../icons/NavIcons.jsx'

/**
 * Collapsible app sidebar — pass `items` shaped for any user role.
 *
 * @param {object} props
 * @param {{ title: string, subtitle?: string }} props.brand
 * @param {string} props.roleLabel
 * @param {{ id: string, label: string, path: string, icon: string }[]} props.items
 * @param {{ fullName: string, email: string, initials: string }} props.user
 * @param {string} props.basePath — e.g. "/parent" (no trailing slash)
 * @param {boolean} props.collapsed
 * @param {() => void} props.onToggleCollapse
 * @param {() => void} [props.onSignOut]
 */
function AppSidebar({
  brand,
  roleLabel,
  items,
  user,
  basePath,
  collapsed,
  onToggleCollapse,
  onSignOut,
}) {
  const sidebarClass = ['app-sidebar', collapsed ? 'is-collapsed' : ''].filter(Boolean).join(' ')

  return (
    <aside className={sidebarClass} aria-label="Main navigation">
      {collapsed ? (
        <div className="app-sidebar__top-collapsed">
          <button
            type="button"
            className="app-sidebar__toggle-pill"
            onClick={onToggleCollapse}
            aria-expanded={false}
            aria-label="Expand sidebar"
          >
            <span className="app-sidebar__toggle-brand" aria-hidden="true">
              <IconGradCap width={20} height={20} />
            </span>
            <IconChevronRight className="app-sidebar__toggle-chevron" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="app-sidebar__header-row">
          <div className="app-sidebar__brand-block">
            <span className="app-sidebar__brand-icon" aria-hidden="true">
              <IconGradCap width={22} height={22} />
            </span>
            <div>
              <div className="app-sidebar__brand-title">{brand.title}</div>
              {brand.subtitle ? <div className="app-sidebar__brand-sub">{brand.subtitle}</div> : null}
            </div>
          </div>
          <button
            type="button"
            className="app-sidebar__collapse-btn"
            onClick={onToggleCollapse}
            aria-expanded
            aria-label="Collapse sidebar"
          >
            <IconChevronLeft aria-hidden="true" />
          </button>
        </div>
      )}

      {!collapsed && <div className="app-sidebar__role-pill">{roleLabel}</div>}

      <nav className="app-sidebar__nav" aria-label="Sections">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <NavLink
                to={`${basePath}/${item.path}`.replace(/\/+/g, '/')}
                className={({ isActive }) =>
                  ['app-sidebar__link', isActive ? 'is-active' : ''].filter(Boolean).join(' ')
                }
                title={collapsed ? item.label : undefined}
              >
                <span className="app-sidebar__link-icon" aria-hidden="true">
                  <NavIcon name={item.icon} />
                </span>
                {!collapsed ? <span className="app-sidebar__link-label">{item.label}</span> : null}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="app-sidebar__footer">
        {!collapsed ? (
          <>
            <div className="app-sidebar__profile">
              <div className="app-sidebar__avatar" aria-hidden="true">
                {user.initials}
              </div>
              <div className="app-sidebar__profile-text">
                <div className="app-sidebar__profile-name">{user.fullName}</div>
                <div className="app-sidebar__profile-email">{user.email}</div>
              </div>
            </div>
            <button type="button" className="app-sidebar__signout" onClick={onSignOut}>
              <IconSignOut width={20} height={20} />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <>
            <div className="app-sidebar__footer-rule" aria-hidden="true" />
            <button
              type="button"
              className="app-sidebar__signout app-sidebar__signout--icon"
              onClick={onSignOut}
              aria-label="Sign out"
              title="Sign out"
            >
              <IconSignOut width={22} height={22} />
            </button>
          </>
        )}
      </div>
    </aside>
  )
}

export default AppSidebar
