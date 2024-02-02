<template>
  <div class="container-area">
    <div class="dist_box">
      <div class="dist_heading">
        <p>Distributor name: <span> Yaw Graham</span></p>
        <button class="btn btn-primary" @click="handleStockRequest">
          Stock Request
        </button>
      </div>
      <div class="table-area">
        <Table style="border-radius: 20px;" :tableData="distributorStockData" :tableConfig="distributorStockConfig"
          :actionVisibility="false" :tableSearchVisibility="false" :tableQuery="listQuery" @view="handleInstockView" />
      </div>
    </div>
    <div class="dist_box" v-if="stockDataType">
      <div class="dist_heading">
        <p><span>In stock</span> ({{ stockDataType }})</p>
      </div>
      <div class="table-area">
        <Table style="border-radius: 20px;" :tableData="individualStockData" :export="true" :filter="true" :refresh="true"
          :heading-row-reverse="true" :tableConfig="individualStockConfig" :actionVisibility="false"
          :tableSearchVisibility="true" :tableQuery="listQuery" @view="handleInstockView" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Table from "@/components/tables/Table.vue";
import { useNavStore } from "@/stores/NavStore";
import { useRouter } from "vue-router";
const navStore = useNavStore();
const router = useRouter();
const stockDataType = ref("");
function handleInstockView(data) {
  stockDataType.value = data.product;
}
// let computedStockData = computed(()=>{

// })
const handleStockRequest = () => {
  const currentRoute = router.currentRoute.value.path;
  router.push(`${currentRoute}/stock-request`);
};
onMounted(() => {
  navStore.setBreadCrumbs("Inventory and stock / Distributor's stock");
});
const distributorStockConfig = [
  {
    label: "Product",
    sortable: true,
    prop: "product",
  },
  {
    label: "In Stock",
    sortable: true,
    prop: "in_stock",
    popover: true,
  },
  {
    label: "Total value",
    sortable: true,
    prop: "total_value",
  },
  {
    label: "Stock Required",
    sortable: true,
    prop: "stock_required",
  },
];

const distributorStockData = {
  items: [
    {
      product: "3kg|steel",
      in_stock: "5000/10000",
      total_value: "GHs 125000",
      stock_required: "5,000",
    },
    {
      product: "6kg|steel",
      in_stock: "5000/10000",
      total_value: "GHs 125000",
      stock_required: "5,000",
    },
    {
      product: "12kg|steel",
      in_stock: "5000/10000",
      total_value: "GHs 125000",
      stock_required: "5,000",
    },
    {
      product: "6kg|comp",
      in_stock: "5000/10000",
      total_value: "GHs 125000",
      stock_required: "5,000",
    },
    {
      product: "12kg|comp",
      in_stock: "5000/10000",
      total_value: "GHs 125000",
      stock_required: "5,000",
    },
  ],
};
const individualStockConfig = [
  {
    label: "Order Id",
    sortable: true,
    prop: "id",
  },
  {
    label: "Cylinder id",
    sortable: true,
    prop: "cylinder_id",
  },
  {
    label: "Ordered date",
    sortable: true,
    prop: "ordered_date",
  },
  {
    label: "Cylinder location",
    sortable: true,
    prop: "location",
  },
];
const individualStockData = {
  items: [
    {
      id: "#A1234",
      cylinder_id: "N0223101000002",
      ordered_date: "2023/10/10",
      location: "Atomic GS-0757-3391",
    },
    {
      id: "#A1235",
      cylinder_id: "N0223101000003",
      ordered_date: "2023/10/11",
      location: "Atomic GS-0757-3392",
    },
    {
      id: "#A1236",
      cylinder_id: "N0223101000004",
      ordered_date: "2023/10/12",
      location: "Atomic GS-0757-3393",
    },
    {
      id: "#A1237",
      cylinder_id: "N0223101000005",
      ordered_date: "2023/10/13",
      location: "Atomic GS-0757-3394",
    },
    {
      id: "#A1238",
      cylinder_id: "N0223101000006",
      ordered_date: "2023/10/14",
      location: "Atomic GS-0757-3395",
    },
    {
      id: "#A1239",
      cylinder_id: "N0223101000007",
      ordered_date: "2023/10/15",
      location: "Atomic GS-0757-3396",
    },
    {
      id: "#A1240",
      cylinder_id: "N0223101000008",
      ordered_date: "2023/10/16",
      location: "Atomic GS-0757-3397",
    },
    {
      id: "#A1241",
      cylinder_id: "N0223101000009",
      ordered_date: "2023/10/17",
      location: "Atomic GS-0757-3398",
    },
    {
      id: "#A1242",
      cylinder_id: "N0223101000010",
      ordered_date: "2023/10/18",
      location: "Atomic GS-0757-3399",
    },
    {
      id: "#A1243",
      cylinder_id: "N0223101000011",
      ordered_date: "2023/10/20",
      location: "Atomic GS-0757-3400",
    },
  ],
  page: 1,
  pages: 1,
  size: 5,
  total: 20,
};
let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});
</script>

<style lang="scss" scoped>
.dist_box {
  margin-bottom: 60px;

  .table-area {
    margin-top: 30px;
  }

  .dist_heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;

    p {
      color: #7B809A;
      font-size: 20px;
      font-weight: 600;
      line-height: 27.4px;
      margin: 0;

      span {
        font-weight: 600;
        color: var(--black);
      }
    }

    button {
      margin: 0;
    }
  }
}
</style>
