<template>
  <section>
    <!-- Page Title -->
    <h4 class="page_heading mb-3">Delivery vehicles & agents</h4>

    <!-- KPI (Key Performance Indicator) Cards -->
    <el-row class="kpi_card_wrap">
      <!-- KPI Card for Depot -->
      <el-col class="cards" :xs="24" :sm="10" :md="5" :lg="5">
        <TableInfoKpiCard
          @click="fetchApiData('depot')"
          :class="[selectedApi === 'depot' ? 'active-card' : '']"
          title="Depot"
          :percentage="locationKpi.depot.percentage"
          :value="locationKpi.depot.value"
          :icon="DepotIcon"
        />
      </el-col>

      <!-- KPI Card for Exchange Points -->
      <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
        <TableInfoKpiCard
          @click="fetchApiData('exchangePoints')"
          :class="[selectedApi === 'exchangePoints' ? 'active-card' : '']"
          title="Exchange point"
          :percentage="locationKpi.exchangePoints.percentage"
          :value="locationKpi.exchangePoints.value"
          :icon="ExchangePointIcon"
        />
      </el-col>
    </el-row>

    <!-- Table Title and Add Button -->

    <div class="all_heading">
      <!-- Dynamic Table Title -->
      <h4 class="page_heading m-0">{{ tableName }}</h4>
      <!-- Add Button with Dynamic Label -->
      <button type="button" class="btn btn-primary" @click="handleCreate()">
        <i class="ri-add-line"></i>{{ buttonLabel }}
      </button>
    </div>

    <!-- Table Component -->
    <div class="table-area">
      <!-- Custom Table Component -->
      <Table
        style="border-radius: 20px"
        :addButtonVisibility="false"
        :tableCheckBoxVisibility="true"
        :export="true"
        :filter="true"
        :refresh="true"
        :tableConfig="selectedTableConfig"
        :tableData="selectedTableData"
        :tableQuery="listQuery"
        @view="handleDynamicView"
        @pagination="handlePagination()"
        :editButtonVisibility="false"
        @edit="handleEdit($event)"
        @delete="handleDelete($event)"
        @multipleSelection="handleMultipleSelection($event)"
        :heading-row-reverse="true"
      />
    </div>
  </section>
</template>
<script setup>
import Table from "@/components/tables/Table.vue";
import TableInfoKpiCard from "@/components/cards/TableInfoKpiCard.vue";
import { useNavStore } from "@/stores/NavStore";
import { depotData, DepotTableConfig } from "@/composables/useDepotTable";
import {
  exchangeTableConfig,
  exchangeTableData,
} from "@/composables/useExchangePointTable";
import DepotIcon from "@/assets/svg/depot_icon.svg";
import ExchangePointIcon from "@/assets/svg/exchange_point_icon.svg";

// Define reactive variables and initialize them
const selectedTableConfig = ref([]);
const selectedTableData = ref([]);
const tableName = ref("");
const buttonLabel = ref("");
const selectedApi = ref("");
const navStore = useNavStore();
const router = useRouter();

// Define and set initial KPI (Key Performance Indicator) data
const locationKpi = reactive({
  depot: {
    value: "+500",
    percentage: "11.2%",
  },
  exchangePoints: {
    value: "+1,500",
    percentage: "15.2%",
  },
});

// Function to fetch data for the selected API
const fetchApiData = async (apiName) => {
  selectedApi.value = apiName;
  if (apiName === "depot") {
    tableName.value = "Depot";
    buttonLabel.value = "Add new depot";
    selectedTableConfig.value = DepotTableConfig;
    selectedTableData.value = depotData;
  } else if (apiName === "exchangePoints") {
    buttonLabel.value = "Add new exchange point";
    tableName.value = "Exchange point";
    selectedTableData.value = exchangeTableData;
    selectedTableConfig.value = exchangeTableConfig;
  }
};

// Define reactive object for list query parameters
let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});

// Function to handle create action based on selected API
const handleCreate = () => {
  if (selectedApi.value === "depot") {
    router.push("/distributor/add-distributor/onboard-depot");
  } else if (selectedApi.value === "exchangePoints") {
    // Handle add exchange point action
    // handleAddExchangePoint
  }
};

// Handle pagination event
function handlePagination(data) {
  getList();
}

// Dynamic view handler based on selected API
const handleDynamicView = (data, name) => {
  if (selectedApi.value === "depot") {
    // Handle view for Depot API
    handleDepotView(data, name);
  } else if (selectedApi.value === "exchangePoints") {
    // Handle view for Exchange Points API
    handleExchangeView(data, name);
  }
};

// Function to handle view for Depot API
function handleDepotView(data, name) {
  if (name === "depot_manager_name") {
    router.push(
      `${router.currentRoute.value.fullPath}/depot/manager-${data.depot_manager_name[0].content}`
    );
  } else {
    router.push(
      `${router.currentRoute.value.fullPath}/depot/depot-${data.depot_name}`
    );
  }
}

// Function to handle view for Exchange Points API
function handleExchangeView(data, name) {
  if (name === "exchange_point_officer") {
    router.push(
      `${router.currentRoute.value.fullPath}/exchange-point/manager-${data.exchange_point_officer[0].id}`
    );
  } else if (name === "exchange_point") {
    router.push(
      `${router.currentRoute.value.fullPath}/exchange-point/exchange-${data.exchange_point}`
    );
  }
}

// Handle delete event
function handleDelete(data) {
  useToast("warning", "You are not allowed to change data of default user");
}

// Fetch a list of data
function getList() {
  // API CALL MADE
}

// Perform initial actions before mounting the component
onBeforeMount(async () => {
  await fetchApiData("depot");
});
onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Location");
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
