<template>
  <h4 class="page_heading mt-4 mb-4">All orders</h4>
  <div>
    <Table
      style="border-radius: 20px"
      :addButtonVisibility="false"
      :actionVisibility="false"
      :tableCheckBoxVisibility="true"
      :export="true"
      :filter="true"
      :filterData="tableData.filterOptions"
      :refresh="true"
      :tableConfig="tableData.tableConfig"
      :tableData="tableData.tableData"
      :tableQuery="tableData.listQuery"
      :table-check-box-visibility="true"
      @pagination="handlePagination()"
      @multipleSelection="handleMultipleSelection($event)"
      :heading-row-reverse="true"
    />
  </div>
</template>
<script setup>
import Table from "@/components/tables/Table.vue";
import {
  serviceAgentAllOrders,
  serviceAgentAllOrdersConfig,
  listQuery,
  filterAllOrders,
} from "~/composables/useServiceAgent";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const tableData = {
  tableData: serviceAgentAllOrders,
  tableConfig: serviceAgentAllOrdersConfig,
  listQuery: listQuery,
  filterOptions: filterAllOrders,
};

const handlePagination = (page) => {
  console.log(page);
};

onMounted(() => {
  navStore.setBreadCrumbs(
    "Distributor / Delivery vehicles & agents / Service agent / All orders"
  );
});
</script>
