<template>
  <div class="card">
    <div class="card-header mb-4">
      <h6>{{ title }}</h6>
    </div>
    <!-- canva area for showing chart -->
    <div class="card-body">
      <div class="chart">
        <canvas :id="id" class="chart-canvas" :height="height"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

// props
const props = defineProps({
  id: {
    type: String,
    default: "bar-chart",
  },
  title: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "290",
  },
  chart: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

// createChart
const createChart = () => {
  const ctx = document.getElementById(props.id).getContext("2d");

  let chartStatus = Chart.getChart(props.id);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: props.chart.labels,
      datasets: [
        {
          label:props.chart.datasets.label,
          weight: 5,
          borderWidth: 0,
          borderRadius: 4,
          backgroundColor: "#5e72e4",
          data: props.chart.datasets.data,
          fill: false,
          maxBarThickness: 35,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
                callbacks: {
                   
                    labelTextColor: function(context) {
                        
                    }
                }
            },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#9ca2b7",
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: true,
            drawTicks: true,
          },
          ticks: {
            display: true,
            color: "#9ca2b7",
            padding: 10,
          },
        },
      },
    },
  });
};

onMounted(createChart);
</script>
