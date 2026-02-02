<script lang="ts" setup>
import type { RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import {
  RangeMonthCalendarCell,
  RangeMonthCalendarCellTrigger,
  RangeMonthCalendarGrid,
  RangeMonthCalendarGridBody,
  RangeMonthCalendarGridHead,
  RangeMonthCalendarGridRow,
  RangeMonthCalendarHeadCell,
  RangeMonthCalendarHeader,
  RangeMonthCalendarHeading,
  RangeMonthCalendarNextButton,
  RangeMonthCalendarPrevButton,
} from '.'

const props = defineProps<RangeCalendarRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<RangeCalendarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <RangeCalendarRoot
    v-slot="{ grid, weekDays }"
    data-slot="range-calendar"
    :class="cn('p-3', props.class)"
    v-bind="forwarded"
  >
    <RangeMonthCalendarHeader>
      <RangeMonthCalendarHeading v-slot="{ headingValue }">
        {{ headingValue }}
      </RangeMonthCalendarHeading>
      <div class="flex items-center gap-1">
        <RangeMonthCalendarPrevButton />
        <RangeMonthCalendarNextButton />
      </div>
    </RangeMonthCalendarHeader>

    <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <RangeMonthCalendarGrid v-for="year in grid" :key="year.value.toString()">
        <RangeMonthCalendarGridHead>
          <RangeMonthCalendarGridRow>
            <RangeMonthCalendarHeadCell
              v-for="day in weekDays" :key="day"
            >
              {{ day }}
            </RangeMonthCalendarHeadCell>
          </RangeMonthCalendarGridRow>
        </RangeMonthCalendarGridHead>
        <RangeMonthCalendarGridBody>
          <RangeMonthCalendarGridRow v-for="(weekDates, index) in year.rows" :key="`weekDate-${index}`" class="mt-2 w-full">
            <RangeMonthCalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <RangeMonthCalendarCellTrigger
                :day="weekDate"
                :month="year.value"
              />
            </RangeMonthCalendarCell>
          </RangeMonthCalendarGridRow>
        </RangeMonthCalendarGridBody>
      </RangeMonthCalendarGrid>
    </div>
  </RangeCalendarRoot>
</template>
