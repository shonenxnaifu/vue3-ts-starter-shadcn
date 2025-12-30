import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'id',
    header: 'Post ID',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('id')),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('title')),
  },
]
