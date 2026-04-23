<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CircleQuestionMark } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title: string
  totalProduct: number
}>()
</script>

<template>
  <Card :class="cn('p-3 border-red-400 bg-red-400/10', props.class)">
    <CardHeader class="px-0">
      <CardTitle class="text-lg font-medium flex items-center gap-3">
        <span class="bg-white p-2 rounded-lg border-2 border-slate-700">
          <slot name="title-icon">
            <CircleQuestionMark />
          </slot>
        </span>
        <span class="text-slate-700">{{ title }}</span>
      </CardTitle>
    </CardHeader>
    <CardContent class="text-2xl font-semibold px-0 text-red-900">
      {{ props.totalProduct }} Products
    </CardContent>
  </Card>
</template>
