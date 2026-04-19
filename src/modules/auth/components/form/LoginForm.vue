<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { toTypedSchema } from '@vee-validate/yup'
import { Eye, EyeOff, LockKeyhole, MailIcon } from 'lucide-vue-next'
import { useForm, Field as VeeField } from 'vee-validate'
import { ref } from 'vue'
import { toast, Toaster } from 'vue-sonner'
import { object, string } from 'yup'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuthStore'
import { useLogin } from '../../composable/useAuth'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const showPass = ref<boolean>(false)

const formSchema = toTypedSchema(
  object({
    username: string().required('Username tidak boleh kosong.'),
    password: string().required('Password tidak boleh kosong.'),
  }),
)

function toggleShowPassword() {
  showPass.value = !showPass.value
}
const { mutateAsync, isPending } = useLogin()

const { setUser } = useAuthStore()

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: '',
    password: '',
  },
})

const onSubmit = handleSubmit(async (data) => {
  try {
    const resp = await mutateAsync({ username: data.username, password: data.password })

    if (resp) {
      setUser({
        ...resp,
        isLoggedIn: true,
      })
      window.location.href = '/'
    }
  }
  catch (error: any) {
    toast.error(error.message)
  }
})
</script>

<template>
  <form
    id="form-login"
    :class="cn('flex flex-col gap-6', props.class)"
    @submit="onSubmit"
  >
    <FieldGroup>
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold">
          Selamat Datang!
        </h1>
        <p class="text-muted-foreground text-sm text-balance">
          Silakan masuk untuk mengelola Dashboard Anda
        </p>
      </div>
      <VeeField v-slot="{ field, errors }" name="username">
        <Field>
          <FieldLabel for="username">
            Username
          </FieldLabel>
          <InputGroup class="bg-white">
            <InputGroupInput
              id="username"
              v-bind="field"
              placeholder="Masukkan username"
              autocomplete="off"
              :aria-invalid="!!errors.length"
            />
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <VeeField v-slot="{ field, errors }" name="password">
        <Field>
          <div class="flex items-center">
            <FieldLabel for="password">
              Kata Sandi Anda
            </FieldLabel>
          </div>
          <InputGroup class="bg-white">
            <InputGroupInput
              id="password"
              v-bind="field"
              :type="showPass ? 'text' : 'password'"
              placeholder="Ketik Kata Sandi Anda"
            />
            <InputGroupAddon>
              <LockKeyhole />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Show Password"
                title="Show Password"
                size="icon-xs"
                type="button"
                @click="toggleShowPassword"
              >
                <Eye v-if="!showPass" />
                <EyeOff v-if="showPass" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <div class="flex items-center">
        <div class="flex items-center gap-3 text-sm">
          <Checkbox id="remember" class="bg-white" />
          <Label for="remember">Ingat Saya</Label>
        </div>
        <RouterLink
          to="/auth/forgot-pass"
          class="ml-auto text-sm underline-offset-4 hover:underline"
        >
          Lupa Kata Sandi
        </RouterLink>
      </div>
      <Field>
        <Button type="submit" :disabled="isPending">
          <Spinner v-if="isPending" />  Masuk
        </Button>
      </Field>
    </FieldGroup>
  </form>
  <Toaster rich-colors position="top-center" />
</template>
