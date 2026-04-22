<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import { useForm, Field as VeeField } from 'vee-validate'
import { watch } from 'vue'
import { toast } from 'vue-sonner'
import { object, string } from 'yup'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import LoadingOverlay from '@/components/ui/loading-screen/LoadingOverlay.vue'
import { NumberField, NumberFieldInput } from '@/components/ui/number-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useDialogAddProduct } from '../../composables/useDialog'
import { useAddProduct, useDetailProduct, useEditProduct, useListAllCategories } from '../../composables/useProductQuery'

const props = defineProps<{
  refetch: () => void
}>()

const formSchema = toTypedSchema(
  object({
    title: string()
      .matches(/^[a-z]+(\s[a-z]+)*$/i, 'title must be alphabet only.')
      .required('title is required'),
    description: string()
      .required('description is required'),
    category: string()
      .required('category is required'),
    price: string()
      .required('price is required'),
    stock: string()
      .required('stock is required'),
  }),
)

const { mutateAsync, isPending } = useAddProduct()
const { mutateAsync: updateProduct, isPending: isPendingUpdateProduct } = useEditProduct()
const { data: allCategories, isPending: isPendingCategories } = useListAllCategories()
const { mutateAsync: getDetailProduct, isPending: isPendingGetDetailProduct } = useDetailProduct()

const dialog = useDialogAddProduct()

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (data) => {
  try {
    let resp

    if (dialog.data.value?.id) {
      resp = await updateProduct({
        payload: {
          title: data.title,
          description: data.description,
          category: data.category,
          stock: Number(data.stock),
          price: Number(data.price),
        },
        id: dialog.data.value.id,
      })
    }
    else {
      resp = await mutateAsync({
        payload: {
          title: data.title,
          description: data.description,
          category: data.category,
          stock: Number(data.stock),
          price: Number(data.price),
        },
      })
    }

    if (resp)
      toast.success('success add product')
    else
      throw new Error('Error')
  }
  catch (error: any) {
    toast.error(error.message)
  }

  dialog.close()
  props.refetch()
})

async function fillDetailProduct(id: number) {
  try {
    const resp = await getDetailProduct({ id })

    setValues({
      title: resp?.title,
      description: resp?.description,
      category: resp?.category,
      price: resp?.price.toString(),
      stock: resp?.stock.toString(),
    })
  }
  catch (error: any) {
    toast.error(error.message)
  }
}

watch(dialog.data, (dataProduct) => {
  if (dataProduct?.id) {
    fillDetailProduct(dataProduct?.id)
  }
})

watch(dialog.isOpen, (isOpen) => {
  if (!isOpen) {
    dialog.resetData()
  }
})
</script>

<template>
  <Dialog
    v-model:open="dialog.isOpen.value"
  >
    <DialogTrigger as-child>
      <slot name="button-trigger" />
    </DialogTrigger>
    <DialogContent class="w-1/3 overflow-y-auto max-h-screen">
      <DialogHeader>
        <DialogTitle>Data Product</DialogTitle>
        <DialogDescription>
          Information about product details.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4">
        <form
          id="form"
          :class="cn('flex flex-col gap-6')"
        >
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="title">
              <Field>
                <FieldLabel for="title">
                  Title
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="title"
                    v-bind="field"
                    type="text"
                    placeholder="input title"
                    autocomplete="off"
                    :aria-invalid="!!errors.length"
                  />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="description">
              <Field>
                <FieldLabel for="description">
                  Description
                </FieldLabel>
                <InputGroup>
                  <Textarea
                    id="description"
                    v-bind="field"
                    placeholder="input description"
                    autocomplete="off"
                    :aria-invalid="!!errors.length"
                  />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="category">
              <Field>
                <FieldLabel for="category">
                  Choose Category
                </FieldLabel>
                <Select
                  v-bind="field"
                  :model-value="field.value"
                  :disabled="isPendingCategories"
                >
                  <SelectTrigger>
                    <Spinner v-if="isPendingCategories" />
                    <SelectValue v-else placeholder="choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="category in allCategories"
                      :key="category"
                      :value="category"
                    >
                      {{ category }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="price">
              <NumberField
                id="price"
                :format-options="{
                  style: 'currency',
                  currency: 'USD',
                  currencyDisplay: 'symbol',
                  currencySign: 'accounting',
                  minimumFractionDigits: 2,
                }"
                :step="0.01"
              >
                <FieldLabel for="price">
                  Price
                </FieldLabel>
                <InputGroup>
                  <NumberFieldInput v-bind="field" class="text-right px-4" />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </NumberField>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="stock">
              <NumberField
                id="stock"
              >
                <FieldLabel for="price">
                  Stock
                </FieldLabel>
                <InputGroup>
                  <NumberFieldInput v-bind="field" class="text-right px-4" />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </NumberField>
            </VeeField>
          </FieldGroup>
        </form>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button
          :disabled="isPending || isPendingUpdateProduct"
          type="button"
          form="form"
          @click="onSubmit"
        >
          <Spinner v-if="isPending || isPendingUpdateProduct" />
          Save
        </Button>
      </DialogFooter>
      <LoadingOverlay
        :is-loading="isPendingGetDetailProduct"
        :full-screen="false"
      />
    </DialogContent>
  </Dialog>
</template>
