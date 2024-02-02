<template>
  <div>
    <Table
      :table-config="customerCancelledOrderConfig"
      :table-data="customerCancelledOrder"
      :table-query="listQuery"
      :export="true"
      :filter="true"
      :refresh="true"
      :editButtonVisibility="false"
      :deleteButtonVisibility="false"
      download-link-content="View receipt"
      :download-visibility="true"
      @handleDownload="handleDownload"
      @handleViewReceipt="handleViewReceipt"
      :heading-row-reverse="true"
    />
    <CancleReceipt
      :dialogVisible="cancleReceiptVisibility"
      @handleSendReceiptEmail="handleSendReceiptEmail"
      @handleReceiptClose="handleReceiptClose"
    />
  </div>
</template>

<script setup>
import Table from "../Table.vue";
import CancleReceipt from "@/components/Dialog/CancleReceipt.vue";

import {
  customerCancelledOrderConfig,
  customerCancelledOrder,
} from "@/composables/useCustomerTable";

const cancleReceiptVisibility = ref(false);

let listQuery = reactive({
  page: 1,
  limit: 10,
  search: "",
  searchJoin: "or",
  orderBy: "created_at",
  sortedBy: "desc",
});


function handleViewReceipt(data) {
  console.log(data);
  cancleReceiptVisibility.value = true;
}

function handleSendReceiptEmail() {
  cancleReceiptVisibility.value = false;
  flashNotification("success", "Email sented.");
}

function handleReceiptClose() {
  cancleReceiptVisibility.value = false;
}

</script>
