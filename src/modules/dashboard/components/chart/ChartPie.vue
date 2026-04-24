<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import type { Product } from '@/modules/product/types'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { computed, ref, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'

const props = defineProps<{
  dataProducts: Array<Product>
}>()

const pieBgColors = ['#2463EB', '#5347CD', '#B87CFD', '#16B6C8', '#24B9EB']

const dataProducts = ref<Array<Product>>([])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement)

interface ChartDataOpt {
  datas: ChartData<any>
  options: ChartOptions<any>
}

const chartDataOpt = computed<ChartDataOpt>(() => {
  const chartData: ChartData<any> = {
    labels: dataProducts.value.map(item => item.title),
    datasets: [{
      type: 'doughnut',
      label: 'Top 5 Lowest Price Product',
      data: dataProducts.value.map(item => item.price),
      backgroundColor: pieBgColors,
      hoverOffset: 4,
    }],
  }
  const chartOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      htmlLegend: {
        containerID: 'legend-container',
      },
    },
  }

  return {
    datas: chartData,
    options: chartOptions,
  }
})

function getOrCreateLegendList(id: string) {
  const legendContainer = document.getElementById(id)
  let listContainer = legendContainer?.querySelector('ul')
  if (!listContainer) {
    listContainer = document.createElement('ul')
    listContainer.className = 'flex flex-col space-y-3'
    if (legendContainer) {
      legendContainer.appendChild(listContainer)
    }
  }
  return listContainer
}

const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart: any, _: any, options: { containerID: string }) {
    const ul = getOrCreateLegendList(options.containerID)
    while (ul.firstChild) {
      ul.firstChild.remove()
    }
    const items = chart.options.plugins.legend.labels.generateLabels(chart)
    items.forEach((item: any) => {
      const li = document.createElement('li')
      li.className = 'flex flex-col cursor-pointer group'
      li.onclick = () => {
        chart.toggleDataVisibility(item.index)
        chart.update()
      }

      const topRow = document.createElement('div')
      topRow.className = 'flex items-center'

      const boxSpan = document.createElement('span')
      boxSpan.className = 'w-5 h-5 rounded-full mr-3 flex-shrink-0 border-2 border-transparent transition-transform group-hover:scale-110'
      boxSpan.style.background = item.fillStyle

      const textContainer = document.createElement('span')
      textContainer.className = `text-sm font-medium transition-colors ${item.hidden ? 'text-gray-400 line-through' : 'text-gray-700'}`
      textContainer.textContent = item.text

      topRow.appendChild(boxSpan)
      topRow.appendChild(textContainer)

      const valueContainer = document.createElement('span')
      const value = chart.data.datasets[0].data[item.index] as number
      valueContainer.className = `text-sm font-bold ml-8 transition-colors ${item.hidden ? 'text-gray-400' : 'text-gray-900'}`
      valueContainer.textContent = value.toLocaleString('id-ID')

      li.appendChild(topRow)
      li.appendChild(valueContainer)
      ul.appendChild(li)
    })
  },
}

watch(() => props.dataProducts, (newData) => {
  dataProducts.value = newData
}, { immediate: true })
</script>

<template>
  <div
    class="flex flex-row items-center w-full h-full"
  >
    <div class="relative w-2/3 h-full min-h-50">
      <Doughnut
        :data="chartDataOpt.datas"
        :options="chartDataOpt.options"
        :plugins="[htmlLegendPlugin]"
      />
    </div>
    <div id="legend-container" class="flex flex-col space-y-3 pr-4 w-1/3" />
  </div>
</template>
