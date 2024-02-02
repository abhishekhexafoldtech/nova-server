<template>
  <section>
    <div>
      <CardsEmptyManager v-if="!deliveryAgentTableData.total"
       :icon="emptyDeliveryAgentsCard.icon" 
       :heading="emptyDeliveryAgentsCard.heading"
       :description="emptyDeliveryAgentsCard.description"  
      />
    </div>

    <div class="container-area">
      <DeliveryAgentEditForm :visible="customerEdit"
        @handleUpdateCustomerDetails="handleEditedUserUpdate"
        @handleCloseCustomerEditForm="handleEditUserClose" 
        :work_timing="true" />

      <h4 class="page_heading mb-3">Delivery agents</h4>
      <div class="delivery_card_wrap">
        <TableInfoKpiCard :class="[selectedApi.name === 'allagents' ? 'active-card' : '']" :title="deliveryKpi.all_agents.title"
          :percentage="deliveryKpi.all_agents.percentage" :value="deliveryKpi.all_agents.value"
          :icon="deliveryKpi.all_agents.icon" @click="handleKpi('allagents')" />
        <TableInfoKpiCard :class="[selectedApi.name === 'shippingorder' ? 'active-card' : '']"
          :title="deliveryKpi.shipping_order.title" :percentage="deliveryKpi.shipping_order.percentage"
          :value="deliveryKpi.shipping_order.value" :icon="deliveryKpi.shipping_order.icon"
          @click="handleKpi('shippingorder')" />
        <TableInfoKpiCard :class="[selectedApi.name === 'deliverypending' ? 'active-card' : '']"
          :title="deliveryKpi.delivery_pending.title" :percentage="deliveryKpi.delivery_pending.percentage"
          :value="deliveryKpi.delivery_pending.value" :icon="deliveryKpi.delivery_pending.icon"
          @click="handleKpi('deliverypending')" />
        <TableInfoKpiCard :class="[selectedApi.name === 'deliverycompleted' ? 'active-card' : '']"
          :title="deliveryKpi.delivery_completed.title" :percentage="deliveryKpi.delivery_completed.percentage"
          :value="deliveryKpi.delivery_completed.value" :icon="deliveryKpi.delivery_completed.icon"
          @click="handleKpi('deliverycompleted')" />
        <TableInfoKpiCard :class="[selectedApi.name === 'complaints' ? 'active-card' : '']" :title="deliveryKpi.complaints.title"
          :percentage="deliveryKpi.complaints.percentage" :value="deliveryKpi.complaints.value"
          :icon="deliveryKpi.complaints.icon" @click="handleKpi('complaints')" />
      </div>

      <h4 class="page_heading mt-5 mb-3 text-capitalize">{{ selectedApi.value }}</h4>
      <div class="table-area">
        <Table style="border-radius: 20px" :addButtonVisibility="false" :tableCheckBoxVisibility="true" :export="true"
          :filter="true" :filterData="filterAllCusomers" :refresh="true" :tableConfig="deliveryAgentTableConfig"
          :heading-row-reverse="true" :tableData="deliveryAgentTableData" :tableQuery="listQuery"
          @edit="handleEdit($event)" @view="handleView" />
        <!-- tableData="tableConfig"
               
                @view="handleView"
                @pagination="handlePagination()"
                :editButtonVisibility="tableEditButtonVisibility"
                @edit="handleEdit($event)"
                @delete="handleDelete($event)"
                @multipleSelection="handleMultipleSelection($event)" -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { filterAllCusomers } from "@/composables/useCustomerTable.js";
import CardsEmptyManager from "@/components/cards/EmptyManager.vue";
import emptyDeliveryAgentIcon from "@/assets/svg/delivery_agents_empty_icon.svg";
import TableInfoKpiCard from "@/components/cards/TableInfoKpiCard.vue"
import DeliveryAgentEditForm from "@/components/Dialog/UserEditForm.vue";
import delivery_agent_and_vehicle from "@/assets/svg/delivery_agent_vehicle_icon.svg"
import delivery_agent_shipping_order from "@/assets/svg/delivery_agent_shipping_order.svg";
import delivery_agent_delivery_pending from "@/assets/svg/delivery_agent_delivery_pending.svg";
import delivery_agent_delivery_completed from "@/assets/svg/delivery_agent_delivery_completed.svg";
import customer_complaints_icon from "@/assets/svg/customer_complaints_icon.svg";
// table
import Table from "@/components/tables/Table.vue"
import { allDeliveryAgentsConfig, allDeliveryAgents, deliveryAgentShippingOrderConfig, deliveryAgentShippingOrder, deliveryAgentAllComplaintsConfig, deliveryAgentAllComplaints } from "@/composables/useDeliveryAgentTable.js";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();


const customerEdit = ref(false);

const router = useRouter();

const emptyDeliveryAgentsCard = reactive(
  {
    icon: emptyDeliveryAgentIcon,
    heading: "No delivery agents added yet",
    description: "List of delivery agents not added yet."
  }
);
const selectedApi = reactive({
  name: "allagents",
  value: ""
})

const deliveryKpi = reactive({
  all_agents: {
    title: "All delivery agents",
    value: "+500",
    percentage: "1.2%",
    icon: delivery_agent_and_vehicle
  },
  shipping_order: {
    title: "Shipping order",
    value: "+30",
    percentage: "1.2%",
    icon: delivery_agent_shipping_order
  },
  delivery_pending: {
    title: "Delivery pending",
    value: "+10",
    percentage: "1.2%",
    icon: delivery_agent_delivery_pending
  },
  delivery_completed: {
    title: "Delivery completed",
    value: "+100",
    percentage: "1.2%",
    icon: delivery_agent_delivery_completed
  },
  complaints: {
    title: "Complaints",
    value: "+10",
    percentage: "1.2%",
    icon: customer_complaints_icon
  },
});
const deliveryAgentTableConfig = ref([]);
const deliveryAgentTableData = ref([])
let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});
function handleKpi(data) {
  selectedApi.name = data;
  if (selectedApi.name === 'allagents') {
    deliveryAgentTableConfig.value = allDeliveryAgentsConfig;
    deliveryAgentTableData.value = allDeliveryAgents;
    selectedApi.value = deliveryKpi.all_agents.title;
  }
  else if (selectedApi.name === 'shippingorder') {
    deliveryAgentTableConfig.value = deliveryAgentShippingOrderConfig;
    deliveryAgentTableData.value = deliveryAgentShippingOrder;
    selectedApi.value = deliveryKpi.shipping_order.title;
  }
  else if (selectedApi.name === 'deliverypending') {
    deliveryAgentTableConfig.value = deliveryAgentShippingOrderConfig;
    deliveryAgentTableData.value = deliveryAgentShippingOrder;
    selectedApi.value = deliveryKpi.delivery_pending.title;
  }
  else if (selectedApi.name === 'deliverycompleted') {
    deliveryAgentTableConfig.value = deliveryAgentShippingOrderConfig;
    deliveryAgentTableData.value = deliveryAgentShippingOrder;
    selectedApi.value = deliveryKpi.delivery_completed.title;
  }
  else if (selectedApi.name === 'complaints') {
    deliveryAgentTableConfig.value = deliveryAgentAllComplaintsConfig;
    deliveryAgentTableData.value = deliveryAgentAllComplaints;
    selectedApi.value = deliveryKpi.complaints.title
  } else {
    deliveryAgentTableConfig.value = allDeliveryAgentsConfig;
    deliveryAgentTableData.value = allDeliveryAgents;
    selectedApi.value = deliveryKpi.all_agents.title
  }
}
function handleEdit(event) {
  customerEdit.value = true;
}
function handleEditUserClose(data) {
  if (data === 'cancel') {
    console.log("delivery user edit form canceled")
  }
  customerEdit.value = false;
}
function handleEditedUserUpdate(data) {
  flashNotification("success", "Delivery user details updated.");
  customerEdit.value = false;
}
function handleView() {
  const r = "agent"
  router.push(`delivery/${r}-id`)
}
onMounted(() => {
  handleKpi();
})

onMounted(() => {
  navStore.setBreadCrumbs('Delivery Agents')
})



</script>

<style lang="scss" scoped>
</style>