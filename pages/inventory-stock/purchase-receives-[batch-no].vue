<template>
  <div class="container-area">
    <h4 class="page_heading mb-3"><span>Batch no:</span>A01</h4>
    <div class="batch_details">
      <ul>
        <li>PO:<span>1101</span></li>
        <li>Order ID:<span>#A1234</span></li>
        <li>Manufacturer:<span>Mg Gas ltd.</span></li>
        <li>Ordered date:<span>2021/09/20</span></li>
      </ul>
    </div>
    <div class="all_heading mt-4">
    </div>

    <h4 class="page_heading mt-5 mb-3">All cylinders of batch A01</h4>
    <!-- Table Component -->
    <div class="table-area">
      <Table style="border-radius: 20px" :addButtonVisibility="false" :tableCheckBoxVisibility="true"
        :actionVisibility="false" :export="true" :filter="true" :filterData="filterAllManufacturers" :refresh="true"
        :tableConfig="distributorStockConfig" :tableData="distributorStock" :tableQuery="listQuery" @view="handleView"
        @pagination="handlePagination()" :editButtonVisibility="tableEditButtonVisibility" @edit="handleEdit($event)"
        @delete="handleDelete($event)" @multipleSelection="handleMultipleSelection($event)" :heading-row-reverse="true" />
    </div>
  </div>
</template>

<script setup>
import Table from "@/components/tables/Table.vue";
const distributorStockConfig = [
  {
    label: "Cylinder Id",
    width: "200",
    sortable: true,
    prop: "id",
  },
  {
    label: "Product Size",
    width: "175",
    sortable: true,
    prop: "product_size",
  },
  {
    label: "Product Type",
    width: "150",
    sortable: true,
    prop: "product_type",
  },
  {
    label: "Tare weight",
    width: "120",
    sortable: true,
    prop: "tare_weight",
  },

];

const distributorStock = {
  items: [
    {
      id: "N02231010000002",
      product_size: "3kg",
      product_type: "Steel",
      tare_weight: "1.5kg",
      phone: " 0277400000",
      storage_cap: "10,000",
    },
    {
      id: "N02231010000002",
      product_size: "3kg",
      product_type: "Steel",
      tare_weight: "1.5kg",
      phone: " 0277400000",
      storage_cap: "10,000",
    },
    {
      id: "N02231010000002",
      product_size: "3kg",
      product_type: "Steel",
      tare_weight: "1.5kg",
      phone: " 0277400000",
      storage_cap: "10,000",
    },
    {
      id: "N02231010000002",
      product_size: "3kg",
      product_type: "Steel",
      tare_weight: "1.5kg",
      phone: " 0277400000",
      storage_cap: "10,000",
    },
    {
      id: "N02231010000002",
      product_size: "3kg",
      product_type: "Steel",
      tare_weight: "1.5kg",
      phone: " 0277400000",
      storage_cap: "10,000",
    },

  ],
};

// onMounted(() => {
//     navStore.setBreadCrumbs('/ Inventory and Stock / Purchase receives')
//  })

definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.page_heading {
  span {
    color: #7B809A;
    margin-right: 5px;
  }
}

.batch_details {
  background-color: rgb(215, 220, 227);
  padding: 25px;

  ul {
    padding-inline-start: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 10px;
    width: 100%;
    max-width: 515px;

    li {
      display: block;
      color: #7B809A;
      font-size: 16px;
      font-weight: 400;
      line-height: 21.92px;

      span {
        font-weight: 500;
        color: var(--black);
        margin-left: 5px;
      }
    }
  }
}

@media (max-width: 768px) {
  .batch_details {
    ul {
      grid-template-columns: repeat(1, 1fr);
      gap: 10px;
    }
  }
}
</style>