const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function IconDashboard(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" />
      <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
  )
}

export function IconGradCap(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 10.5 12 6l8 4.5" />
      <path d="M6 10.5V16" />
      <path d="M18 10.5V16" />
      <path d="M6 16c0 1.5 2.7 2.5 6 2.5s6-1 6-2.5" />
    </svg>
  )
}

export function IconDocument(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v5h5" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  )
}

export function IconBell(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
      <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" />
    </svg>
  )
}

export function IconSignOut(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M10 17H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3" />
      <path d="M14 7l5 5-5 5" />
      <path d="M19 12H9" />
    </svg>
  )
}

export function IconChevronLeft(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronRight(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconSearch(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  )
}

export function IconGlobe(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  )
}

export function IconPencil(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l3 2" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export function IconInfo(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6M12 8h.01" strokeLinecap="round" />
    </svg>
  )
}

export function IconFileStack(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M7 4h9l3 3v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M7 8h10M7 12h8" />
    </svg>
  )
}

export function IconArrowRight(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconCalendar(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}

export function IconSave(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <path d="M8 4v4h8V4M8 20v-5h8v5" />
    </svg>
  )
}

