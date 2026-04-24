<script setup lang="ts">
import type { PaginationState } from '@tanstack/vue-table'
import { Armchair, CircleAlert, ShoppingBasket, SprayCan, WandSparkles } from 'lucide-vue-next'
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useListProductByCategory } from '@/modules/product/composables/useProductQuery'
import Card1 from '../components/card/Card1.vue'
import CardBar1 from '../components/card/CardBar1.vue'
import CardBar from '../components/card/CardBar.vue'
import CardPie from '../components/card/CardPie.vue'

const INITIAL_PAGE_INDEX = 0
const INITIAL_PAGE_SIZE = 0

const pagination = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: INITIAL_PAGE_SIZE,
})

const { data: beautyData, isFetching: isFetchingBeauty } = useListProductByCategory('beauty', pagination)
const { data: fragrancesData, isFetching: isFetchingFragrances } = useListProductByCategory('fragrances', pagination)
const { data: furnitureData, isFetching: isFetchingFurniture } = useListProductByCategory('furniture', pagination)
const { data: groceriesData, isFetching: isFetchingGroceries } = useListProductByCategory('groceries', pagination)
</script>

<template>
  <section class="mb-7" aria-labelledby="title-dashboard">
    <h1 id="title-dashboard" class="text-4xl font-semibold">
      Dashboard
    </h1>
    <p class="text-muted-foreground">
      Monitoring performa and manage operations.
    </p>
  </section>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <span>Products Summaries</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <CircleAlert class="inline-block text-muted-foreground" :size="14" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Products Summaries by Categories.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardTitle>
    </CardHeader>
    <CardContent
      class="grid sm:grid-cols-1 md:grid-cols-4 gap-5"
    >
      <Skeleton v-if="isFetchingBeauty" class="h-50" />
      <Card1
        v-else
        title="Beauty"
        :total-product="beautyData?.total || 0"
      >
        <template #title-icon>
          <WandSparkles class="text-slate-700" />
        </template>
      </Card1>
      <Skeleton v-if="isFetchingFragrances" class="h-50" />
      <Card1
        v-else
        title="Fragrances"
        :total-product="fragrancesData?.total || 0"
      >
        <template #title-icon>
          <SprayCan class="text-slate-700" />
        </template>
      </Card1>
      <Skeleton v-if="isFetchingFurniture" class="h-50" />
      <Card1
        v-else
        title="Furniture"
        :total-product="furnitureData?.total || 0"
      >
        <template #title-icon>
          <Armchair class="text-slate-700" />
        </template>
      </Card1>
      <Skeleton v-if="isFetchingGroceries" class="h-50" />
      <Card1
        v-else
        title="Groceries"
        :total-product="groceriesData?.total || 0"
      >
        <template #title-icon>
          <ShoppingBasket class="text-slate-700" />
        </template>
      </Card1>
    </CardContent>
  </Card>
  <CardBar1 />
  <div class="grid grid-cols-2 gap-4 mt-5">
    <CardBar />
    <CardPie />
  </div>
</template>
