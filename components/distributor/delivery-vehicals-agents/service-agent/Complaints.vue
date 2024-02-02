<template>
  <h4 class="page_heading mt-4 mb-4">Complaints</h4>
  <div>
    <Table
      style="border-radius: 20px"
      :addButtonVisibility="true"
      :view-button-visibility="false"
      :edit-button-visibility="false"
      :actionVisibility="true"
      :tableCheckBoxVisibility="true"
      :export="true"
      :filter="true"
      :filterData="tableData.filterOptions"
      :refresh="true"
      :tableConfig="tableData.tableConfig"
      :tableData="tableData.tableData"
      :tableQuery="tableData.listQuery"
      :table-check-box-visibility="false"
      @view="handleView"
      @delete="handleDelete"
      @pagination="handlePagination()"
      @multipleSelection="handleMultipleSelection($event)"
      :heading-row-reverse="true"
    />
  </div>
</template>
<script setup>
import Table from "@/components/tables/Table.vue";
import {
  serviceAgentComplaints,
  serviceAgentComplaintsConfig,
  filterComplaints,
  listQuery,
} from "@/composables/useServiceAgent";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const tableData = {
  tableData: serviceAgentComplaints,
  tableConfig: serviceAgentComplaintsConfig,
  listQuery: listQuery,
  filterOptions: filterComplaints,
};

const handleView = () => {
  console.log("view");
};
// Handle delete event
function handleDelete(data) {
  useToast("warning", "You are not allowed to change data of default user");
}
const handlePagination = (page) => {
  console.log(page);
};

onMounted(() => {
  navStore.setBreadCrumbs(
    "Distributor / Delivery vehicles & agents / Service agent / Complaints"
  );
});
</script>
