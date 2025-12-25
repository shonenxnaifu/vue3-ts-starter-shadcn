<script setup lang="ts">
import type { Payment } from '../components/datatable/columns'
import { onMounted, ref } from 'vue'
import { columns, payments } from '../components/datatable/columns'
import Datatable from '../components/datatable/DataTable.vue'
import SectionCards from '../components/SectionCards.vue'

const data = ref<Payment[]>([])

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
