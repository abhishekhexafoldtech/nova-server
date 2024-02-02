<template>
  <section>
    <div class="container-area">
      <!-- Page Title -->
      <h4 class="page_heading mb-3">Inventory and Stock</h4>

      <!-- KPI (Key Performance Indicator) Cards -->
      <el-row class="kpi_card_wrap">
        <!-- KPI Card for Purchase receives -->
        <el-col class="cards" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard @click="fetchApiData('purchaseReceives')"
            :class="[selectedApi === 'purchaseReceives' ? 'active-card' : '']" title="Purchase receives"
            :percentage="inventoryKpi.purchaseReceives.percentage" :value="inventoryKpi.purchaseReceives.value"
            :icon="purchase_receive" />
        </el-col>

        <!-- KPI Card for Cylinder tracking -->
        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard @click="fetchApiData('cylinderTracking')"
            :class="[selectedApi === 'cylinderTracking' ? 'active-card' : '']" title="Cylinder tracking"
            :percentage="inventoryKpi.cylinderTracking.percentage" :value="inventoryKpi.cylinderTracking.value"
            :icon="track" />
        </el-col>

        <!-- KPI Card for Distributor’s stock -->
        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard @click="fetchApiData('distributorStock')"
            :class="[selectedApi === 'distributorStock' ? 'active-card' : '']" title="Distributor’s stock"
            :percentage="inventoryKpi.distributorStock.percentage" :value="inventoryKpi.distributorStock.value"
            :icon="StockReq" />
        </el-col>
      </el-row>

      <!-- Table Title and Add Button -->

      <h4 class="page_heading mt-5 mb-3">{{ tableName }}</h4>

      <!-- Table Component -->
      <div class="table-area">
        <Table 
          style="border-radius: 20px" 
          :addButtonVisibility="false" 
          :tableCheckBoxVisibility="false"
          :actionVisibility="false" 
          :export="true" :filter="true" 
          :filterData="filterAllManufacturers" 
          :refresh="true"
          :tableConfig="selectedTableConfig" 
          :tableData="selectedTableData" 
          :tableQuery="listQuery" 
          @view="handleView"
          @pagination="handlePagination()" 
          :editButtonVisibility="tableEditButtonVisibility" 
          @edit="handleEdit($event)"
          @delete="handleDelete($event)" 
          @multipleSelection="handleMultipleSelection($event)"
          :heading-row-reverse="true" 
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import Table from "@/components/tables/Table.vue";

// import { filterAllManufacturers } from "@/composables/useManufacturerTable.js";
import { useRouter } from "vue-router";
import {
  purchaseReceiveConfig,
  purchaseReceive,
  cylinderTrackConfig,
  cylinderTrack,
  distributorStockConfig,
  distributorStock,
} from "@/composables/useInventoryTable.js";
import { ref, onBeforeMount, onMounted } from "vue";
import purchase_receive from "@/assets/svg/purchase_receive.svg"; //Icon
import StockReq from "@/assets/svg/StockReq.svg"; //Icon
import track from "@/assets/svg/track.svg"; //Icon
import TableInfoKpiCard from "@/components/cards/TableInfoKpiCard.vue";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

// Define reactive variables and set their initial values
const selectedTableConfig = ref([]);
const selectedTableData = ref([]);
const tableEditButtonVisibility = ref(true);
const router = useRouter();

// Define and set initial KPI (Key Performance Indicator) data
const inventoryKpi = reactive({
  purchaseReceives: {
    value: "+500",
    percentage: "11.2%",
  },
  cylinderTracking: {
    value: "+30",
    percentage: "1.2%",
  },
  distributorStock: {
    value: "+1,500",
    percentage: "15.2%",
  },
});

// Define variables for table name, add button and selected API
const tableName = ref("");
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
  if (apiName === "purchaseReceives") {
    tableName.value = "Purchase receives";
    selectedTableConfig.value = purchaseReceiveConfig;
    tableEditButtonVisibility.value = false;
    selectedTableData.value = purchaseReceive;
  } else if (apiName === "cylinderTracking") {
    tableName.value = "Cylinder tracking";
    tableEditButtonVisibility.value = true;
    selectedTableData.value = cylinderTrack;
    selectedTableConfig.value = cylinderTrackConfig;
  } else if (apiName === "distributorStock") {
    tableName.value = "Distributor’s stock";
    tableEditButtonVisibility.value = true;
    selectedTableData.value = distributorStock;
    selectedTableConfig.value = distributorStockConfig;
  }
};


// handleView

// function handleView(data) {
//   console.log(data);
//   router.push(`manufacturer/manufacturer-${data.batch_num}`)
// }
function handleView(data) {
  console.log(data);

  // Check the selected KPI and navigate to the corresponding route
  if (selectedApi.value === 'purchaseReceives') {
    // Redirect to the Purchase Receives page
    router.push(`inventory-stock/purchase-receives-${data.batch_num}`);
  } else if (selectedApi.value === 'cylinderTracking') {
    // Redirect to the Cylinder Tracking page
    router.push(`inventory-stock/cylinder-tracking-${data.id}`);
  } else if (selectedApi.value === 'distributorStock') {
    // Redirect to the Distributor's Stock page
    router.push(`inventory-stock/distributor-stock/${data.id}`);
  }
}

// Perform initial actions before mounting the component
onBeforeMount(async () => {
  await fetchApiData("purchaseReceives");
});

onMounted(() => {
  navStore.setBreadCrumbs('Inventory and Stock')
})


definePageMeta({
  layout: "default",
});
</script>
  