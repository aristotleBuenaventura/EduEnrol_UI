import {
  IconBarChart,
  IconBell,
  IconCalendar,
  IconClipboard,
  IconDashboard,
  IconDocument,
  IconGradCap,
  IconHome,
  IconSchool,
  IconSettings,
  IconShield,
  IconUserPlus,
  IconUsers,
  IconWorkflow,
} from './NavIcons.jsx'

const byName = {
  dashboard: IconDashboard,
  home: IconHome,
  gradCap: IconGradCap,
  document: IconDocument,
  bell: IconBell,
  clipboard: IconClipboard,
  calendar: IconCalendar,
  chartBar: IconBarChart,
  workflow: IconWorkflow,
  school: IconSchool,
  shield: IconShield,
  users: IconUsers,
  userPlus: IconUserPlus,
  settings: IconSettings,
}

export default function NavIcon({ name }) {
  const Cmp = byName[name] ?? IconDocument
  return <Cmp />
}
