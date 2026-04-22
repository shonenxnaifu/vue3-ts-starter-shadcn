import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '../../types'
import { h } from 'vue'
import { formatDate } from '@/lib/utils'
import CustomCellActions from './CustomCellActions.vue'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'index',
    header: 'No',
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination
      const noUrut = pageIndex * pageSize + row.index + 1
      return h('div', { class: '' }, noUrut)
    },
  },
  {
    accessorKey: 'firstName',
    header: 'Full Name',
    cell: ({ row }) => {
      const dataUser = row.original
      return h(
        'div',
        { class: 'text-left' },
        `${dataUser.firstName} ${dataUser.lastName}`,
      )
    },
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('age')),
  },
  {
    accessorKey: 'birthDate',
    header: 'Birth Date',
    cell: ({ row }) => h(
      'div',
      { class: 'text-left' },
      formatDate(new Date(row.getValue('birthDate'))),
    ),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('gender')),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('email')),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('phone')),
  },
  {
    accessorKey: 'id',
    header: () => {
      return h('div', { class: 'text-center' }, 'Actions')
    },
    cell: ({ row }) => {
      const dataUser = row.original

      return h(
        'div',
        { class: 'relative text-center' },
        h(CustomCellActions, { userData: dataUser }),
      )
    },
  },
]
