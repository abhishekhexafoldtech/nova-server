<template>
  <!-- Section for no KPIs or empty KPIs array -->
  <section v-if="!kpis || kpis.length === 0">
    <div>
      <!-- Display empty state with a button to add a new delivery type -->
      <EmptyManager :icon="EmptyManagerImg" heading="No Delivery Type added"
        description="You haven’t added any Delivery type. Start by adding first Delivery type."
        button="+Add delivery type" @doSomething="showAddNewDelivery" />
      <div class="add_pr_category">
        <!-- Dialog for adding a new delivery type -->
      </div>
    </div>
  </section>

  <!-- Section for displaying KPI cards when KPIs are available -->
  <section v-else>
    <div class="container-area">
      <!-- Heading for the KPI section -->
      <div class="header_with_btn mb-3">
        <h4 class="page_heading m-0">Deliveries</h4>
        <button class="pr_setting_btn" @click="showAddNewDelivery">
          <i class="ri-settings-5-fill"></i>
        </button>
      </div>

      <el-row class="kpi_card_wrap">
        <!-- Loop through KPIs and render KPI cards -->
        <el-col class="cards" :xs="24" :sm="10" :md="5" :lg="5" v-for="(kpi, index) in kpis" :key="index">
          <DeliveriesKpiCard @click="fetchApiData(kpi.apiKey)" :class="[selectedApi === kpi.apiKey ? 'active-card' : '']"
            :title="kpi.title" :percentage="kpi.percentage" :value="kpi.value" :icon="deliveryKpiIcon" />
        </el-col>
      </el-row>

      <!-- Table Title and Add Button -->

      <div class="all_heading">
        <h4 class="page_heading m-0 p-0">{{ tableName }}</h4>
        <!-- <button type="button" class="btn btn-primary " @click="handleCreate()">
          <i class="ri-add-line"></i>{{ buttonLabel }}
        </button> -->
      </div>

      <div class="table-area">
        <!-- when no data -->
        <div class="deliveries_empty" v-if="listData.items.length === 0">
          <EmptyManager :icon="EmptyManagerImg" heading="No Delivery details available"
            description="You haven’t any delivery details. Start by adding delivery details."
            button="+Add delivery details" @doSomething="AddDelivery" />
        </div>
        <Table tableHeading="" tableSubHeading="" :addButtonVisibility="false" addButtonText="Add Product"
          :tableConfig="selectedTableConfig" :tableData="selectedTableData" :tableQuery="listQuery"
          :tableCheckBoxVisibility="false" @pagination="handlePagination()" @edit="handleEdit($event)"
          @delete="handleDelete($event)" @view="handleView" @multipleSelection="handleMultipleSelection($event)"
          class="deliveries_table" />
      </div>
    </div>
  </section>
  <div class="add_pr_category">
    <DialogStatus :dialog-visible="addNewDeliveryType.formPopup" dialog-title="Add Delivery Type" leftButtonName="Cancel"
      right-button-name="+ Add" @dialogVisible="handleCloseAddDeliveryDialog"
      @handleLeftButton="handleCloseAddDeliveryDialog" @handleRightButton="handleAddNewDelivery">
      <!-- Form for entering new delivery type -->
      <el-form :model="addNewDeliveryType" ref="newDeliveryForm" label-position="top" :rules="addNewDeliveryTypeRule"
        @submit.prevent="handleAddNewDelivery">
        <div class="fieldrow">
          <!-- Input field for new delivery type -->
          <el-form-item v-if="addNewDeliveryType" label="Deliveries" prop="delivery">
            <el-input class="form_input" v-model="addNewDeliveryType.delivery" placeholder="Enter delivery type" />
          </el-form-item>
        </div>
      </el-form>
    </DialogStatus>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted } from "vue";
import EmptyManager from "@/components/cards/EmptyManager.vue";
import EmptyManagerImg from "@/assets/svg/deliveries_empty_icon.svg";
import deliveryKpiIcon from "@/assets/svg/deliveries1.svg";
import DeliveriesKpiCard from "@/components/cards/TableInfoKpiCard.vue";
import Table from "@/components/tables/ProductTable.vue";
import { useNavStore } from "@/stores/NavStore";
import { nameRule } from "~/rules/all-rules";

// State management and router initialization
const navStore = useNavStore();
const router = useRouter();

// Reactive references for selected data and form validation
const selectedApi = ref();
const selectedTableConfig = ref([]);
const selectedTableData = ref([]);
const newDeliveryForm = ref(null);
const tableName = ref("Express delivery ");
// const tabs = ref([]);

// Table configuration and data structure for delivery details
let tableConfig = reactive([
  {
    label: "DESCRIPTIONS",
    prop: "desc",
    width: "300",
    sortable: "",
  },
  {
    label: "TIME DURATION",
    prop: "timeDuration",
    width: "",
    sortable: "",
  },
  {
    label: "TIME SLOTS",
    list: [
      {
        label: "Morning",
        prop: "morning",
      },
      {
        label: "Afternoon",
        prop: "afternoon",
      },
      {
        label: "Evening",
        prop: "evening",
      },
    ],
  },
  {
    label: "DELIVERY COST",
    prop: "deliveryCost",
    width: "",
    sortable: "",
  },
]);

// Reactive object for delivery details
let listData = reactive({
  items: [
    {
      desc: `Experience lightning-fast express 
      delivery in just 2 hours! Swift and reliable 
      service to ensure your order reaches its 
      destination promptly`,
      timeDuration: "48 Hours",
      list: [
        {
          morning: "08:00am - 11:00am",
          afternoon: "12:00pm - 03:00pm",
          evening: "04:00pm - 06:00pm",
        },
      ],
      deliveryCost: "GHs 10",
    },
    {
      desc: `Experience lightning-fast express 
      delivery in just 2 hours! Swift and reliable 
      service to ensure your order reaches its 
      destination promptly`,
      timeDuration: "48 Hours",
      list: [
        {
          morning: "08:00am - 11:00am",
          afternoon: "12:00pm - 03:00pm",
          evening: "05:00pm - 06:00pm",
        },
      ],
      deliveryCost: "GHs 10",
    },
  ],
  page: 1,
  pages: 1,
  size: 10,
  total: 3,
});

// Query parameters for table pagination and search
let listQuery = {
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
};

// Reactive references for KPIs, adding new delivery type, and form rules
const kpis = ref([
  {
    apiKey: "express",
    title: "Express delivery",
    percentage: "11.2%",
    value: "+500",
  },
  {
    apiKey: "regular",
    title: "Regular delivery",
    percentage: "11.2%",
    value: "+100",
  },
  // // Add more KPIs as needed
]);

const addNewDeliveryType = reactive({
  delivery: "",
  formPopup: false,
});

// rules for popup form
const addNewDeliveryTypeRule = {
  delivery: nameRule("a delivery type"),
};

// Function to handle adding a new delivery type
function handleAddNewDelivery() {
  if (newDeliveryForm.value.validate) {
    newDeliveryForm.value.validate((valid) => {
      if (valid) {
        console.log("InputValue:", addNewDeliveryType.delivery);
        addNewDeliveryType.formPopup = false;
      }
    });
  }
}

// Function to navigate to the "Add Delivery" page
function AddDelivery() {
  router.push(`deliveries/add-delivery`);
}

// Fetch data for the selected API
const fetchApiData = (apiName) => {
  selectedApi.value = apiName;

  // Find the selected KPI based on the apiName in the kpis array
  const selectedKPI = kpis.value.find((kpi) => kpi.apiKey === apiName);

  // Update the component based on the selected KPI
  if (selectedKPI) {
    tableName.value = selectedKPI.title;
    // Assuming tableConfig and tableData are properties in your kpi object
    selectedTableConfig.value = tableConfig;
    selectedTableData.value = listData;
  } else {
    console.error("Selected KPI not found:", apiName);
    // You might want to handle this case, such as showing a default or handling errors
  }
};

// ...

// Perform initial actions before mounting the component
onBeforeMount(() => {
  fetchApiData("express"); // You might want to change the initial API here
});

// adding new delivery popup
function showAddNewDelivery() {
  addNewDeliveryType.formPopup = true;
}
// closing the add new delivery dialog box
function handleCloseAddDeliveryDialog() {
  addNewDeliveryType.formPopup = false;
}

onMounted(() => {
  navStore.setBreadCrumbs("Deliveries");
});

// Perform initial actions before mounting the component
onBeforeMount(async () => {
  await fetchApiData("express");
});

definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.header_with_btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  .pr_setting_btn {
    background-color: transparent;
    border: none;
    color: rgb(0 0 0 / 60%);
    font-size: 20px;
    transition: all 300ms ease-in-out;
    outline: none;
    padding: 0;
    width: 30px;
    height: 30px;

    &:hover {
      color: var(--violet);
    }
  }
}

.kpi_card_wrap {
  gap: 24px;
}

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