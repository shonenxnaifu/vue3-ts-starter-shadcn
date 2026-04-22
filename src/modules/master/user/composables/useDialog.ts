import type { Ref } from 'vue'
import { ref } from 'vue'

interface DialogComposable {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
}

interface DataUser {
  id: number
  firstName?: string
  lastName?: string
}

interface DialogAddProduct extends DialogComposable {
  data: Ref<DataUser | undefined>
  setData: (data: DataUser) => void
  resetData: () => void
}

interface DialogDeleteProduct extends DialogComposable {
  data: Ref<DataUser | undefined>
  setData: (data: DataUser) => void
  resetData: () => void
}

const isOpenAddUser = ref(false)
const isOpenDelete = ref(false)
const dataUser = ref<DataUser>()

export function useDialogDelete(): DialogDeleteProduct {
  function open(): void {
    isOpenDelete.value = true
  }

  function close(): void {
    isOpenDelete.value = false
  }

  function setData(val: DataUser): void {
    dataUser.value = val
  }

  function resetData(): void {
    dataUser.value = undefined
  }

  return {
    isOpen: isOpenDelete,
    open,
    close,
    data: dataUser,
    setData,
    resetData,
  }
}

export function useDialogAddUser(): DialogAddProduct {
  function open(): void {
    isOpenAddUser.value = true
  }

  function close(): void {
    isOpenAddUser.value = false
  }

  function setData(val: DataUser): void {
    dataUser.value = val
  }

  function resetData(): void {
    dataUser.value = undefined
  }

  return {
    isOpen: isOpenAddUser,
    open,
    close,
    setData,
    resetData,
    data: dataUser,
  }
}
