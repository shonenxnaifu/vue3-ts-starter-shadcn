import type { Ref } from 'vue'
import { ref } from 'vue'

interface DialogComposable {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
}

interface DataProduct {
  id: number
  title?: string
}

interface DialogAddProduct extends DialogComposable {
  data: Ref<DataProduct | undefined>
  setData: (data: DataProduct) => void
  resetData: () => void
}

interface DialogDeleteProduct extends DialogComposable {
  data: Ref<DataProduct | undefined>
  setData: (data: DataProduct) => void
  resetData: () => void
}

const isOpenAddProduct = ref(false)
const isOpenDelete = ref(false)
const dataProduct = ref<DataProduct>()

export function useDialogDelete(): DialogDeleteProduct {
  function open(): void {
    isOpenDelete.value = true
  }

  function close(): void {
    isOpenDelete.value = false
  }

  function setData(val: DataProduct): void {
    dataProduct.value = val
  }

  function resetData(): void {
    dataProduct.value = undefined
  }

  return {
    isOpen: isOpenDelete,
    open,
    close,
    data: dataProduct,
    setData,
    resetData,
  }
}

export function useDialogAddProduct(): DialogAddProduct {
  function open(): void {
    isOpenAddProduct.value = true
  }

  function close(): void {
    isOpenAddProduct.value = false
  }

  function setData(val: DataProduct): void {
    dataProduct.value = val
  }

  function resetData(): void {
    dataProduct.value = undefined
  }

  return {
    isOpen: isOpenAddProduct,
    open,
    close,
    setData,
    resetData,
    data: dataProduct,
  }
}
