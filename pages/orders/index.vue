<template>
  <section>
    <!-- Display an empty state if there are no orders -->
    <div v-if="!ordersTableData">
      <EmptyManager
        :icon="CustomerEmptyImage"
        heading="No customer added yet"
        description="List of customers not added yet."
      />
    </div>

    <!-- Display the orders table if data is present -->
    <div class="container-area" v-if="ordersTableData">
      <h4 class="page_heading mb-4">Orders</h4>
      <div class="table-area">
        <Table
          style="border-radius: 20px"
          :addButtonVisibility="false"
          :tableLoadingStatus="tableLoding"
          :actionVisibility="false"
          :tableCheckBoxVisibility="true"
          :export="true"
          :filter="true"
          :filterData="filterAllOrders"
          :refresh="true"
          :tableConfig="tableConfig"
          :tableData="tableData"
          :tableQuery="listQuery"
          @view="handleView"
          @search="handleSearch($event)" 
          @pagination="handlePagination()"
          @multipleSelection="handleMultipleSelection($event)"
          :heading-row-reverse="true"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import { useNavStore } from "@/stores/NavStore";
import { getList as getOrderList } from "@/api/orders/all-orders.js";
import {useRouter} from 'vue-router'
import { filterAllOrders } from "@/composables/useOrderTable.js";
import { ref,onMounted } from "vue";
import Table from "@/components/tables/Table.vue";

// Initializing reactive variables
const tableLoding = ref(false); // Loading indicator for the table
const ordersTableData = ref([]); // Data for rendering the orders table
const router = useRouter();
const navStore = useNavStore();
let tableData = ref()

// Configuration for the orders table columns
const tableConfig = [
  {
    label: "Order ID",
    width: "200",
    sortable: true,
    prop: "order_id",
    popover: true,
  },
  {
    label: "Product Order",
    width: "160",
    sortable: true,
    prop: "product_order",
  },
  {
    label: "Order Date",
    width: "150",
    sortable: true,
    prop: "order_date",
  },
  {
    label: "Order Total",
    width: "120",
    sortable: true,
    prop: "order_total",
  },
  {
    label: "Customer Name",
    width: "220",
    sortable: true,
    prop: "customer_name",
  },
  {
    label: "Zone",
    width: "100",
    sortable: true,
    prop: "zone",
  },
  {
      label: "Delivery Location",
      width: "190",
      sortable: true,
      prop: "post_code",
  },
  {
    label: "Delivery status",
    width: "170",
    sortable: true,
    prop: "delivery_status",
  },
  {
    label: "Payment Type",
    width: "150",
    sortable: true,
    prop: "payment_type",
  },
  {
    label: "Payment Status",
    width: "170",
    sortable: true,
    prop: "payment_status",
  },
];

// Query parameters for pagination and filtering
let listQuery = {
  search: "",
  sort_in: "desc",
  sort_by: "created_at",
  is_deleted: false,
  page: 1,
  size: "10",
};

// Handling Search Here
function handleSearch(searchKey) {
  listQuery.search = ref(searchKey.value);
  getList();
}
// Function to handle pagination changes
function handlePagination(data) {
  getList();
}

// Function to handle viewing details of a specific order
function handleView(data) {
  let r = "order-details";
  router.order_details = data;
  router.push(`/orders/${data.order_id}`);
}

// Function to fetch the list of orders from the API
function getList() {
  // Set the loading state of the table to true before fetching data
  tableLoding.value = true;

  // Fetch the order list using the specified query
  getOrderList(listQuery).then((response) => {
    // Processing and formatting the API response data
    ordersTableData.value.items = response.data.data.map((item) => {
    // Extract only the date part from created_date
      const dateComponents = item.created_date.split("T");
      const orderDate = dateComponents[0];
      return {
        order_id: item.order_id,
        product_order: item.product_order
          ? item.product_order.map((product) => product.name).join(", ")
          : "",
    // Use the extracted date for better readability
        order_date: orderDate,
        order_total: item.order_total,
        customer_name: item.customer_details
          ? `${item.customer_details[0].first_name} ${item.customer_details[0].last_name}`
          : "",
        delivery_status: item.delivery_status,
      
    // If the payment_status value is not null, use it; otherwise, use "null"
        payment_status: item.payment_status !== null ? item.payment_status : "null",

    // If the payment_type value is not null, use it; otherwise, use "null"
        payment_type: item.pyment_type !== null ? item.pyment_type : "null",

    // If the zone value is not null, use it; otherwise, use "null"
        zone: item.zone ? item.zone[0].zone_name !== null ? item.zone[0].zone_name : "null" : "null",
        // If the post_code value is not null, use it; otherwise, use "null"
        post_code: item.post_code !== null ? item.post_code : "null",
      };
    });
   

    let tempRespItems = ordersTableData.value.items;
    let tempPage = response.data.page;
    let tempPages = response.data.pages;
    let tempSize = response.data.size;
    let tempTotal = response.data.total;


    let customeResponse = {
      "items" : tempRespItems,
      "total": tempTotal,
      "page": tempPage,
      "size": tempSize,
      "pages": tempPages
    }
    tableData.value = customeResponse
    console.log('tableData',tableData)

    // Set the loading state of the table to false once data is processed
    tableLoding.value = false;
  });
}

// Function to handle multiple row selection in the table
function handleMultipleSelection(data) {
  console.log(data);
}

// Hook that runs when the component is mounted
onMounted(() => {
  navStore.setBreadCrumbs("Orders");
  getList();
});

// definePageMeta({
//   layout: "default",
// });
</script>
