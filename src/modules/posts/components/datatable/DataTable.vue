<script setup lang="ts">
import type {
  PaginationState,
} from '@tanstack/vue-table'

import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePaginationQuery } from '../../composables/usePostQuery'
import { columns } from './columns'

const INITIAL_PAGE_INDEX = 0
const INITIAL_PAGE_SIZE = 10

const pageSizes = [10, 20, 30, 40, 50]

const pagination = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: INITIAL_PAGE_SIZE,
})

const { data: postData, isFetching } = usePaginationQuery(pagination)

const table = useVueTable({
  get data() {
    return postData.value?.data || []
  },
  get pageCount() {
    return postData.value?.totalData ? Math.ceil(postData.value?.totalData / pagination.value.pageSize) : 0
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

function handlePageSizeChange(e: any) {
  table.setPageSize(Number(e.target.value))
}
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :col-span="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
          <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <div className="flex justify-end">
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </strong>
      </span>
      <select
        :value="table.getState().pagination.pageSize"
        @change="handlePageSizeChange"
      >
        <option
          v-for="pageSize in pageSizes"
          :key="pageSize"
          :value="pageSize"
        >
          Show {{ pageSize }}
        </option>
      </select>
      <Button
        class-name="border rounded p-1"
        :disabled="!table.getCanPreviousPage()"
        @click="() => table.setPageIndex(0)"
      >
        «
      </Button>
      <Button
        class-name="border rounded p-1"
        :disabled="!table.getCanPreviousPage()"
        @click="() => table.previousPage()"
      >
        ‹
      </Button>
      <Button
        class-name="border rounded p-1"
        :disabled="!table.getCanNextPage()"
        @click="() => table.nextPage()"
      >
        ›
      </Button>
      <Button
        class-name="border rounded p-1"
        :disabled="!table.getCanNextPage()"
        @click="() => table.setPageIndex(table.getPageCount() - 1)"
      >
        »
      </Button>

      {{ isFetching ? 'Loading...' : null }}
    </div>
  </div>
  <div class="rounded-md bg-slate-300 p-2">
    <span class="bg-slate-700 text-white rounded-sm p-1">
      pagination response
    </span>
    <pre>{{ JSON.stringify(pagination, null, 2) }}</pre>
  </div>
</template>
