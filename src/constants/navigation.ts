import IconHome from '@/components/icons/IconHome.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconPieChart from '@/components/icons/IconPieChart.vue'
import IconImport from '@/components/icons/IconImport.vue'
import IconExport from '@/components/icons/IconExport.vue'
import IconPalette from '@/components/icons/IconPalette.vue'

export const NAV_BAR_ITEMS: NavItem[] = [
  { to: '/stats', icon: IconPieChart },
  { to: '/', icon: IconHome },
  {
    to: '/settings',
    icon: IconSettings
  }
]

export const SETTINGS_NAV_LIST_ITEMS: NavItem[] = [
  { to: '/settings/import', icon: IconImport, title: 'Import Library' },
  { to: '/settings/export', icon: IconExport, title: 'Export Library' },
  { to: '/settings/theme', icon: IconPalette, title: 'Theme' }
]
