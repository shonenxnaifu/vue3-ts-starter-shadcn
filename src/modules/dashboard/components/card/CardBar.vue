<script setup lang="ts">
import { CircleAlert } from 'lucide-vue-next'
import { ref } from 'vue'
import EmptyPlaceholder from '@/components/EmptyPlaceholder.vue'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useListProductByFilterCat } from '@/modules/product/composables/useProductQuery'
import ChartBar from '../chart/ChartBar.vue'

const selectedCat = ref<string>()

const { data: dataProducts, isFetching } = useListProductByFilterCat('price', 'desc', selectedCat)
</script>

<template>
  <Card>
    <CardHeader class="flex justify-between items-center">
      <CardTitle class="flex items-center gap-2">
        <span>Highest Price</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <CircleAlert class="inline-block text-muted-foreground" :size="14" />
            </TooltipTrigger>
            <TooltipContent>
              <p>5 Highest Price Product.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardTitle>
      <CardAction>
        <Field>
          <Select
            v-model="selectedCat"
          >
            <SelectTrigger>
              <SelectValue placeholder="choose category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="category in ['beauty', 'fragrances', 'furniture', 'groceries']"
                :key="category"
                :value="category"
              >
                {{ category }}
              </SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </CardAction>
    </CardHeader>
    <CardContent>
      <Skeleton v-if="isFetching" class="h-50" />
      <ChartBar
        v-else-if="dataProducts?.products && dataProducts.products.length !== 0"
        :data-products="dataProducts.products"
      />
      <EmptyPlaceholder v-else />
    </CardContent>
  </Card>
</template>
