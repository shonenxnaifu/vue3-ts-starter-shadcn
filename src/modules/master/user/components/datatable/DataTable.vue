<script setup lang="ts">
import type { PaginationState } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { Columns3, Plus, Search } from 'lucide-vue-next'
import { ref } from 'vue'
import TableWrapper from '@/components/datatable/serverside/Table.vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Field, FieldGroup, FieldSet } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import debounce from '@/utils/debounce'
import { useListUser } from '../../composables/useUserQuery'
import DialogAddUser from '../dialog/DialogAddUser.vue'
import DialogDeleteUser from '../dialog/DialogDeleteUser.vue'
import { columns } from './columns'

const INITIAL_PAGE_INDEX = 0
const INITIAL_PAGE_SIZE = 10

const pagination = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: INITIAL_PAGE_SIZE,
})

const keyWordFilter = ref<string>()

const { data: respData, isFetching, isFetched, refetch } = useListUser(pagination, keyWordFilter)

const table = useVueTable({
  initialState: {
    columnPinning: {
      right: ['aksi'],
    },
  },
  get data() {
    return respData.value?.users || []
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
                  placeholder="Search User"
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
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <Columns3 class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide() && column.id.toString() !== 'aksi' && column.id.toString() !== 'index')"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            force-mount
            @update:model-value="(value) => {
              column.toggleVisibility(!!value)
            }"
          >
            <template #indicator-icon>
              <Checkbox :model-value="column.getIsVisible()" />
            </template>
            <FlexRender
              :render="column.columnDef.header"
              :props="table.getFlatHeaders().find(h => h.id === column.id)?.getContext()"
            />
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogAddUser
        :refetch="refetch"
      >
        <template #button-trigger>
          <Button
            size="lg"
            type="button"
            variant="outline"
          >
            <Plus />
            Add User
          </Button>
        </template>
      </DialogAddUser>
    </div>
  </div>
  <TableWrapper
    :table="table"
    :is-fetched="isFetched"
    :is-fetching="isFetching"
    :resp-data="respData"
  />
  <DialogDeleteUser :refetch="refetch" />
</template>
