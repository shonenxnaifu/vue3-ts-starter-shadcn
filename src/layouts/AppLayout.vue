<script setup lang="ts">
import { CircleCheck, CircleX } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Toaster } from 'vue-sonner'
import AppSidebar from '@/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const route = useRoute()

const breadcrumbRoutes = computed(() => {
  return route.matched.filter(r => r.meta.pageName)
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList class="capitalize">
              <template v-for="(routeMatched, index) in breadcrumbRoutes" :key="routeMatched.name">
                <BreadcrumbItem v-if="index !== (breadcrumbRoutes.length - 1)" class="hidden md:block">
                  <BreadcrumbLink href="#">
                    {{ routeMatched.meta.pageName }}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem v-else>
                  <BreadcrumbPage class="text-primary">
                    {{ routeMatched.meta.pageName }}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator v-if="index !== (breadcrumbRoutes.length - 1)" class="hidden md:block" />
              </template>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2 px-4 py-8">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
  <Toaster rich-colors position="top-right">
    <template #success-icon>
      <CircleCheck />
    </template>
    <template #error-icon>
      <CircleX />
    </template>
  </Toaster>
</template>
