<script setup lang="ts">
import { TriangleAlert } from 'lucide-vue-next'
import { watch } from 'vue'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { useDialogDelete } from '../../composables/useDialog'
import { useDeleteUser } from '../../composables/useUserQuery'

const props = defineProps<{
  refetch: () => void
}>()

const { isOpen, data, close, resetData } = useDialogDelete()
const { mutateAsync, isPending } = useDeleteUser()

async function deleteUser() {
  try {
    if (data.value?.id) {
      const resp = await mutateAsync({ id: data.value.id })
      if (resp)
        toast.success('Success delete data')
      else
        throw new Error('Error')
    }
    else {
      throw new Error('Error')
    }
  }
  catch (error: any) {
    toast.error(error.message)
  }

  props.refetch()
  close()
}

watch(isOpen, (isOpen) => {
  if (!isOpen) {
    resetData()
  }
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-center mt-5">
          <div class="flex flex-col justify-center items-center gap-5">
            <TriangleAlert class="text-destructive" />
            <span>Are you sure to delete <strong>{{ data?.firstName }} {{ data?.lastName }}</strong>?</span>
          </div>
        </DialogTitle>
        <DialogDescription class="text-center">
          Product will be delete permanently.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="grid grid-cols-2 gap-5 mt-5">
        <DialogClose as-child>
          <Button variant="destructive">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="button"
          variant="outline"
          :disabled="isPending"
          @click="deleteUser"
        >
          <Spinner v-if="isPending" /> Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
