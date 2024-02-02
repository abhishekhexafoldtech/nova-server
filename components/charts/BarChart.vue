<template>
  <div class="card z-index-2">
    <div class="p-3 pb-0 card-header d-flex justify-content-between">
      <h6 class="dashboard_table_heading m-0">{{ title }}</h6>
      <div class="d-flex table_select gap-3">
        <el-select
          v-if="showMonthSelect"
          :modelValue="monthValue"
          @update:modelValue="updateMonthValue"
          placeholder="Month"
          size="large"
        >
          <el-option
            v-for="item in monthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          :modelValue="yearValue"
          @update:modelValue="updateYearValue"
          placeholder="Year"
          size="large"
        >
          <el-option
            v-for="item in yearOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <apexchart
          type="bar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const yearValue = ref('')
const monthValue = ref('')

const yearOptions = [
  {
    value: '2018',
    label: '2018',
  },
  {
    value: '2019',
    label: '2019',
  },
  {
    value: '2020',
    label: '2020',
  },
  {
    value: '2021',
    label: '2021',
  },
]
const monthOptions = [
  {
    value: 'jan',
    label: 'Jan',
  },
  {
    value: 'feb',
    label: 'Feb',
  },
  {
    value: 'mar',
    label: 'Mar',
  },
  {
    value: 'apr',
    label: 'Apr',
  },
]
// defineProps({
//   title: {
//     type: String,
//     default: "Bar Chart",
//   },
//   chartOptions: {
//     type: Object,
//     default: () => ({
//       chart: {
//         height: 300,
//         type: "bar",
//       },
//       colors: ["#3A416F"],
//       fill: {
//         type: "solid",
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: "45%",
//           distributed: true,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       legend: {
//         show: false,
//       },
//       xaxis: {
//         categories: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
//       },
//     }),
//   },
//   series: {
//     type: Array,
//     default: () => [
//       {
//         name: "Sales by Age",
//         data: [15, 20, 12, 60, 20, 15],
//       },
//     ],
//   },
//   showMonthSelect: {
//     type: Boolean,
//     default: true, // Set to true by default to display both month and year select
//   },
//   yearValue: {
//     type: String,
//     default: '',
//   },
//   monthValue: {
//     type: String,
//     default: '',
//   },
// });
const { title, chartOptions, series, showMonthSelect  } = defineProps({
  title: {
    type: String,
    default: "Bar Chart",
  },
  chartOptions: {
    type: Object,
    default: () => ({
      chart: {
        height: 300,
        type: "bar",
      },
      colors: ["#3A416F"],
      fill: {
        type: "solid",
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
      },
    }),
  },
  series: {
    type: Array,
    default: () => [
      {
        name: "Sales by Age",
        data: [15, 20, 12, 60, 20, 15],
      },
    ],
  },
  showMonthSelect: {
    type: Boolean,
    default: true, // Set to true by default to display both month and year select
  },
  yearValue: {
    type: String,
    default: '',
  },
  monthValue: {
    type: String,
    default: '',
  },
});

const updateYearValue = (value) => {
  if (yearValue.value !== value) {
    yearValue.value = value;
    emit('update:yearValue', value);
  }
};

const updateMonthValue = (value) => {
  if (monthValue.value !== value) {
    monthValue.value = value;
    emit('update:monthValue', value);
  }
};

onMounted(() => {
  nextTick(() => {
    window.dispatchEvent(new Event("resize"));
  });
});
</script>
