<template>
  <div>
    <Table
      :table-config="customerDepositsConfig"
      :table-data="customerDeposits"
      :table-query="listQuery"
      :export="true"
      :filter="true"
      :refresh="true"
      :actionVisibility="false"
      :heading-row-reverse="true"
    />
  </div>
</template>

<script setup>
import Table from "../Table.vue";
import {
  customerDepositsConfig,
  customerDeposits,
} from "@/composables/useCustomerTable";
let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});
</script>
