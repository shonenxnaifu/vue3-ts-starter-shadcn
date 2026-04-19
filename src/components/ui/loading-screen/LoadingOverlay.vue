<script setup lang="ts">
import { computed } from 'vue'
import { Spinner } from '@/components/ui/spinner'

interface LoadingOverlayProps {
  isLoading: boolean
  loadingText?: string
  fullScreen?: boolean
}
const props = withDefaults(defineProps<LoadingOverlayProps>(), {
  loadingText: 'Loading...',
  fullScreen: true,
})
const showOverlay = computed(() => props.isLoading)
</script>

<template>
  <Teleport v-if="fullScreen" to="body">
    <div
      v-if="showOverlay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-muted-foreground/35"
      role="status"
      aria-live="polite"
    >
      <div class="flex flex-col items-center gap-3">
        <Spinner class="size-12 text-primary" />
        <span class="text-lg text-primary font-medium">
          {{ loadingText }}
        </span>
      </div>
    </div>
  </Teleport>
  <div
    v-else-if="showOverlay"
    class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-muted-foreground/35"
    role="status"
    aria-live="polite"
  >
    <Spinner class="size-8 text-primary" />
    <span class="text-lg text-primary font-medium">
      {{ loadingText }}
    </span>
  </div>
</template>
