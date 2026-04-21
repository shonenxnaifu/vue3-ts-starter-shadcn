<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const props = defineProps<{
  dataProduct: {
    tags: Array<string>
  }
}>()
</script>

<template>
  <Badge
    v-for="tag in props.dataProduct.tags"
    :key="tag"
    variant="secondary"
    :class="cn('lowercase')"
  >
    {{ tag }}
  </Badge>
</template>
