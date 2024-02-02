<template>
  <h4 class="page_heading mt-4 mb-4">All orders</h4>
  <div>
    <Table
      style="border-radius: 20px"
      :addButtonVisibility="false"
      :actionVisibility="false"
      :tableCheckBoxVisibility="true"
      :export="true"
      :filter="true"
      :filterData="tableData.filterOptions"
      :refresh="true"
      :tableConfig="tableConfig"
      :tableData="selectedTableData"
      :tableQuery="tableData.listQuery"
      @pagination="handlePagination()"
      @multipleSelection="handleMultipleSelection($event)"
      :heading-row-reverse="true"
    />
  </div>
</template>
<script setup>
import Table from "@/components/tables/Table.vue";
import { fetchDeliveryAgentDetails } from "@/api/distributor/delivery-agents-details"

import { deliveryAgentAllOrders, listQuery, filterAllOrders } from "~/composables/useDeliveryAgentOrdersAndComplaints";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();


const props = defineProps({
  distId: null,
});

let selectedTableData = ref({})


const tableConfig = [
  {
    label: "Order ID",
    sortable: true,
    prop: "order_id",
    width: "120",
  },
  {
    label: "Order Date",
    sortable: true,
    prop: "created_at",
    width: "130",
  },
  {
    label: "Ordered Product",
    sortable: true,
    prop: "ordered_product",
    width: "180",
  },
  {
    label: "Order Total",
    sortable: true,
    prop: "order_total",
    width: "140",
  },
  {
    label: "Order By",
    sortable: true,
    prop: "order_by",
    width: "120",
  },
  {
    label: "Payment Method",
    sortable: true,
    prop: "payment_method",
    width: "170",
  },
  {
    label: "Location",
    sortable: true,
    prop: "location",
    width: "150",
  },
  {
    label: "Status",
    sortable: true,
    prop: "status",
    width: "130",
  },
  {
    label: "Assigned Vehicle",
    sortable: true,
    prop: "assigned_vehicle",
    width: "170",
  },
  {
    label: "Vehicle passing no.",
    sortable: true,
    prop: "vehicle_passing_no",
    width: "190",
  },
];




const tableData = {
  tableData: deliveryAgentAllOrders,
  tableConfig: deliveryAgentAllOrdersConfig,
  listQuery: listQuery,
  filterOptions: filterAllOrders,
};

const fetchApiData = async () => {


    let id = props.distId;
      let paramsQuery = reactive({
        "tab": "all_orders",
        "employee_type": "delivery_agent"
      });

      fetchDeliveryAgentDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          console.log("Delivery Agents all-orders",res.data[0])

          let customeResponse = {
              "items" : res.data[0].orders,
              "total": 10,
              "page": 1,
              "size": 10,
              "pages": 1
            }
            selectedTableData.value = customeResponse;
        } 
      })
  
};



const handlePagination = (page) => {
  console.log(page);
};

onBeforeMount(async () => {
  await fetchApiData();
});

onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Delivery vehicles & agents / Total delivery agents / All orders");
});
</script>
