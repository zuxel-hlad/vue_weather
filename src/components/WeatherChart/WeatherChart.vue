<template>
    <div class="chart">
        <canvas :id="chartId"></canvas>
    </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import Chart from 'chart.js/auto'
import generateId from '@/helpers/generateId'

const chart = ref(null)
const chartId = generateId()

const props = defineProps({
    forecast: {
        type: Array,
        required: true,
    },
    xLabel: {
        type: String,
    },
    yLabel: {
        type: String,
    },
})

const renderChart = (labels, data) => {
    if (chart.value) {
        chart.value.destroy()
    }

    const ctx = document.getElementById(chartId).getContext('2d')
    chart.value = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    data,
                    borderColor: 'teal',
                    backgroundColor: 'teal',
                    borderWidth: 2,
                    pointRadius: 4,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: props.xLabel,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: props.yLabel,
                    },
                    beginAtZero: true,
                },
            },
        },
    })
}

const runChart = async () => {
    const labels = props.forecast.map((item) => item.label)
    const temperatures = props.forecast.map((item) => item.temp)

    renderChart(labels, temperatures)
}

onUpdated(runChart)

onMounted(runChart)
</script>

<style lang="scss" scoped>
.chart {
    background-color: #f7f9fc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
