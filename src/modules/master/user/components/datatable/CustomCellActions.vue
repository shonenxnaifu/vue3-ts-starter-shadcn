<script setup lang="ts">
import type { User } from '../../types'
import { MoreVertical, Pencil, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDialogAddUser, useDialogDelete } from '../../composables/useDialog'

const props = defineProps<{
  userData: User
}>()

const dialog = useDialogAddUser()
const dialogDelete = useDialogDelete()

function onClickDetail() {
  dialog.setData(props.userData)
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
            id: props.userData.id,
            firstName: props.userData.firstName,
            lastName: props.userData.lastName,
          })
          dialogDelete.open()
        }"
      >
        <Trash2 /> Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
