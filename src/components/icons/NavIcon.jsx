import { IconBell, IconDashboard, IconDocument, IconGradCap } from './NavIcons.jsx'

const byName = {
  dashboard: IconDashboard,
  gradCap: IconGradCap,
  document: IconDocument,
  bell: IconBell,
}

export default function NavIcon({ name }) {
  const Cmp = byName[name] ?? IconDocument
  return <Cmp />
}
