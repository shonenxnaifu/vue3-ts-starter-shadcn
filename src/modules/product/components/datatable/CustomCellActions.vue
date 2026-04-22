<script setup lang="ts">
import type { Product } from '../../types'
import { MoreVertical, Pencil, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDialogAddProduct, useDialogDelete } from '../../composables/useDialog'

const props = defineProps<{
  productData: Product
}>()

const dialog = useDialogAddProduct()
const dialogDelete = useDialogDelete()

function onClickDetail() {
  dialog.setData(props.productData)
  dialog.open()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreVertical class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        @click="onClickDetail"
      >
        <Pencil /> Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="() => {
          dialogDelete.setData({
            id: productData.id,
            title: productData.title,
          })
          dialogDelete.open()
        }"
      >
        <Trash2 /> Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
