<script setup lang="ts">
import type { DateRange } from 'reka-ui'
import type { Ref } from 'vue'
import { getLocalTimeZone, today } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/yup'
import { Calendar } from 'lucide-vue-next'
import { useForm, Field as VeeField } from 'vee-validate'
import { h, ref } from 'vue'
import { toast, Toaster } from 'vue-sonner'
import { object, string } from 'yup'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeMonthCalendar } from '@/components/ui/range-month-calendar'

const formSchema = toTypedSchema(
  object({
    title: string().min(5, 'Bug title must be at least 5 characters.').max(32, 'Bug title must be at most 32 characters.'),
    description: string().min(20, 'Description must be at least 20 characters.').max(100, 'Description must be at most 100 characters.'),
  }),
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    description: '',
  },
})

const onSubmit = handleSubmit((data) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4' }, h('code', JSON.stringify(data, null, 2))),
    position: 'bottom-right',
    class: 'flex flex-col gap-2',
    style: {
      '--border-radius': 'calc(var(--radius)  + 4px)',
    },
  })
})

const startTest = today(getLocalTimeZone())
const endTest = startTest.add({ days: 7 })
const monthRangeTest = ref({
  start: startTest,
  end: endTest,
}) as Ref<DateRange>
</script>

<template>
  <div class="grid grid-cols-2">
    <Card class="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-vee-demo" @submit="onSubmit">
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="title">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="form-vee-demo-title">
                  Bug Title
                </FieldLabel>
                <Input
                  id="form-vee-demo-title"
                  v-bind="field"
                  placeholder="Login button not working on mobile"
                  autocomplete="off"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="description">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="form-vee-demo-description">
                  Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="form-vee-demo-description"
                    v-bind="field"
                    placeholder="I'm having an issue with the login button on mobile."
                    :rows="6"
                    class="min-h-24 resize-none"
                    :aria-invalid="!!errors.length"
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText class="tabular-nums">
                      {{ field.value?.length || 0 }}/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Include steps to reproduce, expected behavior, and what actually
                  happened.
                </FieldDescription>
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" @click="resetForm">
            Reset
          </Button>
          <Button type="submit" form="form-vee-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
    <Card class="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Month Range Demo</CardTitle>
        <CardDescription>
          This is for example month range calendar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Popover v-slot="{ close }">
          <PopoverTrigger as-child>
            <Button variant="outline">
              Test Month <Calendar />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0" align="start">
            <RangeMonthCalendar
              v-model="monthRangeTest"
              class="rounded-md border shadow-sm"
              :number-of-months="1"
              disable-days-outside-current-view
              @update:model-value="((rangeVal: DateRange) => {
                if (rangeVal.end) {
                  close()
                }
              })"
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  </div>
  <Toaster />
</template>
