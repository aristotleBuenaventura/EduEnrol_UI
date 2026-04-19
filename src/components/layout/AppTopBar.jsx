import { IconBell, IconGlobe, IconSearch } from '../icons/NavIcons.jsx'

/**
 * @param {object} props
 * @param {string} [props.searchPlaceholder]
 * @param {string} [props.searchQuery]
 * @param {(value: string) => void} [props.onSearchChange]
 * @param {number} [props.notificationCount]
 */
function AppTopBar({
  searchPlaceholder = 'Search…',
  searchQuery = '',
  onSearchChange,
  notificationCount = 0,
}) {
  return (
    <header className="app-topbar">
      <div className="app-topbar__search">
        <IconSearch className="app-topbar__search-icon" width={20} height={20} />
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          aria-label="Search"
        />
      </div>
      <div className="app-topbar__actions">
        <button type="button" className="app-topbar__icon-btn" aria-label="Language">
          <IconGlobe width={22} height={22} />
        </button>
        <button type="button" className="app-topbar__icon-btn" aria-label="Notifications">
          <IconBell width={22} height={22} />
          {notificationCount > 0 ? (
            <span className="app-topbar__badge">{notificationCount > 9 ? '9+' : notificationCount}</span>
          ) : null}
        </button>
      </div>
    </header>
  )
}

export default AppTopBar
