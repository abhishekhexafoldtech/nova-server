<template>
  <section>
    <!-- when no data -->
    <div v-if="emptyManager">
      <EmptyManager
        :icon="CustomerEmptyImage"
        heading="No customer added yet"
        description="List of customers not added yet."
      />
    </div>

    <div class="container-area" v-if="!emptyManager">
      <CustomerEditForm
        :visible="customerEdit"
        @handleUpdateCustomerDetails="handleEditedUserUpdate"
        @handleCloseCustomerEditForm="handleEditUserClose"
      />

      <h4 class="page_heading mb-3">Customer</h4>
      <el-row class="kpi_card_wrap cus_new_kpi">
        <el-col class="cards" :xs="24" :sm="10" :md="7" :lg="7">
          <TableInfoKpiCard
            @click="fetchApiData('customers')"
            :class="[selectedApi === 'customers' ? 'active-card' : '']"
            title="All customers"
            :percentage="customersKpi.customers.percentage"
            :value="customersKpi.customers.value"
            :icon="CustomerIcon"
          />
        </el-col>

        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="7" :lg="7">
          <TableInfoKpiCard
            @click="fetchApiData('orders')"
            :class="[selectedApi === 'orders' ? 'active-card' : '']"
            title="Latest order"
            :percentage="customersKpi.latestOrders.percentage"
            :value="customersKpi.latestOrders.value"
            :icon="OrderIcon"
          />
        </el-col>

        <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="7" :lg="7">
          <TableInfoKpiCard
            @click="fetchApiData('complaints')"
            :class="[selectedApi === 'complaints' ? 'active-card' : '']"
            title="Complaints"
            :percentage="customersKpi.complaints.percentage"
            :value="customersKpi.complaints.value"
            :icon="ComplaintIcon"
          />
        </el-col>
      </el-row>

      <h4 class="page_heading mt-5 mb-3">{{ tableName }}</h4>
      <div class="table-area">
        <Table
          style="border-radius: 20px;"
          :table-loading-status="customerTableDataFetched"
          :addButtonVisibility="false"
          :tableCheckBoxVisibility="true"
          :export="true"
          :filter="true"
          :filterData="filterAllCusomers"
          :refresh="true"
          :tableConfig="customerTableConfig"
          :tableData="customerTableData"
          :tableQuery="listQuery"
          @view="handleView"
          @pagination="handlePagination()"
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
import { filterAllCusomers } from "@/composables/useCustomerTable.js";
import { ref, onBeforeMount, onUnmounted } from "vue";
import { tableConfig } from "@/composables/useCustomerTable.js";
import CustomerEditForm from "@/components/Dialog/UserEditForm.vue";
import EmptyManager from "@/components/cards/EmptyManager.vue";
import CustomerEmptyImage from "@/assets/svg/customers_empty.svg";
import Table from "@/components/tables/Table.vue";
import CustomerIcon from "@/assets/svg/customer_icon.svg";
import OrderIcon from "@/assets/svg/customer_orders_icon.svg";
import ComplaintIcon from "@/assets/svg/complaint.svg";
import TableInfoKpiCard from "@/components/cards/TableInfoKpiCard.vue";
import { useNavStore } from "@/stores/NavStore";
import { getCustomerList } from "@/api/customer/customer";
const navStore = useNavStore();

const customerTableConfig = ref([]);
const customerTableData = ref({});
const customerTableDataFetched = ref(true);
const customerEdit = ref(false);
const emptyManager = ref(false);
const router = useRouter();
const customersKpi = reactive({
  customers: {
    value: `${customerTableData.value?.items?.length | 0}`,
    percentage: "11.2%",
  },
  latestOrders: {
    value: "+100",
    percentage: "11.2%",
  },
  complaints: {
    value: "+3,462",
    percentage: "11.2%",
  },
});
const tableData = reactive(
  {
    all_customers:[],
    orders_data:{
      items:[]
    },
    complaints:{
      items:[]
    }
  }
)
const tableName = ref("Customers");
const selectedApi = ref(null);
let listQuery = reactive({
  page: 5,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});

// edit user
function handleEditedUserUpdate(data) {
  console.log(data);
  customerEdit.value = false;
  flashNotification("success", "customer details updated");
}

// edit user close
function handleEditUserClose(data) {
  if (data) {
    customerEdit.value = false;
    console.log("Cancel");
  } else {
    console.log("close");
    customerEdit.value = false;
  }
}
//fetch the table data
const fetchApiData = async (apiName) => {
  selectedApi.value = apiName;
  emptyManager.value = false;
  if (apiName === "customers") {
    tableName.value = "All Customers";
    // const data = JSON.parse(sessionStorage.getItem("customers_data"));
    customerTableConfig.value = tableConfig.allCustomers;
    customerTableData.value = {
      items: tableData.all_customers,
    };
    customersKpi.customers.value = customerTableData.value.items.length;
  } else if (apiName === "orders") {
    tableName.value = "Latest order";
    // const data = JSON.parse(sessionStorage.getItem("customers_orders_data"));
    customerTableConfig.value = tableConfig.latestOrders;
    customerTableData.value = data || {};
  } else if (apiName === "complaints") {
    tableName.value = "Complaints";
    // const data = JSON.parse(sessionStorage.getItem("customer_complaints"));
    customerTableData.value = data || {};
    customerTableConfig.value = tableConfig.complaints;
  }

  // if (apiDataCache.value[apiName]) {
  //   return; // Data is cached; no need to make the API request again
  // };
  // Set the selected API
  selectedApi.value = apiName;
};

// pagination
function handlePagination(data) {
  getCustomers();
}

//handle view
function handleView(data) {
  let r = "customer";
  router.push(`customers/${r}-${data.id}`);
}

// edit
function handleEdit(data) {
  console.log(data);
  customerEdit.value = true;
  // let r = "edit";
  // router.push(`customers/${r}-${data.id}`);
}

// delete
function handleDelete(data) {
  useToast("warning", "You are not allowed to change data of default user");
  console.log(data);
}

// get list
async function getCustomers(page, perpage) {
  // API CALL MADE
  customerTableDataFetched.value = true;
  console.log("jgj");
  try {
    const data = await getCustomerList("get", page, perpage);
    const fetchedData = data.data?.items.map((e) => {
      let order_items = e?.order_details?.name || "-";
      let created_at = e.created_at?.split("T")[0].split("-").join("/");
      let is_active = e.is_active ? "Active" : "InActive";
      let customer_name = `${e.first_name || "-"} ${e.last_name || ""}`;
      let distributor_name = `${e.company_owner_details?.first_name || "-"} ${
        e.company_owner_details?.last_name || ""
      }`;
      return {
        ...e,
        order_items,
        created_at,
        is_active,
        customer_name,
        distributor_name,
      };
    });
    if (!fetchedData.length) {
      emptyManager.value = true;
      return;
    }
    tableData.all_customers = fetchedData;
    // sessionStorage.setItem("customers_data", JSON.stringify(fetchedData));
    await fetchApiData("customers");
    customerTableDataFetched.value = false;
  } catch (err) {
    console.log(err);
    emptyManager.value = true;
    flashNotification("warning", "something went wrong please try again later");
  }
}

// filter the items (if there is no need, remove this function)
function filterItems(data) {
  // ["3kg|steel","6kg|steel","6kg|steel"] input
  // 3kg|steel,6kg|steel(2) output
  const transformedString = data.reduce((result, element) => {
    const existingElement = result.find((item) => item.value === element);
    if (existingElement) {
      existingElement.count++;
    } else {
      result.push({ value: element, count: 1 });
    }
    return result;
  }, []);
  const finalString = transformedString
    .map(({ value, count }) => (count > 1 ? `${value}(${count})` : value))
    .join(",");

  return finalString;
}

function handleMultipleSelection(data) {
  console.log(data);
}

onBeforeMount(async () => {
  await getCustomers(1);
});

onUnmounted(() => {
  sessionStorage.clear("customers_data");
  sessionStorage.clear("customers_orders_data");
});

onMounted(async () => {
  navStore.setBreadCrumbs("Customer");
});

definePageMeta({
  layout: "default",
});
</script>

