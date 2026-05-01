<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import {
  AudioWaveform,
  Calendar,
  CalendarDays,
  Command,
  Frame,
  GalleryVerticalEnd,
  Palette,
  SquareTerminal,
} from 'lucide-vue-next'
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMenu: {
    pages: [
      {
        title: 'Dashboard',
        url: '/',
        icon: Frame,
      },
      {
        title: 'Master',
        url: '#',
        icon: SquareTerminal,
        items: [
          {
            title: 'Product',
            url: '/master/product',
          },
          {
            title: 'User',
            url: '/master/user',
          },
        ],
      },
    ],
    components: [
      {
        title: 'Color System',
        url: '#',
        icon: Palette,
      },
      {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
      },
      {
        title: 'Range Calendar',
        url: '#',
        icon: CalendarDays,
      },
    ],
  },
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMenu" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
