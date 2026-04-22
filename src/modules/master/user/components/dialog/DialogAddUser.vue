<script setup lang="ts">
import type { DateValue } from 'reka-ui'
import type { Ref } from 'vue'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/yup'
import { CalendarIcon, Eye, EyeOff } from 'lucide-vue-next'
import { useForm, Field as VeeField } from 'vee-validate'
import { ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { number, object, ref as refYup, string } from 'yup'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import LoadingOverlay from '@/components/ui/loading-screen/LoadingOverlay.vue'
import { NumberField, NumberFieldInput } from '@/components/ui/number-field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { cn, formatDate } from '@/lib/utils'
import { useDialogAddUser } from '../../composables/useDialog'
import { useAddUser, useDetailUser, useEditUser } from '../../composables/useUserQuery'

const props = defineProps<{
  refetch: () => void
}>()

const formSchema = toTypedSchema(
  object({
    firstName: string()
      .matches(/^[a-z]+(\s[a-z]+)*$/i, 'first name must be alphabet only.')
      .required('first name is required'),
    lastName: string()
      .matches(/^[a-z]+(\s[a-z]+)*$/i, 'last name must be alphabet only.')
      .required('last name is required'),
    age: number()
      .typeError('age must be number.')
      .required('age is required'),
    gender: string()
      .required('gender is required'),
    email: string()
      .email('wrong email format')
      .required('email is required.'),
    phone: string()
      .required('phone is required'),
    password: string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password minimum 8 characters, contains capital, lowercase and number.')
      .required('Kata sandi harus diisi.'),
    passwordRepeat: string()
      .required('Kata sandi harus diisi.')
      .oneOf([refYup('password')], 'Kata sandi tidak sama.'),
  }),
)

const currentDate = today(getLocalTimeZone())
const birthDate = ref(currentDate) as Ref<CalendarDate>
const showPass = ref<boolean>(false)
const showRepeatPass = ref<boolean>(false)

const { mutateAsync, isPending } = useAddUser()
const { mutateAsync: getDetailUser, isPending: isPendingDetailUser } = useDetailUser()
const { mutateAsync: updateUser, isPending: isPendingUpdateUser } = useEditUser()

const dialog = useDialogAddUser()

const { handleSubmit, setValues } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (data) => {
  try {
    let resp

    if (dialog.data.value?.id) {
      resp = await updateUser({
        payload: {
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          birthDate: birthDate.value.toString(),
          gender: data.gender,
          email: data.email,
          phone: data.phone,
          password: data.password,
        },
        id: dialog.data.value.id,
      })
    }
    else {
      resp = await mutateAsync({
        payload: {
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          birthDate: birthDate.value.toString(),
          gender: data.gender,
          email: data.email,
          phone: data.phone,
          password: data.password,
        },
      })
    }

    if (resp)
      toast.success('success add user')
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
    const resp = await getDetailUser({ id })

    setValues({
      firstName: resp?.firstName,
      lastName: resp?.lastName,
      age: resp?.age,
      gender: resp?.gender,
      email: resp?.email,
      phone: resp?.phone,
    })

    if (resp) {
      const [year, month, day] = resp.birthDate.split('-')
      const calendarDate = new CalendarDate(Number(year), Number(month), Number(day))
      birthDate.value = calendarDate
    }
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
        <DialogTitle>Data User</DialogTitle>
        <DialogDescription>
          Information about user details.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4">
        <form
          id="form"
          :class="cn('flex flex-col gap-6')"
        >
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="firstName">
              <Field>
                <FieldLabel for="firstName">
                  First Name
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="firstName"
                    v-bind="field"
                    type="text"
                    placeholder="input first name"
                    autocomplete="off"
                    :aria-invalid="!!errors.length"
                  />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="lastName">
              <Field>
                <FieldLabel for="lastName">
                  Last Name
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="lastName"
                    v-bind="field"
                    type="text"
                    placeholder="input last name"
                    autocomplete="off"
                    :aria-invalid="!!errors.length"
                  />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="age">
              <NumberField>
                <FieldLabel for="age">
                  Age
                </FieldLabel>
                <InputGroup>
                  <NumberFieldInput
                    placeholder="input age"
                    v-bind="field" class="text-left px-4"
                  />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </NumberField>
            </VeeField>
            <Field>
              <FieldLabel>
                Birth Date
              </FieldLabel>
              <Popover v-slot="{ close }">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    :class="cn('justify-start text-left font-normal bg-white')"
                  >
                    <CalendarIcon />
                    <span :class="cn(!birthDate && 'text-muted-foreground')">
                      {{ birthDate ? formatDate(birthDate.toDate(getLocalTimeZone())) : "Choose date" }}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0" align="start">
                  <Calendar
                    v-model="birthDate"
                    class="rounded-md border shadow-sm"
                    layout="month-and-year"
                    :default-placeholder="birthDate"
                    @update:model-value="((date: DateValue) => {
                      if (date) {
                        close()
                      }
                    })"
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <VeeField v-slot="{ field, errors }" name="gender">
              <Field>
                <FieldLabel for="gender">
                  Choose Gender
                </FieldLabel>
                <Select
                  v-bind="field"
                  :model-value="field.value"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="choose gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="gender in ['male', 'female']"
                      :key="gender"
                      :value="gender"
                    >
                      {{ gender }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="email">
              <Field>
                <FieldLabel for="email">
                  Email
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    v-bind="field"
                    type="text"
                    placeholder="emailuser@gmail.com"
                    autocomplete="off"
                    :aria-invalid="!!errors.length"
                  />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="phone">
              <Field>
                <FieldLabel for="phone">
                  Phone
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="phone"
                    v-bind="field"
                    type="text"
                    placeholder="input phone"
                    autocomplete="off"
                    :aria-invalid="!!errors.length"
                  />
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="password">
              <Field>
                <div class="flex items-center">
                  <FieldLabel for="password">
                    Password
                  </FieldLabel>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    v-bind="field"
                    :type="showPass ? 'text' : 'password'"
                    placeholder="input password"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="Show Password"
                      title="Show Password"
                      size="icon-xs"
                      type="button"
                      @click="() => {
                        showPass = !showPass
                      }"
                    >
                      <Eye v-if="showPass" />
                      <EyeOff v-if="!showPass" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Password minimum 8 characters, contains capital, lowercase and number.
                </FieldDescription>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="passwordRepeat">
              <Field>
                <div class="flex items-center">
                  <FieldLabel for="passwordRepeat">
                    Ulangi Kata Sandi
                  </FieldLabel>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="passwordRepeat"
                    v-bind="field"
                    :type="showRepeatPass ? 'text' : 'password'"
                    placeholder="Ulangi kata sandi"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="Show Password"
                      title="Show Password"
                      size="icon-xs"
                      type="button"
                      @click="() => {
                        showRepeatPass = !showRepeatPass
                      }"
                    >
                      <Eye v-if="showRepeatPass" />
                      <EyeOff v-if="!showRepeatPass" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
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
          :disabled="isPending || isPendingUpdateUser"
          type="button"
          form="form"
          @click="onSubmit"
        >
          <Spinner v-if="isPending || isPendingUpdateUser" />
          Save
        </Button>
      </DialogFooter>
      <LoadingOverlay
        :is-loading="isPendingDetailUser"
        :full-screen="false"
      />
    </DialogContent>
  </Dialog>
</template>
