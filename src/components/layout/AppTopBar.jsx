import { IconBell, IconSearch } from '../icons/NavIcons.jsx'

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
        <span className="app-topbar__verified-pill">
          <span className="app-topbar__verified-icon" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3 18.5 5.8v5.5c0 4.1-2.8 7.9-6.5 9.3-3.7-1.4-6.5-5.2-6.5-9.3V5.8L12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m9.2 12 1.9 1.9 3.6-3.6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>MoE Verified</span>
        </span>
        <button type="button" className="app-topbar__lang-pill is-active" aria-label="Language English">
          English
        </button>
        <button type="button" className="app-topbar__lang-pill" aria-label="Language Te Reo">
          Te Reo
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
