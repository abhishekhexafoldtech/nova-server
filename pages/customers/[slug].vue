<template>
  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <img
          :src="customerDetails.header.profile_pic"
          alt="Profile" @error="handleImageError('profile')"/>
        <div class="h_right">
          <div class="h_name">
            <h4>{{customerDetails.personal.name}}</h4>
            <el-switch disabled v-model="customerDetails.personal.is_active" class="ml-2" inline-prompt style="
                --el-switch-on-color: #0a7b37;
                --el-switch-off-color: #ff4949;
              " active-text="Active" inactive-text="In-active" />
          </div>
          <div class="h_info">
            <div>
              <p>Customer</p>
              <p>
                ID:<span>{{ customerDetails.personal.id || "-" }}</span>
              </p>
            </div>
            <div>
              <p>
                Customer entry:<span>{{
                  customerDetails.header.customer_entry
                }}</span>
              </p>
              <p>
                Distributor name:<span>{{
                  customerDetails.header.distributor_name
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Personal details" name="p_detail"></el-tab-pane>
          <el-tab-pane label="Latest order" name="l_orders"></el-tab-pane>
          <el-tab-pane label="All orders" name="all_orders"></el-tab-pane>
          <el-tab-pane label="Cancelled order" name="can_orders"></el-tab-pane>
          <el-tab-pane label="Deposits" name="deposits"></el-tab-pane>
          <el-tab-pane label="Refund balance" name="r_balance"></el-tab-pane>
          <el-tab-pane label="Complaints" name="complaints"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- table heading -->
    <h4 class="page_heading mt-4 mb-3">{{ tableName }}</h4>
    <div>
      <CustomerDetail v-if="activeName === 'p_detail'" :details="customerDetails.personal" />
      <CustomerLatestOrder v-if="activeName === 'l_orders'" :order="customerDetails.latest_order" />
      <CustomerAllOrders v-if="activeName === 'all_orders'" :table="customerDetails.all_orders" />
      <CustomerAllOrders v-if="activeName === 'can_orders'"  :table="customerDetails.canceled_orders"/>
      <CustomerDepositsTable v-if="activeName === 'deposits'" />
      <CustomerRefundBalanceTable v-if="activeName === 'r_balance'" />
      <CustomerComplaintsTable v-if="activeName === 'complaints'" :table="CustomerComplaintsTableData" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { tableConfig,customerCancelledOrderConfig } from "@/composables/useCustomerTable.js";

import CustomerDetail from "@/components/userpanel/CustomerDetail.vue";
import CustomerLatestOrder from "@/components/userpanel/LatestOrder.vue";
import CustomerAllOrders from "@/components/tables/components/OrderListData.vue";
import CustomerCancelledOrder from "@/components/tables/components/CancelledOrder.vue";
import CustomerDepositsTable from "@/components/tables/components/DepositsTable.vue";
import CustomerRefundBalanceTable from "@/components/tables/components/RefundBalanceTable.vue";
import CustomerComplaintsTable from "@/components/tables/components/ComplaintsList.vue";
import {
  customerAllOrders,
  customerAllOrdersConfig,
} from "~/composables/useCustomerTable";
import {
  customerComplaints,
  customerComplaintsConfig,
} from "~/composables/useCustomerTable";
import { useNavStore } from "@/stores/NavStore";
import { Customer } from "~/api/customer/customer";

const route = useRoute();
const navStore = useNavStore();

const orderDetail = {
  order_id: String,
  order_date: String,
  product: String,
  status: String,
  order_total: Number,
  payment_type: String,
};

const activeName = ref("p_detail");
const tableName = ref("");
const CustomerAllOrdersTable = reactive({
  config: customerAllOrdersConfig,
  data: {
    items: [
      {
        order_id: "102",
        order_date: "12/02/2023",
        product: "product",
        status: "pending",
        order_total: "65",
        payment_type: "payment",
      },
    ],
  },
});
const CustomerComplaintsTableData = reactive({
  config: customerComplaintsConfig,
  data: customerComplaints,
});

// customer details.

const dataFetched = reactive({
  personalDetails: false,
  latestOrders: false,
  allOrders: false,
  canceledOrders: false
});

const customerDetails = reactive({
  customer_id: "",
  header: {
    customer_entry: "-",
    distributor_name: "",
    profile_pic:""
  },
  personal: {
    id: "-",
    phone: "-",
    name:"-",
    address_name:"-",
    email: "-",
    joining_date: "-",
    region: "-",
    district: "-",
    is_active: false,
    documents: {},
  },
  latest_order: {

  },
  all_orders: {
    items: [],
    config: customerAllOrdersConfig,
    tableLoadingStatus: true
  },
  canceled_orders: {
    items: [],
    config: customerCancelledOrderConfig,
    tableLoadingStatus: true
  },
});

const IndividualCustomerTbaleData = reactive({
  all_orders: {
    config: tableConfig.individual_all_orders,
    data: [],
  },
  cancell_orders: {
    config: tableConfig.individual_cancelledorder,
    data: [],
  },
  deposits: {
    config: tableConfig.individual_diposits,
    data: [],
  },
  refund_balance: {
    config: tableConfig.individual_refund_balance,
    data: [],
  },
  complaints: {
    config: tableConfig.individual_complaints,
    data: [],
  },
});

const table = reactive({
  config: [],
  data: [],
});
watch(activeName, async() => {
  if (activeName.value === "p_detail") {
    tableName.value = "";
    // if (!dataFetched.latestOrders) {
      await getCustomerDetails();
    // }
    return;
  }
  else if (activeName.value === "l_orders") {
    tableName.value = "";
    // if (!dataFetched.latestOrders) {
      await getLatestOrders();
    // }
    dataFetched.latestOrders = true;
    return;
  }
  else if(activeName.value === "all_orders"){
    tableName.value = "All Orders";
    // if (!dataFetched.allOrders) {
      await getAllOrders();
    // }
    dataFetched.allOrders = true;
    return;
  } 
  else if(activeName.value === "can_orders"){
    tableName.value = "Canceled Orders";
    // if (!dataFetched.canceledOrders) {
      await getCanceledOrders();
    // }
    dataFetched.canceledOrders = true;
    return;
  } 
  else if (activeName.value === "deposits") {
    table.config = IndividualCustomerTbaleData.deposits.config;
    tableName.value = "Deposit amount";
  } else if (activeName.value === "r_balance") {
    table.config = IndividualCustomerTbaleData.refund_balance.config;
    tableName.value = "Refund balance";
  } else if (activeName.value === "complaints") {
    table.config = IndividualCustomerTbaleData.complaints.config;
    tableName.value = "Complaints";
  } else {
    tableName.value = "";
  }
});
const handleClick = (tab, event) => {
  const name = tab.props.name;
};

async function getCanceledOrders(){
  try{
    const res = await Customer("get", customerDetails.customer_id, "cancelled_orders");
    const data = res.data[0].orders.map((e)=>{
      const order_items = e.order_items.length ? e.order_items[0].name : "kg |steel";
      const created_at = e.created_at.split("T")[0].split("-").join("/");
      const cancel_reason = "change of mind";
      const initiated_by = "customer";
      const penalty_amount = "GHS 60";
      return {...e,created_at,order_items,cancel_reason,initiated_by,penalty_amount }
    })
    customerDetails.canceled_orders.items = data;
    customerDetails.canceled_orders.config = customerCancelledOrderConfig;
    customerDetails.canceled_orders.tableLoadingStatus = false;
  }catch(err){
    flashNotification(
        "warning",
        "unable fetch canceled orders details, please try again."
      );
  }
}


async function getAllOrders(){
  try{
    const res = await Customer("get", customerDetails.customer_id, "all_orders");
    const data = res.data[0].orders.map((e)=>{
      const order_items_array  = e.order_items?.length ? e.order_items.map(item => {return item.name}) : [];
      const order_items = filterItems(order_items_array)
      // const order_items = e.order_items.length ? e.order_items[0].name : "-";
      const created_at = e.created_at.split("T")[0].split("-").join("/")
      return {...e,created_at, order_items}
    })
    customerDetails.all_orders.items = data;
    dataFetched.allOrders = true;
    customerDetails.all_orders.tableLoadingStatus = false;
  }catch(err){
    flashNotification(
        "warning",
        "unable fetch all orders, please try again."
      );
  }
}

// getting customer details.
async function getLatestOrders() {
  try{
    const res = await Customer("get", customerDetails.customer_id, "latest_order")
    // const order_items = res.data[0].orders[0].order_items || []

    customerDetails.latest_order = {...res.data[0].orders[0]};
    console.log(customerDetails.latest_order)

  }catch(err){
    flashNotification(
        "warning",
        "unable fetch the latest order, please try again."
      );
  }
  // Customer("get", customerDetails.customer_id, "latest_order")
  //   .then((res) => {
  //     console.log(res.data[0])
      // customerDetails.latest_orders = res.data[0].orders.filter(
      //   (product) => product.order_items.length
      // );
      // // const allOrders = res.data[0].orders.filter(
      // //   (product) => product.order_items.length
      // // );
      // // customerDetails.all_orders.items = allOrders.map((e) => {
      // //   const newObj = {
      // //     order_id: e.order_id,
      // //     order_date: e.created_at?.split("T")[0].split("-").join("/") || "-",
      // //     product: e.order_items[0].style_name,
      // //     status: e.delivery_status,
      // //     order_total: e.order_items[0].total_cost,
      // //     payment_type: e.payment_type,
      // //   };
      // //   return newObj;
      // // });
      // console.log(customerDetails.latest_orders)
    // })
    // .catch((err) => {
    // });
}
// getting latest order details.
async function getCustomerDetails() {
  try {
    const res = await Customer(
      "get",
      customerDetails.customer_id,
      "personal_details"
    );
    customerDetails.header.customer_entry =
      res.data[0].header_details.customer_entry || "-";
    customerDetails.header.distributor_name =
      res.data[0].header_details.company_owner || "-";
    customerDetails.header.profile_pic = 
      res.data[0].header_details.profile_pic || "-";

    customerDetails.personal.id =
      res.data[0].personal_details.display_id || "-";
    customerDetails.personal.phone = res.data[0].personal_details.phone || "-";
    customerDetails.personal.email = res.data[0].personal_details.email || "-";
    customerDetails.personal.name = (`${res.data[0].personal_details?.first_name || "-"} ${res.data[0].personal_details?.last_name  || ""}`) || "-";
    customerDetails.personal.is_active =
      res.data[0].personal_details.is_active || false;
    customerDetails.personal.joining_date =
      res.data[0].personal_details.created_at
        ?.split("T")[0]
        .split("-")
        .join("/") || "-";
    customerDetails.personal.district = res.data[0].address[0].district || "-";
    customerDetails.personal.region = res.data[0].address[0].region || "-";
    customerDetails.personal.address_name = res.data[0].personal_details.first_name || "-";
    customerDetails.personal.documents =
      res.data[0].documents.filter(
        (e) => e.document_name === "ghana_card"
      )[0] ||
      res.data[0].documents[0] ||
      "-";
      dataFetched.personalDetails = true;
  } catch (err) {
    flashNotification(
      "warning",
      "unable fetch the user details please try again."
    );
  }

}

// handling image error
function handleImageError(data){
  if(data === "profile"){
   customerDetails.header.profile_pic = "https://via.placeholder.com/300x200"
  }
};

function filterItems(data){
  // ["3kg|steel","6kg|steel","6kg|steel"]
  // 3kg|steel,6kg|steel(2)
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
  .join(',');

  return finalString.length ? finalString : "-";

}

onMounted(async () => {
  const id = route.fullPath.split("/")[2].split("-");
  id.splice(0, 1);
  const fid = id.join("-");
  customerDetails.customer_id = fid;
  console.log(fid);
  navStore.setBreadCrumbs("Customer / Details");
  await getCustomerDetails();
});
</script>
<style scoped></style>
