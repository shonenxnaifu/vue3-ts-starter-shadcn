<script setup lang="ts">
import type { Payment } from '@/components/datatable/clientside/columns'
import { onMounted, ref } from 'vue'
import { columns } from '@/components/datatable/clientside/columns'
import Datatable from '@/components/datatable/clientside/DataTable.vue'
import dummyPayments from '@/modules/payment/data/data.dummy.json'
import SectionCards from '../components/SectionCards.vue'

const data = ref<Payment[]>([])

const payments = dummyPayments as Payment[]

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return payments
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <SectionCards />
  <Datatable :columns="columns" :data="data" />
</template>
