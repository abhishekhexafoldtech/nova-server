<template>
  <section>
    <div v-if="!allDepot.total">
      <empty-manager
        :icon="iconImgUnits"
        heading="No Units added yet"
        description="You haven't added any Units. Start by adding first Units."
        button="+ Add Units"
        @doSomething="handleCreate"
      />
    </div>
    <div class="container-area">
      <!-- Page Title -->
      <h4 class="page_heading mb-3">Units</h4>

      <!-- KPI (Key Performance Indicator) Cards -->
      <el-row class="kpi_card_wrap unit_kpi">
        <!-- KPI Card for All Depot -->
        <el-col class="cards" :xs="24" :sm="10" :md="5" :lg="5">
          <UnitsKpiCard
            @click="fetchApiData('allDepot')"
            :class="[selectedApi === 'allDepot' ? 'active-card' : '']"
            title="All Depot"
            :percentage="depots.allDepot.percentage"
            :value="depots.allDepot.value"
            :icon="StoreHouse"
          />
        </el-col>

        <!-- KPI Card for all exchange point -->
        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
          <UnitsKpiCard
            @click="fetchApiData('allExchangePoint')"
            :class="[selectedApi === 'allExchangePoint' ? 'active-card' : '']"
            title="All Exchange Point"
            :percentage="depots.allExchangePoint.percentage"
            :value="depots.allExchangePoint.value"
            :icon="ExchangePoint"
          />
        </el-col>
      </el-row>
      
      <!-- Table Title and Add Button -->

      <div class="all_heading">
        <h4 class="page_heading m-0 p-0">{{ tableName }}</h4>
        <button type="button" class="btn btn-primary" @click="handleCreate()">
          <i class="ri-add-line"></i>Add Units
        </button>
      </div>

      <!-- Table Component -->
      <div class="table-area" v-if="allDepot.total">
        <Table
          style="border-radius: 20px"
          :addButtonVisibility="false"
          :tableCheckBoxVisibility="true"
          :export="true"
          :filter="true"
          :filterData="filterAllManufacturers"
          :refresh="true"
          :tableConfig="selectedTableConfig"
          :tableData="selectedTableData"
          :tableQuery="listQuery"
          @view="handleView"
          @pagination="handlePagination()"
          :editButtonVisibility="true"
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
// import EmptyUnits from "@/components/cards/EmptyUnits.vue";
import EmptyManager from "~/components/cards/EmptyManager.vue";
import iconImgUnits from "@/assets/svg/unit_blank.svg";
import StoreHouse from "@/assets/svg/StoreHouse.svg";
import ExchangePoint from "@/assets/svg/ExchangePoint.svg";
import UnitsKpiCard from "@/components/cards/TableInfoKpiCard.vue";
import { useNavStore } from "@/stores/NavStore";
import {
  allDepotConfig,
  allDepot,
  allExchangeConfig,
  allExchange,
} from "@/composables/useUnitTable.js";
import { ref, onBeforeMount, onUnmounted, onMounted } from "vue";
import Table from "@/components/tables/Table.vue";
const navStore = useNavStore();

// Define reactive variables and set their initial values
const selectedTableConfig = ref([]);
const selectedTableData = ref([]);
const router = useRouter();

// Define and set initial KPI (Key Performance Indicator) data
const depots = reactive({
  allDepot: {
    value: "+500",
    percentage: "11.2%",
  },
  allExchangePoint: {
    value: "+30",
    percentage: "1.2%",
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
  if (apiName === "allDepot") {
    tableName.value = "All Depot";
    selectedTableConfig.value = allDepotConfig;
    selectedTableData.value = allDepot;
  } else if (apiName === "allExchangePoint") {
    tableName.value = "All Exchange Point";
    selectedTableData.value = allExchange;
    selectedTableConfig.value = allExchangeConfig;
  }
};

const handleCreate = () => {
  router.push("/units/add-units/depot");
};

// handleView

function handleView(data) {
  console.log(data);
  router.push(`units/${data.id}`);
}

function handleDelete(data) {
  console.log(data);
}

// // pagination
// function handlePagination(data) {
//   getList();
// }

// Perform initial actions before mounting the component
onBeforeMount(async () => {
  await fetchApiData("allDepot");
});

onMounted(() => {
  navStore.setBreadCrumbs("Units");
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