<template>
    <section>
      <!-- when no data -->
      <div v-if="!customerTableData.total">
        <EmptyTransaction
          :icon="iconImgTransaction"
          heading="No Transaction added yet"
          description="List of transaction not added yet."
        />
      </div>
  
      <div class="container-area" v-if="customerTableData.total">
        <h4 class="page_heading mb-3">Transactions</h4>
        <el-row class="kpi_card_wrap">
          <el-col class="cards" :xs="24" :sm="10" :md="5" :lg="5">
            <TransactionKpiCard
              @click="fetchApiData('customers')"
              :class="[selectedApi === 'customers' ? 'active-card' : '']"
              title="customers transactions"
              :percentage="customersKpi.customers.percentage"
              :value="customersKpi.customers.value"
              :icon="transactionIcon"
            />
          </el-col>
          <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="5" :lg="5">
            <TransactionKpiCard
              @click="fetchApiData('orders')"
              :class="[selectedApi === 'orders' ? 'active-card' : '']"
              title="Distributor transactions"
              :percentage="customersKpi.latestOrders.percentage"
              :value="customersKpi.latestOrders.value"
              :icon="transactionIcon"
            />
          </el-col>
        </el-row>
  
        <h4 class="page_heading mt-5 mb-3">{{ tableName }}</h4>

        <div class="table-area">
          <Table
            style="border-radius: 20px"
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
            :editButtonVisibility="false"
            :deleteButtonVisibility="false"
            @pagination="handlePagination()"
            @multipleSelection="handleMultipleSelection($event)"
            :heading-row-reverse="true"
            download-link-content="View receipt"
            :download-visibility="true"
            @handleDownload="handleDownload"
            @handleViewReceipt="handleViewReceipt"
          />
        </div>

        <!-- Receipt Dialog  -->
        <ViewReceipt
          :dialogVisible="viewReceiptVisibility"
          @handleSendReceiptEmail="handleSendReceiptEmail"
          @handleReceiptClose="handleReceiptClose"
        />

      </div>
    </section>
  </template>
  <script setup>
  import { ref, onBeforeMount, onUnmounted } from "vue";
  import { useRouter } from "vue-router";
  import { filterAllCusomers } from "@/composables/useTransactionTable.js";
  import { useNavStore } from "@/stores/NavStore";
  const navStore = useNavStore();
  import { tableConfig, getCustomersTableData } from "@/composables/useTransactionTable.js";

  import TransactionKpiCard from "@/components/cards/TableInfoKpiCard.vue";
  
  import EmptyTransaction from "@/components/cards/EmptyTransaction.vue";
  import Table from "@/components/tables/Table.vue";

  
  
  
  import iconImgTransaction from '@/assets/svg/transaction_dashboard_icon.svg'
  import CustomerIcon from "@/assets/svg/customer.svg";
  import OrderIcon from "@/assets/svg/order.svg";
  import transactionIcon from "@/assets/svg/transaction.svg";

  import ViewReceipt from "@/components/transaction/ViewReceipt.vue";

  
  const customerTableConfig = ref([]);
  const customerTableData = ref([]);
  const viewReceiptVisibility = ref(false);

  const router = useRouter();
  const customersKpi = reactive({
    customers: {
      value: "+500",
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
  const tableName = ref("Customers");
  const selectedApi = ref(null);
  let listQuery = reactive({
    page: 1,
    limit: 10,
    search: "",
    searchJoin: "or",
    orderBy: "created_at",
    sortedBy: "desc",
  });
  

  

  //fetch the table data
  const fetchApiData = async (apiName) => {
    selectedApi.value = apiName;
    await getCustomersTableData(apiName);
    
    if (apiName === "customers") {
      tableName.value = "Customer transactions";
      const data = JSON.parse(sessionStorage.getItem("customers_data"));
      customerTableConfig.value = tableConfig.customerTransaction;
      customerTableData.value = data;
    } else if (apiName === "orders") {
      tableName.value = "Distributor transactions";
      const data = JSON.parse(sessionStorage.getItem("distributor_data"));
      customerTableConfig.value = tableConfig.distributorTransaction;
      customerTableData.value = data;
    }

    // Set the selected API
    selectedApi.value = apiName;
  };
  
  // pagination
  function handlePagination(data) {
    getList();
  }
  
  //handle view
  function handleView(data) {
    let r = "customer";
    router.push(`customers/${r}-${data.id}`);
  }
  


  // get list
  function getList() {
    // API CALL MADE
  }
  
  function handleMultipleSelection(data) {
    console.log(data);
  }

function handleDownload(index, data) {
  console.log(index, data);
}

function handleViewReceipt(data) {
  console.log(data);
  viewReceiptVisibility.value = true;
}

function handleSendReceiptEmail() {
  viewReceiptVisibility.value = false;
  flashNotification("success", "Email sented.");
}

function handleReceiptClose() {
  viewReceiptVisibility.value = false;
}


  
  onBeforeMount(async () => {
    await fetchApiData("customers");
  });
  
  onUnmounted(() => {
    sessionStorage.clear("customers_data");
    sessionStorage.clear("customers_orders_data");
  });

  onMounted(() => {
    navStore.setBreadCrumbs('Transactions')
  })
  
  definePageMeta({
    layout: "default",
  });
  </script>
  
