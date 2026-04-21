<script setup lang="ts">
import type { PaginationState } from '@tanstack/vue-table'
import { getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { ref } from 'vue'
import TableWrapper from '@/components/datatable/serverside/Table.vue'
import { useListProduct } from '../../composables/useProductQuery'
import { columns } from './columns'

const INITIAL_PAGE_INDEX = 0
const INITIAL_PAGE_SIZE = 10

const pagination = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: INITIAL_PAGE_SIZE,
})

const { data: respData, isFetching, isFetched } = useListProduct(pagination)

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
  <TableWrapper
    :table="table"
    :is-fetched="isFetched"
    :is-fetching="isFetching"
    :resp-data="respData"
  />
</template>
