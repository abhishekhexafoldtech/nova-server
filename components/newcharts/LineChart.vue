<template>
  <div class="card overflow-hidden">
    <div class="card-header">
      <p class="float-end"><img src="@/assets/svg/i_icon.svg" alt="icon" /></p>
      <span class="pr_cat">{{ title }}</span>
      <p class="pr_type">{{ title2 }}</p>
      <div class="pr_name">
        <h4>{{ value.amount }}</h4>
        <h5 v-if="value.percentage.value > 0">
          <span class="green">
            <i class="ri-arrow-right-up-line"></i>{{ value.percentage.value }}%
          </span>
          since last month
        </h5>
        <h5 v-if="value.percentage.value <= 0">
          <span class="red">
            <i class="ri-arrow-left-down-line"></i>{{ value.percentage.value }}%
          </span>
          since last month
        </h5>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="chart">
        <canvas :id="id" class="chart-canvas" :height="height"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  id: {
    type: String,
    default: "chart-widgets-2",
  },
  height: {
    type: String,
    default: "100",
  },
  title: {
    type: String,
    default: "",
  },
  title2: {
    type: String,
    default: "",
  },
  value: {
    type: Object,
    default: () => ({}),
  },
  chart: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

//create chart on onmounted
const createChart = () => {
  const ctx = document.getElementById(props.id).getContext("2d");
  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  gradientStroke.addColorStop(1, "rgb(256, 256, 256)");

  let chartStatus = Chart.getChart(props.id);
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels: props.chart.labels,
      datasets: [         //datasets
        {
          label: props.chart.datasets.label,
          tension: 0.5,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#5e72e4",
          borderWidth: 2,
          backgroundColor: "#00000000",
          data: props.chart.datasets.data,
          maxBarThickness: 6,
          fill: true,
        },
      ],
    },
    options: {   //provide options
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {   // Y axis
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
          ticks: {
            display: true,
          },
        },
        x: {  // X  axis
          grid: {
            drawBorder: true,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
          },
          ticks: {
            display: true,
            callback: function (value, index, values) {
              const customLabels = {
                0: "Jan",
                8: "Dec",
              };

              if (customLabels.hasOwnProperty(value)) {
                return customLabels[value];
              } else {
                return "";
              }
            },
          },
        },
      },
    },
  });
};

onMounted(createChart);
</script>
