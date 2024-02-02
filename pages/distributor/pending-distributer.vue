<template>
  <div class="container-area">
    <h4 class="page_heading mb-4">Pending distributors</h4>
    <div class="table-area">
      <Table
        style="border-radius: 20px"
        :roleAndPermissionVisibility="false"
        :resetPasswordVisibility="false"
        approveRequestsVisibility="true"
        declineRequestsVisibility="true"
        viewOnboardingFormVisibility="true"
        :tableConfig="pendingDistributorTableConfig"
        :tableData="pendingDistributorTableData"
        :tableQuery="listQuery"
        :moreActionsVisibility="true"
        :tableCheckBoxVisibility="true"
        :table-search-visibility="false"
        @pagination="handlePagination()"
        @edit="handleEditDistributor($event)"
        @delete="handleDelete($event)"
        @multipleSelection="handleMultipleSelection($event)"
        @search="handleAdminSearch($event)"
        @approveRequests="approveRequests($event)"
        @declineRequests="declineRequests($event)"
        @viewOnboardingForm="viewOnboardingForm($event)"
      />
    </div>
  </div>
</template>

<script setup>
import Table from "@/components/tables/Table.vue";
import useToast from "@/composables/useToast";
import { useRouter } from "vue-router";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
const router = useRouter();

//   pendingDistributorTableData
let pendingDistributorTableData = ref({
  items: [
    {
      company_name: [
        {
          content: "Longrich Ghana ltd",
          url: "https://c8.alamy.com/comp/2AH6RFF/real-estate-company-logo-design-template-blue-house-and-building-concept-construction-architecture-element-apartment-condo-rouded-window-shape-2AH6RFF.jpg",
        },
      ],
      company_email: "LongrichGhana@gmail.com",
      company_owner: "Derrick Nwafor",
      company_phone_number: "0244400555",
      status: "Business onboarding",
    },
    {
      company_name: [
        {
          content: "Longrich Ghana ltd",
          url: "https://c8.alamy.com/comp/2AH6RFF/real-estate-company-logo-design-template-blue-house-and-building-concept-construction-architecture-element-apartment-condo-rouded-window-shape-2AH6RFF.jpg",
        },
      ],
      company_email: "LongrichGhana@gmail.com",
      company_owner: "Derrick Nwafor",
      company_phone_number: "0244400555",
      status: "Depot onboarding",
    },
    {
      company_name: [
        {
          content: "Longrich Ghana ltd",
          url: "https://c8.alamy.com/comp/2AH6RFF/real-estate-company-logo-design-template-blue-house-and-building-concept-construction-architecture-element-apartment-condo-rouded-window-shape-2AH6RFF.jpg",
        },
      ],
      company_email: "LongrichGhana@gmail.com",
      company_owner: "Derrick Nwafor",
      company_phone_number: "0244400555",
      status: "Business onboarding",
    },
    {
      company_name: [
        {
          content: "Longrich Ghana ltd",
          url: "https://c8.alamy.com/comp/2AH6RFF/real-estate-company-logo-design-template-blue-house-and-building-concept-construction-architecture-element-apartment-condo-rouded-window-shape-2AH6RFF.jpg",
        },
      ],
      company_email: "LongrichGhana@gmail.com",
      company_owner: "Derrick Nwafor",
      company_phone_number: "0244400555",
      status: "Depot onboarding",
    },
  ],
});

//   pendingDistributorTableConfig
let pendingDistributorTableConfig = ref([
  {
    label: "Company Name",
    prop: "company_name",
    width: "",
    sortable: true,
    className: "redFont",
  },
  {
    label: "Company Email",
    prop: "company_email",
    width: "",
    sortable: true,
    className: "redFont",
  },
  {
    label: "Company Owner",
    prop: "company_owner",
    width: "",
    sortable: true,
    className: "redFont",
  },
  {
    label: "Company Phone Number",
    prop: "company_phone_number",
    width: "",
    sortable: true,
    className: "redFont",
  },
  {
    label: "Status",
    prop: "status",
    width: "",
    sortable: true,
    className: "redFont",
  },
]);

//   listQuery
let listQuery = ref({
  page: 1,
  limit: 10,
  search: "false",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});

// declineRequests
function declineRequests(data) {
  console.log("Decline requests");
}

// approveRequests
function approveRequests(data) {
  console.log("approve request");
}

function viewOnboardingForm(data) {
  console.log("viewOnboardingForm");
}

// admin search
function handleAdminSearch(data) {
  const filter = pendingDistributorTableData.filter((e) => {
    if (
      e.distributor_name.toLowerCase().includes(data.value.toLowerCase()) ||
      e.phone_number.toLowerCase().includes(data.value.toLowerCase()) ||
      e.email.toLowerCase().includes(data.value.toLowerCase()) ||
      e.status.toLowerCase().includes(data.value.toLowerCase())
    ) {
      return e;
    }
  });
  if (filter.length === 0) {
    pendingDistributorTableData.value = pendingDistributorTableData;
  } else {
    pendingDistributorTableData.value = filter;
  }
}

// pagination
function handlePagination(data) {
  getList();
}

// Distributor
function handleCreateDistributor() {
  let r = "";
  router.push(`onboarding/${r}`);
}

// handleEditDistributor
function handleEditDistributor(data) {
  handleCreateDistributor();
}

// delete
function handleDelete(data) {
  useToast("warning", "You are not allowed to change data of default user");
  console.log(data);
}

// get list
function getList() {
  // API CALL MADE
}

function handleMultipleSelection(data) {
  console.log(data);
}

onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Pending distributors");
});

definePageMeta({
  layout: "default",
});
</script>
