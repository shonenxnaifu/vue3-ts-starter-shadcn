<script setup lang="ts" generic="TData">
import type { Table as TableTanStack } from '@tanstack/vue-table'
import type { BaseResponseList } from '@/types'
import { FlexRender } from '@tanstack/vue-table'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import LoadingOverlay from '@/components/ui/loading-screen/LoadingOverlay.vue'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const props = defineProps<{
  table: TableTanStack<TData>
  isFetched: boolean
  isFetching: boolean
  respData: BaseResponseList | undefined
}>()

const pageSizes = [10, 20, 30, 40, 50]

function onChangePageSizeChange(pageSize: any) {
  props.table.setPageSize(Number(pageSize))
}
</script>

<template>
  <div class="relative border rounded-lg bg-card overflow-hidden">
    <Table>
      <TableHeader class="bg-accent">
        <TableRow
          v-for="headerGroup in props.table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :col-span="header.colSpan"
            :class="cn(
              'bg-accent',
              Boolean(header.column.getIsPinned()) && 'sticky z-20 right-0 drop-shadow-[-1px_0_10px_rgba(0,0,0,0.09)]',
            )"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="table.getRowModel().rows.length !== 0">
        <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
          <TableCell
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :class="cn(
              Boolean(cell.column.getIsPinned()) && 'bg-white sticky z-20 right-0 drop-shadow-[-1px_0_5px_rgba(0,0,0,0.09)]',
            )"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableBody v-else-if="isFetched">
        <TableRow>
          <TableCell :colspan="table.getAllColumns().length" class="text-center">
            <span class="font-semibold text-lg">Tidak ada data</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <LoadingOverlay
      :is-loading="isFetching"
      :full-screen="false"
    />
  </div>
  <div className="flex justify-between items-center my-5">
    <div class="w-full flex items-center gap-2">
      <span className="flex items-center gap-1">
        Menampilkan
      </span>
      <Select
        :default-value="10"
        @update:model-value="onChangePageSizeChange"
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="pageSize in pageSizes"
            :key="pageSize"
            :value="pageSize"
          >
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
      <span>
        dari {{ respData?.total }} data
      </span>
    </div>
    <Pagination
      v-slot="{ page }"
      :items-per-page="table.getState().pagination.pageSize"
      :total="respData?.total"
      :default-page="1"
      :page="table.getState().pagination.pageIndex + 1"
      :sibling-count="1"
      show-edges
      class="flex justify-end"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious
          @click="() => table.previousPage()"
        >
          <ArrowLeft />
        </PaginationPrevious>
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            :is-active="item.value === page"
            @click="() => table.setPageIndex(item.value - 1)"
          >
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" class="border" />
        </template>
        <PaginationNext
          @click="() => table.nextPage()"
        >
          <ArrowRight />
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  </div>
</template>
