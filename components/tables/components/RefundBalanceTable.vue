<template>
  <div>
    <Table
      :table-config="customerRefundBalanceConfig"
      :table-data="customerRefundBalance"
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
  customerRefundBalanceConfig,
  customerRefundBalance,
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
