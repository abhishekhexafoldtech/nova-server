<template>
  <section>
    <div v-if="!allManufacturers.total">
      <!-- Display an empty manager component -->
      <empty-manager heading="No manufacturer added yet"
        description="You haven’t added any manufacturer. Start by adding first manufacturer" button="+ Add Manufacturer"
        :icon="emptyManufacturer" @doSomething="handleCreate" />
    </div>

    <div class="container-area">
      <!-- Page Title -->
      <h4 class="page_heading mb-3">Manufacturer</h4>

      <!-- KPI (Key Performance Indicator) Cards -->
      <el-row class="kpi_card_wrap">
        <!-- KPI Card for All Manufacturers -->
        <el-col class="cards" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard @click="fetchApiData('allManufacturer')"
            :class="[selectedApi === 'allManufacturer' ? 'active-card' : '']" title="All manufacturer"
            :percentage="manufacturerKpi.allManufacturers.percentage" :value="manufacturerKpi.allManufacturers.value"
            :icon="Manufacturer" />
        </el-col>

        <!-- KPI Card for Stock Requests -->
        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard @click="fetchApiData('stockReq')" :class="[selectedApi === 'stockReq' ? 'active-card' : '']"
            title="Stock request" :percentage="manufacturerKpi.stockReq.percentage"
            :value="manufacturerKpi.stockReq.value" :icon="StockReq" />
        </el-col>

        <!-- KPI Card for Return Orders -->
        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard @click="fetchApiData('returnOrder')"
            :class="[selectedApi === 'returnOrder' ? 'active-card' : '']" title="Return order"
            :percentage="manufacturerKpi.returnOrder.percentage" :value="manufacturerKpi.returnOrder.value"
            :icon="ReturnOrder" />
        </el-col>
      </el-row>

      <!-- Table Title and Add Button -->

      <div class="all_heading">
        <h4 class="page_heading m-0">{{ tableName }}</h4>
        <button type="button" class="btn btn-primary " @click="handleCreate()">
          <i class="ri-add-line"></i>{{ buttonLabel }}
        </button>
      </div>

      <!-- Table Component -->
      <div class="table-area">
        <Table style="border-radius: 20px" :addButtonVisibility="false" :tableCheckBoxVisibility="true"
          :actionVisibility="false" :export="true" :filter="true" :filterData="filterAllManufacturers" :refresh="true"
          :tableConfig="selectedTableConfig" :tableData="selectedTableData" :tableQuery="listQuery" @view="handleView"
          @pagination="handlePagination()" :editButtonVisibility="tableEditButtonVisibility" @edit="handleEdit($event)"
          @delete="handleDelete($event)" @multipleSelection="handleMultipleSelection($event)"
          :heading-row-reverse="true" />
      </div>
    </div>
  </section>
</template>
<script setup>
import emptyManufacturer from "@/assets/svg/emptyManufacturer.svg";
import EmptyManager from "~/components/cards/EmptyManager.vue";
import Table from "@/components/tables/Table.vue";

// import { filterAllManufacturers } from "@/composables/useManufacturerTable.js";
import { useRouter } from "vue-router";
import {
  allManufacturersConfig,
  allManufacturers,
  stockReqConfig,
  stockReq,
  returnOrderConfig,
  returnOrder,
} from "@/composables/useManufacturerTable.js";
import { ref, onBeforeMount, onUnmounted } from "vue";
import Manufacturer from "@/assets/svg/Manufacturer.svg"; //Icon
import StockReq from "@/assets/svg/StockReq.svg"; //Icon
import ReturnOrder from "@/assets/svg/ReturnOrder.svg"; //Icon
import TableInfoKpiCard from "@/components/cards/TableInfoKpiCard.vue";

// Define reactive variables and set their initial values
const selectedTableConfig = ref([]);
const selectedTableData = ref([]);
const tableEditButtonVisibility = ref(true);
const router = useRouter();

// Define and set initial KPI (Key Performance Indicator) data
const manufacturerKpi = reactive({
  allManufacturers: {
    value: "+500",
    percentage: "11.2%",
  },
  stockReq: {
    value: "+30",
    percentage: "1.2%",
  },
  returnOrder: {
    value: "+1,500",
    percentage: "15.2%",
  },
});

// Define variables for table name, add button and selected API
const tableName = ref("");
const buttonLabel = ref("")
const selectedApi = ref("");
let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});

// Fetch data for the selected API
const fetchApiData = async (apiName) => {
  selectedApi.value = apiName;
  if (apiName === "allManufacturer") {
    tableName.value = "All Manufacturer";
    buttonLabel.value = "Add Manufacturer"
    selectedTableConfig.value = allManufacturersConfig;
    tableEditButtonVisibility.value = false;
    selectedTableData.value = allManufacturers;
  } else if (apiName === "stockReq") {
    buttonLabel.value = "Add Stock";
    tableName.value = "Stock request";
    tableEditButtonVisibility.value = true;
    selectedTableData.value = stockReq;
    selectedTableConfig.value = stockReqConfig;
  } else if (apiName === "returnOrder") {
    buttonLabel.value = "Return stock";
    tableName.value = "Return order";
    tableEditButtonVisibility.value = true;
    selectedTableData.value = returnOrder;
    selectedTableConfig.value = returnOrderConfig;
  }
};

// Handle the creation of a new manufacturer
// function handleCreate() {
//   let r = "add-manufacturer";
//   router.push(`manufacturer/${r}`);
// }
// Handle the creation of a new manufacturer
const handleCreate = () => {
  if (selectedApi.value === "allManufacturer") {
    router.push("manufacturer/add-manufacturer");
  } else if (selectedApi.value === "stockReq") {
    router.push("manufacturer/add-stock");
  } else if (selectedApi.value === "returnOrder") {
    router.push("manufacturer/return-stock");
  }
};

// handleView

function handleView(data) {
  console.log(data);
  router.push(`manufacturer/manufacturer-${data.id}`)
}

// Perform initial actions before mounting the component
onBeforeMount(async () => {
  await fetchApiData("allManufacturer");
});


definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.all_heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  padding-bottom: 20px;

  .page_heading {
    padding-top: 10px;
  }

  button {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>
