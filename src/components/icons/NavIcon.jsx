import {
  IconBell,
  IconDashboard,
  IconDocument,
  IconGradCap,
  IconSettings,
  IconShield,
  IconUsers,
  IconWorkflow,
} from './NavIcons.jsx'

const byName = {
  dashboard: IconDashboard,
  gradCap: IconGradCap,
  document: IconDocument,
  bell: IconBell,
  workflow: IconWorkflow,
  shield: IconShield,
  users: IconUsers,
  settings: IconSettings,
}

export default function NavIcon({ name }) {
  const Cmp = byName[name] ?? IconDocument
  return <Cmp />
}
