<template>
    <div class="chart">
        <canvas id="weatherChart"></canvas>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const chart = ref(null)

const props = defineProps({
    forecast: {
        type: Array,
        required: true,
    },
})

const renderChart = (labels, data) => {
    if (chart.value) {
        chart.value.destroy()
    }

    const ctx = document.getElementById('weatherChart').getContext('2d')
    chart.value = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
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
                        text: 'Time',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                    },
                    beginAtZero: true,
                },
            },
        },
    })
}

const runChart = async () => {
    const labels = props.forecast.map((item) => item.time)
    const temperatures = props.forecast.map((item) => item.temp)

    renderChart(labels, temperatures)
}

watch(props, () => {
    runChart()
})
</script>

<style scoped>
.chart {
    padding: 20px;
    background-color: #f7f9fc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
