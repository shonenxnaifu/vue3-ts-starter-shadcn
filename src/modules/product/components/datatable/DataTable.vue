<script setup lang="ts">
import type { PaginationState } from '@tanstack/vue-table'
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { Plus, Search } from 'lucide-vue-next'
import { ref } from 'vue'
import TableWrapper from '@/components/datatable/serverside/Table.vue'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import debounce from '@/utils/debounce'
import { useListProduct } from '../../composables/useProductQuery'
import DialogAddProduct from '../dialog/DialogAddProduct.vue'
import DialogDeleteProduct from '../dialog/DialogDeleteProduct.vue'
import { columns } from './columns'

const INITIAL_PAGE_INDEX = 0
const INITIAL_PAGE_SIZE = 10

const pagination = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: INITIAL_PAGE_SIZE,
})

const keyWordFilter = ref<string>()

const { data: respData, isFetching, isFetched, refetch } = useListProduct(pagination, keyWordFilter)

const table = useVueTable({
  initialState: {
    columnPinning: {
      right: ['aksi'],
    },
  },
  get data() {
    return respData.value?.products || []
  },
  get pageCount() {
    const totalItems = respData.value?.total || 0
    return Math.ceil(totalItems / 10)
  },
  get columns() { return columns },
  state: {
    pagination: pagination.value,
  },
  manualPagination: true,
  onPaginationChange: (updater) => {
    if (typeof updater === 'function') {
      setPagination(
        updater({
          pageIndex: pagination.value.pageIndex,
          pageSize: pagination.value.pageSize,
        }),
      )
    }
    else {
      setPagination(updater)
    }
  },
  getCoreRowModel: getCoreRowModel(),
  debugTable: true,
})

function onInputKeywordFilter(val: string) {
  keyWordFilter.value = encodeURIComponent(val)
}

const debounceInputKeyword = debounce(onInputKeywordFilter, 500)

function setPagination({
  pageIndex,
  pageSize,
}: PaginationState): PaginationState {
  pagination.value.pageIndex = pageIndex
  pagination.value.pageSize = pageSize

  return { pageIndex, pageSize }
}
</script>

<template>
  <div class="w-full flex justify-between items-end gap-5 mb-5">
    <div class="w-1/2">
      <FieldSet>
        <FieldGroup>
          <div class="flex gap-2">
            <Field>
              <InputGroup>
                <InputGroupInput
                  id="keyword"
                  placeholder="Search Product"
                  autocomplete="off"
                  @update:model-value="(val: string) => {
                    debounceInputKeyword(val)
                  }"
                />
                <InputGroupAddon align="inline-end">
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
    <div class="flex items-center gap-2">
      <DialogAddProduct
        :refetch="refetch"
      >
        <template #button-trigger>
          <Button
            size="lg"
            type="button"
            variant="outline"
          >
            <Plus />
            Add Product
          </Button>
        </template>
      </DialogAddProduct>
    </div>
  </div>
  <TableWrapper
    :table="table"
    :is-fetched="isFetched"
    :is-fetching="isFetching"
    :resp-data="respData"
  />
  <DialogDeleteProduct :refetch="refetch" />
</template>
