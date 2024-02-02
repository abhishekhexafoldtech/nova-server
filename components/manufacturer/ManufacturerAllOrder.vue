<template>
    <div class="table-area">
        <Table
          style="border-radius: 20px"
          :addButtonVisibility="false"
          :tableCheckBoxVisibility="true"
          :actionVisibility="false"
          :export="true"
          :filter="true"
          :filterData="filterAllCusomers"
          :refresh="true"
          :tableConfig="allOrderConfig"
          :tableData="allOrder"
          :tableQuery="listQuery"
          @view="handleView"
          @pagination="handlePagination()"
          @multipleSelection="handleMultipleSelection($event)"
          :heading-row-reverse="true"
        />
      </div>
</template>

<script setup>

import { filterAllCusomers } from "@/composables/useCustomerTable.js";
import { useRouter } from "vue-router";
import {
    allOrderConfig,
    allOrder,
} from "@/composables/useManufacturerOrderTable.js";
import { ref, onBeforeMount, onUnmounted } from "vue";
import Table from "@/components/tables/Table.vue";
const router = useRouter();
const ordersTableConfig = ref([]);
const ordersTableData = ref([]);
const tableEditButtonVisibility = ref(true);
const selectedApi = ref(null);

// Define variables for table name and selected API
let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});

//fetch the table data
const fetchApiData = async (apiName) => {
  selectedApi.value = apiName;
  await allOrderConfig(apiName);
  const data = JSON.parse(sessionStorage.getItem("orders_data"));
  allOrderConfig.value = tableConfig.allOrders;
  tableEditButtonVisibility.value = true;
  allOrder.value = data;

  // if (apiDataCache.value[apiName]) {
  //   return; // Data is cached; no need to make the API request again
  // };
  // Set the selected API
  selectedApi.value = apiName;
};


// Handle pagination event
function handlePagination(data) {
  getList();
}


// handleView

function handleView(data){
  console.log(data);
  router.push(`/manufacturer/manufacturers-orders-${data.id}`)
}

// Fetch a list of data
function getList() {
  // API CALL MADE
}

// Handle multiple selection event
function handleMultipleSelection(data) {
  console.log(data);
}

onBeforeMount(async () => {
  await fetchApiData("customers");
});

definePageMeta({
  layout: "default",
});
</script>