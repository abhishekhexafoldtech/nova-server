<template>
  <section>
    <h4 class="page_heading mb-3">Delivery vehicles & agents</h4>


    <el-row class="kpi_card_wrap">
      <!-- KPI Card for totalDeliveryAgents -->
      <el-col class="cards" :xs="24" :sm="10" :md="5" :lg="5">
        <TableInfoKpiCard
          @click="fetchApiData('totalDeliveryAgents')"
          :class="[selectedApi === 'totalDeliveryAgents' ? 'active-card' : '']"
          title="Total delivery agents"
          :percentage="deliveryAgentKPI.weekly_growth"
          :value="deliveryAgentKPI.total"
          :icon="TotalDeliveryAgents"
        />
      </el-col>

      <!-- KPI Card for deliveryVehicals -->
      <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
        <TableInfoKpiCard
          @click="fetchApiData('deliveryVehicals')"
          :class="[selectedApi === 'deliveryVehicals' ? 'active-card' : '']"
          title="Delivery vehicles"
          :percentage="deliveryVehicleKPI.weekly_growth"
          :value="deliveryVehicleKPI.total"
          :icon="Vehical"
        />
      </el-col>

      <!-- KPI Card for seviceAgent -->
      <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
        <TableInfoKpiCard
          @click="fetchApiData('seviceAgent')"
          :class="[selectedApi === 'seviceAgent' ? 'active-card' : '']"
          title="Service agent"
          :percentage="serviceAgentKPI.weekly_growth"
          :value="serviceAgentKPI.total"
          :icon="ServiceAgent"
        />
      </el-col>
    </el-row>

    <div class="all_heading">
      <h4 class="page_heading m-0">{{ tableName }}</h4>
      <div v-if="selectedApi === 'deliveryVehicals'">
        <button type="primary" class="btn btn-primary" @click="handleCreate()">
          <i class="ri-add-line"></i>Add Vehicle 
        </button>
      </div>
    </div>
  
    <div class="table-area">
      <Table
        style="border-radius: 20px"
        :addButtonVisibility="false"
        :view-button-visibility="visibleButton"
        :tableCheckBoxVisibility="true"
        :export="true"
        :filter="true"
        :filterData="filterAllCusomers"
        :refresh="true"
        :tableConfig="selectedTableConfig"
        :tableData="selectedTableData"
        :tableQuery="listQuery"
        @view="handleView"
        @pagination="handlePagination()"
        :editButtonVisibility="tableEditButtonVisibility"
        @edit="handleEdit($event)"
        @delete="handleDelete($event)"
        :heading-row-reverse="true"
      />
    </div>

  </section>
</template>
<script setup>

import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { fetchBusinessDetails } from "@/api/distributor/distributor-details"
import { useNavStore } from "@/stores/NavStore";

import { filterAllCusomers } from "@/composables/useCustomerTable.js";
import { totalDeliveryAgentConfig, serviceAgentConfig, deliveryVehiclesConfig } from "@/composables/useDelhiveryVehicalsAndAgents.js";
import Table from "@/components/tables/Table.vue";
import TableInfoKpiCard from "@/components/cards/TableInfoKpiCard.vue";

import TotalDeliveryAgents from "@/assets/svg/TotalDeliveryAgents.svg"; //Icon
import Vehical from "@/assets/svg/Vehical.svg"; //Icon
import ServiceAgent from "@/assets/svg/ServiceAgent.svg"; //Icon


const navStore = useNavStore();

const selectedTableConfig = ref([]);
const selectedTableData = ref([]);
const tableEditButtonVisibility = ref(true);
const customerEdit = ref(false);
const distName = ref(null);
const visibleButton = ref(false);
const router = useRouter();


const tableName = ref("");
const selectedApi = ref("");


const props = defineProps({
  distId: null,

  deliveryAgentKPI: {
    type: Object,
    default: function () {
      return {};
    }
  },
  deliveryVehicleKPI: {
    type: Object,
    default: function () {
      return {};
    }
  },
  serviceAgentKPI: {
    type: Object,
    default: function () {
      return {};
    }
  },
});


let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});


const fetchApiData = async (apiName) => {
  selectedApi.value = apiName;


  if (apiName === "totalDeliveryAgents") {
    navStore.setBreadCrumbs("Distributor / Delivery vehicles & agents / Total delivery agents");

    tableName.value = "Total delivery agents";
    selectedTableConfig.value = totalDeliveryAgentConfig;
    tableEditButtonVisibility.value = true;
    visibleButton.value = false;


    let id = props.distId;
      let paramsQuery = reactive({
        "tab": "employee",
        "employee": "delivery_agent"
      });

      fetchBusinessDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          console.log("totalDeliveryAgents",res.data[0])

          let customeResponse = {
              "items" : res.data[0].employee_details,
              "total": 10,
              "page": 1,
              "size": 10,
              "pages": 1
            }
            selectedTableData.value = customeResponse;
        } 
      })


  } else if (apiName === "deliveryVehicals") {
    navStore.setBreadCrumbs("Distributor / Delivery vehicles & agents / Delivery vehicles");
    tableName.value = "Delivery vehicles";
    selectedTableConfig.value = deliveryVehiclesConfig;
    tableEditButtonVisibility.value = true;
    visibleButton.value = false;


    let id = props.distId;
      let paramsQuery = reactive({
        "tab": "employee",
        "employee": "delivery_vehicle"
      });

      fetchBusinessDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          console.log("deliveryVehicals",res.data[0])

          let customeResponse = {
              "items" : res.data[0].delivery_vehicles,
              "total": 10,
              "page": 1,
              "size": 10,
              "pages": 1
            }
            selectedTableData.value = customeResponse;
        } 
      })

  } else if (apiName === "seviceAgent") {
    navStore.setBreadCrumbs("Distributor / Delivery vehicles & agents / Service agent");
    tableName.value = "Service agent";
    tableEditButtonVisibility.value = true;
    selectedTableConfig.value = serviceAgentConfig;
    visibleButton.value = false;

    let id = props.distId;
      let paramsQuery = reactive({
        "tab": "employee",
        "employee": "service_agent"
      });

      fetchBusinessDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          console.log("seviceAgent",res.data[0])

          let customeResponse = {
              "items" : res.data[0].employee_details,
              "total": 10,
              "page": 1,
              "size": 10,
              "pages": 1
            }
            selectedTableData.value = customeResponse;
        } 
      })


  }
  selectedApi.value = apiName;
};


function handlePagination() {
 // PAGINATION is not completed form backend
}


function handleEdit(data) {
  console.log(data);
  customerEdit.value = true;
  // let r = "edit";
  // router.push(`distributor/${r}-${data.id}`);
}



function handleDelete(data) {
  useToast("warning", "You are not allowed to change data of default user");
  console.log(data);
}


function handleCreate() {
  let r = "add-vehicale";
  router.push(`${r}`);
}


function handleView(data) {
  console.log(data)
  let r;
  if (selectedApi.value === "totalDeliveryAgents") {
    r = `delivery-agent-${data.id}`;
  } else if (selectedApi.value === "deliveryVehicals") {
    r = `delivery-vehical/delivery-vehical-${data.vehical_id}`;
  } else if (selectedApi.value === "seviceAgent") {
    r = `service-agent-${data.id}`;
  }

  // Push the URL based on the selected KPI card and dynamic value
  router.push(`/distributor/distributor-details-${distName.value}/${r}`);
}


onBeforeMount(async () => {
  await fetchApiData("totalDeliveryAgents");
});


onMounted(() => {
  distName.value = router.currentRoute.value.params.slug;
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
