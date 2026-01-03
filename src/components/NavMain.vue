<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import { ChevronRight } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

export interface MenuItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
    isActive?: boolean
  }[]
}

export interface NavMenu {
  [key: string]: MenuItem[]
}

const props = defineProps<{
  items: NavMenu
}>()

const route = useRoute()

function checkIfMenuActive(item: MenuItem): boolean {
  // Check if the current route matches the item's URL exactly
  if (route.path === item.url) {
    return true
  }

  // Check if the current route starts with the item's URL and is followed by a slash
  // This prevents matching /user when the path is /users, but allows /user/profile when the menu is /user
  if (item.url && route.path.startsWith(`${item.url}/`)) {
    return true
  }

  // Check if the current route matches any of the sub-items exactly or starts with their URL
  if (item.items && item.items.length > 0) {
    return item.items.some((subItem) => {
      return route.path === subItem.url || (subItem.url && route.path.startsWith(`${subItem.url}/`))
    },
    )
  }

  return false
}
</script>

<template>
  <SidebarGroup v-for="(_, key) in props.items" :key="key">
    <SidebarGroupLabel class="capitalize">
      {{ key }}
    </SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in props.items[key]"
        :key="item.title"
        as-child
        :default-open="checkIfMenuActive(item)"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger v-if="item.items" as-child>
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <SidebarMenuButton v-else as-child :is-active="checkIfMenuActive(item)">
            <RouterLink :to="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </RouterLink>
          </SidebarMenuButton>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton as-child :is-active="checkIfMenuActive(subItem)">
                  <RouterLink :to="subItem.url">
                    <span>{{ subItem.title }}</span>
                  </RouterLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
