<template>
  <div class="container-area">
    <div class="cyl_info">
      <div class="cyl_info_inner">
        <div>
          <p>Po: <span>1101</span></p>
          <p>Product: <span>3kg|Steel</span></p>
          <p>Cylinder ID: <span>N02231010000002</span></p>
        </div>
        <div>
          <p>Manufacturer: <span>Mg gas ltd</span></p>
          <p>Purchase date: <span>2021/09/20</span></p>
        </div>
        <div class="cy_sw">
          <el-switch v-model="value5" class="ml-2" inline-prompt style="
                  --el-switch-on-color: #0a7b37;
                  --el-switch-off-color: #ff4949;
                " active-text="Active" inactive-text="In-active" />
        </div>
      </div>
    </div>
    <h4 class="page_heading mt-5 mb-3">History tracking</h4>
    <!-- Table Component -->
    <div class="table-area">
      <Table style="border-radius: 20px" :addButtonVisibility="false" :tableCheckBoxVisibility="false"
        :tableSearchVisibility="false" :actionVisibility="false" :export="false" :filter="false"
        :filterData="filterAllManufacturers" :refresh="false" :tableConfig="trackingConfig" :tableData="tracking"
        :tableQuery="listQuery" @view="handleView" @pagination="handlePagination()"
        :editButtonVisibility="tableEditButtonVisibility" @edit="handleEdit($event)" @delete="handleDelete($event)"
        @multipleSelection="handleMultipleSelection($event)" :heading-row-reverse="true" />
    </div>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
import Table from "@/components/tables/Table.vue";
const value5 = ref(true);

const trackingConfig = [

  {
    label: "From Date",
    width: "200",
    sortable: true,
    prop: "from_date",
  },
  {
    label: "To Date",
    width: "200",
    sortable: true,
    prop: "to_date",
  },
  {
    label: "Ownership status",
    width: "175",
    sortable: true,
    prop: "owner_status",
  },
  {
    label: "Ownership_person",
    width: "150",
    sortable: true,
    prop: "owner_person",
  },
  {
    label: "Cylinder Location",
    width: "120",
    sortable: true,
    prop: "cylinder_loc",
  },

];

const tracking = {
  items: [
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Distributor",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Bottling Facility",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Customer",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Distributor",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Bottling Facility",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Customer",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Distributor",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Bottling Facility",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },
    {
      from_date: "2022/12/15",
      to_date: "2024/12/15",
      owner_status: "Customer",
      owner_person: "Yawn Nwafor",
      cylinder_loc: " Atomic GS-0757-3391",
    },


  ],
};

onMounted(() => {
  navStore.setBreadCrumbs('Inventory and Stock / Cylinder Tracking')
})

definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.cyl_info {
  background-color: rgb(215, 220, 227);
  padding: 30px 25px;
  position: relative;

  .cyl_info_inner {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 700px;

    &>div {
      display: flex;
      flex-direction: column;
      gap: 12px 10px;
    }

    p {
      display: block;
      color: #7B809A;
      font-size: 16px;
      font-weight: 400;
      line-height: 21.92px;
      margin: 0;

      span {
        font-weight: 500;
        color: var(--black);
        margin-left: 5px;
      }
    }
  }
}

@media (max-width: 992px) {
  .cyl_info {
    padding: 25px;

    .cyl_info_inner {
      display: grid;
      gap: 10px;

      &>div {
        gap: 10px;
      }

      .cy_sw {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
}
</style>
