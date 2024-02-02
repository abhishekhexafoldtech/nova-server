<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <!-- User Profile  -->
      <!-- <div class="w-100 d-flex py-3">
        <ProfileCard :profile-details="profileDetails" />
      </div> -->

      <div class="col-lg-12">
        <!-- <div class="row">
          <div v-for="{
            title,
            value,
            description,
            icon: { component, background, shape },
          } of cardData" :key="title" class="col-lg-3 col-md-6 col-12 pt-4">
            <MiniStatisticsCard :title="title" :value="value" :description="description" :icon="{
              component: component,
              background: background,
              shape: shape,
            }" />
          </div>
        </div> -->

        <!-- KPI Cards -->
        <div class="kpi_card_wrap dashboard_kpi">
          <div class="cards">
            <TableInfoKpiCard
              title="Total cylinder allocated"
              :percentage="distributorKpi.allDistributors.percentage"
              :value="distributorKpi.allDistributors.value"
              :icon="SingleCylinderIcon"
            />
          </div>
          <div class="cards">
            <TableInfoKpiCard
              title="Total cylinder orders"
              :percentage="distributorKpi.pendingDistributor.percentage"
              :value="distributorKpi.pendingDistributor.value"
              :icon="TotalCylinderIcon"
            />
          </div>
          <div class="cards">
            <TableInfoKpiCard
              title="Total cylinder sold out"
              :percentage="distributorKpi.stockReq.percentage"
              :value="distributorKpi.stockReq.value"
              :icon="CylinderDeliveryIcon"
            />
          </div>
          <div class="cards">
            <TableInfoKpiCard
              title="Total cylinder in stock"
              :percentage="distributorKpi.complaints.percentage"
              :value="distributorKpi.complaints.value"
              :icon="InventoryStockIcon"
            />
          </div>
          <div class="cards">
            <TableInfoKpiCard
              title="Product in low stock"
              :percentage="distributorKpi.complaints2.percentage"
              :value="distributorKpi.complaints2.value"
              :icon="LowStockIcon"
            />
          </div>
        </div>

        <!-- Graphs and Table  -->
        <div class="row">
          <div class="col-lg-6 mb-lg">
            <div class="card z-index-2">
              <div class="p-0 card-body">
                <div class="chart">
                  <BarChart
                    title="Overall Sales"
                    height="300"
                    :chart="{
                      labels: [
                        '16-20',
                        '21-25',
                        '26-30',
                        '31-36',
                        '36-42',
                        '42+',
                      ],
                      datasets: {
                        label: 'Sales by age',
                        data: [15, 20, 12, 60, 20, 15],
                      },
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-lg">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="dashboard_table_heading mb-3">
                    Distributor stock request
                  </h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr
                      v-for="(
                        { flag, name, zone, quantity, date }, index
                      ) in sales"
                      :key="index"
                    >
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="flag" alt="Country flag" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">Name:</p>
                            <h6 class="mb-0 text-sm">{{ name }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Zone:</p>
                          <h6 class="mb-0 text-sm">{{ zone }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">Quantity:</p>
                          <h6 class="mb-0 text-sm">{{ quantity }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">Date:</p>
                          <h6 class="mb-0 text-sm">{{ date }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <button
                            class="table_btn"
                            @click="
                              handleAssign({ name, zone, quantity, date })
                            "
                          >
                            Assign
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- <div class="card z-index-2">
              <div class="mb-0 pb-0 card-header">
                <h6>Overall Sales</h6>
              </div>
              <div class="p-0 card-body">
                <div class="chart">
                  <GradientLineChart
                    :chart-options="{
                      chart: {
                        type: 'area',
                      },
                      colors: ['#4BB543'],
                      labels: [
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ],
                      dataLabels: {
                        enabled: false,
                      },
                      stroke: {
                        curve: 'smooth',
                      },
                      legend: {
                        show: false,
                      },
                    }"
                    :series="[
                      {
                        name: 'Mobile Apps',
                        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                      },
                    ]"
                  />
                </div>
              </div>
            </div> -->
          </div>
        </div>

        <!-- Graphs-2 and Table-2  -->
        <div class="row mt-4">
          <div class="col-lg-8 mb-lg">
            <div class="card z-index-2">
              <div class="p-0 card-body">
                <div class="chart">
                  <BarChart
                    title="Top products revenue"
                    :showMonthSelect="false"
                    height="300"
                    :chart="{
                      labels: [
                        '16-20',
                        '21-25',
                        '26-30',
                        '31-36',
                        '36-42',
                        '42+',
                      ],
                      datasets: {
                        label: 'Sales by age',
                        data: [15, 20, 12, 60, 20, 15],
                      },
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-lg">
            <CategoriesList :categories="categories" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import US from "@/assets/img/icons/flags/US.png";
import DE from "@/assets/img/icons/flags/DE.png";
import GB from "@/assets/img/icons/flags/GB.png";
import BR from "@/assets/img/icons/flags/BR.png";
import TI1 from "@/assets/img/ti1.png";
import TI2 from "@/assets/img/ti2.png";
import TI3 from "@/assets/img/ti3.png";
import TI4 from "@/assets/img/ti4.png";

// import ProfileCard from '@/components/cards/ProfileCard.vue'
import BarChart from "@/components/charts/BarChart.vue";
import MiniStatisticsCard from "@/components/cards/MiniStatisticsCard.vue";
import Table from "@/components/tables/Table.vue";
import CategoriesList from "@/components/cards/CategoriesList.vue";
import TableInfoKpiCard from "@/components/cards/TableInfoKpiCard.vue";
import SingleCylinderIcon from "@/assets/svg/single_tank.svg"; //Icon
import TotalCylinderIcon from "@/assets/svg/ordered_cylinder.svg"; //Icon
import CylinderDeliveryIcon from "@/assets/svg/cylinder_delivery.svg"; //Icon
import InventoryStockIcon from "@/assets/svg/in_stock.svg"; //Icon
import LowStockIcon from "@/assets/svg/low_stock.svg"; //Icon

const selectedYear = ref(""); // Set your desired year
const selectedMonth = ref(""); // Set your desired month

definePageMeta({
  layout: "default",
});

let tableConfig = reactive([
  {
    label: "Image",
    prop: "file_list",
    width: "",
    sortable: "",
    className: "redFont",
  },
  {
    label: "Name",
    prop: "name",
    width: "",
    sortable: "sortable",
    className: "redFont",
  },
  {
    label: "Price",
    prop: "price",
    width: "",
    sortable: "sortable",
    className: "blueFont",
  },
  {
    label: "Address",
    prop: "address",
    width: "",
    sortable: "",
    className: "blueFont",
  },
]);

let listData = [
  {
    price: "1",
    name: "Amm",
    address: "aaa",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "2",
    name: "Baa",
    address: "bb",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "3",
    name: "Caa",
    address: "cc",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "4",
    name: "Tom",
    address: "dd",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "5",
    name: "Daa",
    address: "ee",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "6",
    name: "Tom",
    address: "ff",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "7",
    name: "Tom",
    address: "gg",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "8",
    name: "Amm",
    address: "aaa",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "9",
    name: "Baa",
    address: "bb",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
  {
    price: "10",
    name: "Caa",
    address: "cc",
    file_list: [
      {
        name: "f1c8b75e3e535a44e93444e47fe2f77e.png",
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      },
    ],
  },
];

let listQuery = {
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
};

// pagination
function handlePagination(data) {
  getList();
}

function handleAssign(rowData) {
  // Handle the assignment here, and rowData contains the data for the clicked row
  console.log("Assigning data:", rowData);
}

// add
function handleAdd() {
  console.log("add button");
}

// edit
function handleEdit(data) {
  console.log(data);
}

// delete
function handleDelete(data) {
  console.log(data);
}

// get list
function getList() {
  // API CALL MADE
}

function handleMultipleSelection(data) {
  console.log(data);
}

const profileDetails = [
  {
    profile_image: "@/assets/img/team-1.jpg",
    name: "Yaw Graham",
    role: "Distributor",
    status: "active",
    user_id: "101",
    joining: "2020/12/15",
    phone: "9987654321",
    zone: "Northen",
    email: "demo@gmail.com",
    subzone: "N12",
    address: "Agbo-Ashongom Road",
  },
];

const cardData = [
  {
    title: "Overall customers",
    value: "6000",
    description: `<span
                  class='text-sm font-weight-bolder text-success'
                  >+1.5%</span> since last week`,
    icon: {
      component: "ni ni-money-coins",
      background: "bg-gradient-primary",
      shape: "rounded-circle",
    },
  },
  {
    title: "Today's Users",
    value: "2,300",
    description: `<span
                  class='text-sm font-weight-bolder text-success'
                  >+3%</span> since last week`,
    icon: {
      component: "ni ni-world",
      background: "bg-gradient-danger",
      shape: "rounded-circle",
    },
  },
  {
    title: "New Clients",
    value: "+3,462",
    description: `<span
                  class='text-sm font-weight-bolder text-danger'
                  >-2%</span> since last quarter`,
    icon: {
      component: "ni ni-paper-diploma",
      background: "bg-gradient-success",
      shape: "rounded-circle",
    },
  },
  {
    title: "Sales",
    value: "$103,430",
    description: `<span
                  class='text-sm font-weight-bolder text-success'
                  >+5%</span> than last month`,
    icon: {
      component: "ni ni-cart",
      background: "bg-gradient-warning",
      shape: "rounded-circle",
    },
  },
];

const sales = {
  us: {
    name: "Yaw Graham",
    zone: "Northern",
    quantity: "60",
    date: "2023/05/01",
    flag: US,
  },
  germany: {
    name: "Derrick Nwafor",
    zone: "Northern",
    quantity: "50",
    date: "2023/05/02",
    flag: DE,
  },
  britain: {
    name: "Yaw Boafo",
    zone: "Western",
    quantity: "41",
    date: "2023/05/03",
    flag: GB,
  },
  brasil: {
    name: "Kamaldeen Sulley",
    zone: "Western",
    quantity: "30",
    date: "2023/05/05",
    flag: BR,
  },
  us1: {
    name: "Yaw Graham",
    zone: "Northern",
    quantity: "60",
    date: "2023/05/01",
    flag: US,
  },
  germany2: {
    name: "Derrick Nwafor",
    zone: "Northern",
    quantity: "50",
    date: "2023/05/02",
    flag: DE,
  },
};

const categories = [
  {
    url: TI1,
    label: "3kg Steel cyliner",
    description: "<strong>Ghs 95</strong>",
  },
  {
    url: TI2,
    label: "6kg Steel cyliner",
    description: "<strong>Ghs 95</strong>",
  },
  {
    url: TI3,
    label: "12kg Steel cyliner",
    description: "<strong>Ghs 95</strong>",
  },
  {
    url: TI4,
    label: "LPG Hose",
    description: "<strong>Ghs 95</strong>",
  },
  {
    url: TI1,
    label: "3kg Steel cyliner",
    description: "<strong>Ghs 95</strong>",
  },
  {
    url: TI2,
    label: "6kg Steel cyliner",
    description: "<strong>Ghs 95</strong>",
  },
];

// Define and set initial KPI (Key Performance Indicator) data
const distributorKpi = reactive({
  allDistributors: {
    value: "500",
    percentage: "1.2%",
  },
  pendingDistributor: {
    value: "300",
    percentage: "1.2%",
  },
  stockReq: {
    value: "1000",
    percentage: "1.2%",
  },
  complaints: {
    value: "350",
    percentage: "1.2%",
  },
  complaints2: {
    value: "3Kg | Steel",
    percentage: "1.2%",
  },
});
</script>

<style scoped lang="scss">
.kpi_card_wrap {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 50px;
}

@media (max-width: 1450px) {
  .kpi_card_wrap {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 1200px) {
  .kpi_card_wrap {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .kpi_card_wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 575px) {
  .kpi_card_wrap {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
