<template>
  <section>
    <div v-if="!allDistributors.total">
      <EmptyDistributor
        heading="No distributor added yet"
        description="You haven't added any distributor. Start by adding first distributor"
        button="+ Add distributor"
        :icon="emptySection"
        @doSomething="handleCreate"
      />
    </div>

    <div class="container-area">
      <h4 class="page_heading mb-3">Distributor</h4>

      <el-row class="kpi_card_wrap">
        <el-col class="cards" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard
            @click="fetchApiData('allDistributor')"
            :class="[selectedApi === 'allDistributor' ? 'active-card' : '']"
            title="All distributor"
            :percentage="distributorKpi.allDistributors.percentage"
            :value="distributorKpi.allDistributors.value"
            :icon="Distributor"
          />
        </el-col>

        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard
            @click="fetchApiData('pendingDistributor')"
            :class="[selectedApi === 'pendingDistributor' ? 'active-card' : '']"
            title="Pending distributors"
            :percentage="distributorKpi.pendingDistributor.percentage"
            :value="distributorKpi.pendingDistributor.value"
            :icon="PendingDistributor"
          />
        </el-col>

        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard
            @click="fetchApiData('stockReq')"
            :class="[selectedApi === 'stockReq' ? 'active-card' : '']"
            title="Stock request"
            :percentage="distributorKpi.stockReq.percentage"
            :value="distributorKpi.stockReq.value"
            :icon="StockReq"
          />
        </el-col>

        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
          <TableInfoKpiCard
            @click="fetchApiData('complaints')"
            :class="[selectedApi === 'complaints' ? 'active-card' : '']"
            title="Complaints"
            :percentage="distributorKpi.complaints.percentage"
            :value="distributorKpi.complaints.value"
            :icon="ComplaintIcon"
          />
        </el-col>
      </el-row>

      <div class="all_heading">
        <h4 class="page_heading m-0">{{ tableName }}</h4>
        <button type="button" class="btn btn-primary" @click="handleCreate()">
          <i class="ri-add-line"></i>Add Distributor
        </button>
      </div>

      <div class="table-area">
        <Table
          style="border-radius: 20px"
          :addButtonVisibility="false"
          :more-actions-visibility="moreOptionVisible"
          :export="true"
          :filter="true"
          :filterData="filterAllDistributor"
          :refresh="true"
          :tableConfig="selectedTableConfig"
          :tableData="selectedTableData"
          :tableQuery="listQuery"
          :role-and-permission-visibility="false"
          :reset-password-visibility="false"
          :editButtonVisibility="tableEditButtonVisibility"
          :heading-row-reverse="true"
          :viewStartPhyicalVarificationVisibility="true"
          :viewVerificationFormVisibility="true"
          :more-option-data="moreOptionData"
          @optionClick="handleOptionClick"
          @pagination="handlePagination()" 
          @edit="handleEdit($event)"
          @delete="handleDelete($event)"
          @view="handleView"
          @startPhyicalVarification="startPhyicalVarification($event)"
          @viewVerificationForm="viewVerificationForm($event)"
        />
      </div>

      <DistributorEditForm
        :visible="customerEdit"
        :distributor_name="false"
        @handleUpdateCustomerDetails="handleEditedDistributorUpdate"
        @handleCloseCustomerEditForm="handleEditDistributorClose"
      />
    </div>
  </section>
</template>

<script setup>

import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import {
  allDistributorsConfig,
  allDistributors,
  distributorComplaintsConfig,
  filterAllDistributor,
  distributorComplaints,
  pendingDistributor,
  stockReq,
} from "@/composables/useDistributorTable.js";

import Table from "@/components/tables/Table.vue";
import EmptyDistributor from "~/components/cards/EmptyManager.vue";
import DistributorEditForm from "@/components/Dialog/UserEditForm.vue";
import TableInfoKpiCard from "@/components/cards/TableInfoKpiCard.vue";

import { fetchList } from "~/api/distributor/distributor"


import emptySection from "@/assets/svg/empty-section.svg"; //Icon
import Distributor from "@/assets/svg/Distributor.svg"; //Icon
import PendingDistributor from "@/assets/svg/PendingDistributor.svg"; //Icon
import StockReq from "@/assets/svg/StockReq.svg"; //Icon
import ComplaintIcon from "@/assets/svg/complaint.svg"; //Icon

import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const selectedTableConfig = ref([]);
const selectedTableData = ref([]);
const tableEditButtonVisibility = ref(true);
const customerEdit = ref(false);
const distributorEdit = ref(false);
const router = useRouter();

const moreOptionData = ref([]);
const moreOptionVisible = ref(true);
// ["Start physical verification", "verification form"]

// KPI data
const distributorKpi = reactive({
  allDistributors: {
    value: "+500",
    percentage: "11.2%",
  },
  pendingDistributor: {
    value: "+105",
    percentage: "11.2%",
  },
  stockReq: {
    value: "+30",
    percentage: "1.2%",
  },
  complaints: {
    value: "+3,462",
    percentage: "11.2%",
  },
});

// Define variables for table name and selected API
const tableName = ref("");
const selectedApi = ref("allDistributor");
let listQuery = {
  search: "",
  sort_in: "desc",
  sort_by: "created_at",
  is_deleted: false,
  page: 1,
  size: "10",
};


let tableConfigAllDistributors = reactive([
  {
      label: "Company Name",
      width: "170",
      sortable: true,
      prop: "company_name",
      popover:true
    },
    {
      label: "Company Email",
      width: "170",
      sortable: true,
      prop: "email",
    },
    {
      label: "Company Owner",
      width: "180",
      sortable: true,
      prop: "company_owner_name",
    },
    {
      label: "Company Phone Number",
      width: "200",
      sortable: true,
      prop: "phone",
    },
    {
      label: "Status",
      width: "150",
      prop: "status",
    },
  ])
  

// Handle More Option Click
const handleOptionClick = (data, item) => {
  console.log(data, item);
};

// Handle pagination event
function handlePagination() {
  fetchApiData("allDistributor");
}


// Fetch data for the selected API
const fetchApiData = async (apiName) => {
  selectedApi.value = apiName;
  if (apiName === "allDistributor") {
    tableName.value = "All distributors";
    selectedTableConfig.value = tableConfigAllDistributors;
    tableEditButtonVisibility.value = true;
    moreOptionVisible.value = true;
    moreOptionData.value = ["Start physical verification", "verification form"];
    fetchList(listQuery).then((res) => {
      // console.log("actualResponse",res.data);

        let responseData = res.data.items.map((item)=> {
          return {
            company_name: [
              {
                content: item.company_name,
                url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg",
                status: item.status,
              }
            ],
            email: item.email,
            company_owner_name: item.company_owner_name,
            phone: item.phone,
            status: item.status,
            id: item.id
      
          }
        })

        let tempRespItems = responseData;
        let tempPage = res.data.page;
        let tempPages = res.data.pages;
        let tempSize = res.data.size;
        let tempTotal = res.data.total;

        let customeResponse = {
          "items" : tempRespItems,
          "total": tempTotal,
          "page": tempPage,
          "size": tempSize,
          "pages": tempPages
        }
       
  

      selectedTableData.value = customeResponse;
      // selectedTableData.value = res.data;
      // console.log("customeResponse", customeResponse);
    })
  } else if (apiName === "pendingDistributor") {
    tableName.value = "Pending distributors";
    selectedTableConfig.value = allDistributorsConfig;
    selectedTableData.value = pendingDistributor; 
    tableEditButtonVisibility.value = true;
    moreOptionVisible.value = true;
    moreOptionData.value = ["Start physical verification", "verification form"];
  } else if (apiName === "stockReq") {
    tableName.value = "Stock request";
    tableEditButtonVisibility.value = true;
    selectedTableData.value = stockReq;
    selectedTableConfig.value = allDistributorsConfig;
    moreOptionData.value = [];
    moreOptionVisible.value = false;
  } else if (apiName === "complaints") {
    tableName.value = "Complaints";
    tableEditButtonVisibility.value = false;
    selectedTableData.value = distributorComplaints;
    selectedTableConfig.value = distributorComplaintsConfig;
    moreOptionData.value = [];
    moreOptionVisible.value = false;
  }


  selectedApi.value = apiName;
};

function handleView(data) {
    router.push(`distributor/distributor-details-${data.id}`);
    // router.push(`distributor/distributor-details-ec5daef5-0957-4be7-ab09-954f4f0e34be`);
  
    
  }


// Handle edit event
function handleEdit(data) {
  console.log(data);
  customerEdit.value = true;
  // let r = "edit";
  // router.push(`customers/${r}-${data.id}`);
}

// Handle closing the distributor edit form
function handleEditDistributorClose(data) {
  if (data === "cancel") {
    console.log("delivery user edit form canceled");
  }
  customerEdit.value = false;
}

// Handle distributor details update
function handleEditedDistributorUpdate(data) {
  console.log("handleEditedDistributorUpdate");
  flashNotification("success", "Distributor details updated.");
  customerEdit.value = false;
}


// Handle delete event
function handleDelete(data) {
  useToast("warning", "You are not allowed to change data of default user");
}
// Fetch a list of data
function getList() {
  // API CALL MADE
}

function startPhyicalVarification(data) {
  console.log(data)
} 

function viewVerificationForm(data) {
  console.log(data)
}

// Handle the creation of a new distributor
function handleCreate() {
  let r = "add-distributor";
  router.push(`distributor/${r}`);
}

// Perform initial actions before mounting the component
onBeforeMount(async () => {
  await fetchApiData("allDistributor");
});

onMounted(() => {
  navStore.setBreadCrumbs("Distributor");
});

// definePageMeta({
//   layout: "default",
// });
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
