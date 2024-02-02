<template>
  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4TTdIlL3swAddqR7ZY42BAgAo5Xj4lawocuvnjIuEVXm7ref0Xb9D0LTqfCNyPVGpy8&usqp=CAU"
          alt="Profile" />
        <div class="h_right">
          <div class="h_name">
            <h4>Yaw Boafo</h4>
            <el-switch v-model="value5" disabled inline-prompt active-text="Active" inactive-text="Inactive" />
          </div>
          <div class="h_info">
            <div>
              <p>Delivery agent</p>
              <p>ID:<span>101</span></p>
            </div>
            <div>
              <p>Distributor name:<span>Yaw Graham</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Personal details" name="p_details"></el-tab-pane>
          <el-tab-pane label="Rating" name="rating"></el-tab-pane>
          <el-tab-pane label="All orders" name="all_orders"></el-tab-pane>
          <el-tab-pane label="Complaints" name="complaints"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- table heading -->
    <h4 class="page_heading mt-4 mb-3">{{ tableName }}</h4>
    <div>
      <CustomerDetail v-if="activeName === 'p_details'" :deliveryAgent="true" />
      <CustomerRating v-if="activeName === 'rating'" />
      <CustomerAllOrders v-if="activeName === 'all_orders'" :table="DeliveryAllOrdersTable"
        :filterData="filterAllCusomers" :actionVisibility="false" />
      <CustomerComplaintsTable v-if="activeName === 'complaints'" :table="DeliveryAgentComplaintsTable"
        :filterData="filterAllCusomers" />
    </div>
  </div>
</template>
  
<script setup>
import { ref, watch } from "vue";
import { filterAllCusomers } from "@/composables/useCustomerTable.js";
import CustomerDetail from "@/components/userpanel/CustomerDetail.vue";
import CustomerRating from "@/components/userpanel/Rating.vue";
import CustomerAllOrders from "@/components/tables/components/OrderListData.vue";
import CustomerComplaintsTable from "@/components/tables/components/ComplaintsList.vue";
import { deliveryAgentAllOrders, deliveryAgentAllOrdersConfig } from "~/composables/useDeliveryAgentTable";
import { deliveryAgentComplaints, deliveryAgentComplaintsConfig } from "~/composables/useDeliveryAgentTable";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();


const DeliveryAllOrdersTable = reactive({
  config: deliveryAgentAllOrdersConfig,
  data: deliveryAgentAllOrders
});
const DeliveryAgentComplaintsTable = reactive({
  config: deliveryAgentComplaintsConfig,
  data: deliveryAgentComplaints
})
const activeName = ref("p_details");
const tableName = ref("");
const value5 = ref(true)
watch(activeName, () => {
  if (activeName.value === "all_orders") {
    tableName.value = "All Orders";
  }
  else if (activeName.value === "complaints") {
    tableName.value = "Complaints";
  } else {
    tableName.value = "";
  }
});
const handleClick = (tab, event) => {
  const name = tab.props.name;
};

onMounted(() => {
  navStore.setBreadCrumbs('Delivery Agents / Details')
})



</script>
<style scoped>
@media (min-width: 992px) {
  .cd_box {
    height: 100%;
  }
}
</style>
  