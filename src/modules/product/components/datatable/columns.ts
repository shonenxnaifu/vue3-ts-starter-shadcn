import type { ColumnDef } from '@tanstack/vue-table'
import type { Meta, Product } from '../../types'
import { h } from 'vue'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import Tags from '../badge/Tags.vue'
import CustomCellActions from './CustomCellActions.vue'

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: 'title',
    header: 'Name',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('title')),
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('brand')),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('category')),
  },
  {
    accessorKey: 'price',
    header: () => {
      return h('div', { class: 'text-center' }, 'Price $')
    },
    cell: ({ row }) => {
      const numVal = row.getValue('price') ? Number(row.getValue('price')) : 0

      return h('div', { class: 'text-center' }, formatCurrency(numVal))
    },
  },
  {
    accessorKey: 'stock',
    header: () => {
      return h('div', { class: 'text-center' }, 'Stock')
    },
    cell: ({ row }) => {
      const numVal = row.getValue('stock') ? Number(row.getValue('stock')) : 0

      return h(
        'div',
        { class: 'text-center' },
        formatNumber(numVal),
      )
    },
  },
  {
    accessorKey: 'meta',
    header: () => {
      return h('div', { class: 'text-center' }, 'Created Date')
    },
    cell: ({ row }) => {
      const metaVal: Meta = row.getValue('meta')

      return h('div', { class: 'text-center' }, formatDate(new Date(metaVal.createdAt)))
    },
  },
  {
    accessorKey: 'tags',
    header: () => {
      return h('div', { class: 'text-center' }, 'Tags')
    },
    cell: ({ row }) => {
      const dataProduct = row.original

      return h(
        'div',
        { class: 'relative text-center' },
        h(Tags, { dataProduct }),
      )
    },
  },
  {
    accessorKey: 'id',
    header: () => {
      return h('div', { class: 'text-center' }, 'Actions')
    },
    cell: ({ row }) => {
      const dataProduct = row.original

      return h(
        'div',
        { class: 'relative text-center' },
        h(CustomCellActions, { productData: dataProduct }),
      )
    },
  },
]
