import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { computed } from 'vue';

const breakpoints = useBreakpoints(breakpointsTailwind);

export const isLaptop = computed(() => breakpoints.greater('md'));
export const isMobile = computed(() => breakpoints.smaller('md'));
