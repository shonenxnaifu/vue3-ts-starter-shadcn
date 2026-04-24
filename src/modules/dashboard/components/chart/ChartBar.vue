<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import type { Product } from '@/modules/product/types'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { computed, ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'

const props = defineProps<{
  dataProducts: Array<Product>
}>()

const dataProducts = ref<Array<Product>>([])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

interface ChartDataOpt {
  datas: ChartData<any>
  options: ChartOptions<'bar'>
}

const chartDataOpt = computed<ChartDataOpt>(() => {
  const chartResp = props.dataProducts

  const chartData: ChartData<any> = {
    labels: chartResp?.map(item => item.title),
    datasets: [{
      label: 'Price',
      type: 'bar',
      backgroundColor: 'rgba(36,99,235, 0.7)',
      yAxisID: 'y1',
      fill: false,
      data: chartResp.map(item => item.price) ?? [],
      parsing: {
        xAxisKey: 'display_label',
        yAxisKey: 'price_key',
      },
    }],
  }

  const chartOpt: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Price (USD$)',
          color: 'rgba(0,0,0)',
          font: {
            size: 14,
            style: 'normal',
          },
        },
      },
      y1: {
        type: 'category',
        display: true,
      },
    },
    plugins: {
      tooltip: {
        titleColor: 'rgb(0,0,0,1)',
        bodyColor: 'rgb(0,0,0,1)',
        backgroundColor: 'rgb(255,255,255,1)',
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  }

  return {
    datas: chartData,
    options: chartOpt,
  }
})

watch(() => props.dataProducts, (newData) => {
  dataProducts.value = newData
}, { immediate: true })
</script>

<template>
  <div
    class="flex flex-row items-center w-full h-full"
  >
    <div class="relative w-full min-h-52">
      <Bar
        :data="JSON.parse(JSON.stringify(chartDataOpt.datas))"
        :options="chartDataOpt.options"
      />
    </div>
  </div>
</template>
