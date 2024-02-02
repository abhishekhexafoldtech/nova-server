<template>
    <div>
      <Table
      :table-loading-status="table.tableLoadingStatus"
        :table-config="props.table.config"
        :table-data="props.table"
        :table-query="listQuery"
        :export="true"
        :filter="true"
        :filter-data="filterData"
        :refresh="true"
        :editButtonVisibility="false"
        :deleteButtonVisibility="false"
        download-link-content="View receipt"
        :download-visibility="true"
        @handleDownload="handleDownload"
        @handleViewReceipt="handleViewReceipt"
        :heading-row-reverse="true"
        :actionVisibility="actionVisibility"
      />
      <ViewReceipt
        :dialogVisible="viewReceiptVisibility"
        @handleSendReceiptEmail="handleSendReceiptEmail"
        @handleReceiptClose="handleReceiptClose"
      />
    </div>
  </template>
  
  <script setup>
  import Table from "../Table.vue";
  
  import ViewReceipt from "@/components/Dialog/ViewReceipt.vue";




  const props = defineProps({
    table: {
      type : Object,
      required : true,
      default : {}
    },

    filterData : {
      type : Array,
      required : true,
      default : []
    },
    actionVisibility : {
      type : Boolean,
      required : false,
      default : true
    }
  })

  watch(props.table,()=>{
    console.log(props.table)
  })

  const viewReceiptVisibility = ref(false);
  let listQuery = reactive({
    page: 1,
    limit: 10,
    search: "",
    searchJoin: "or",
    orderBy: "created_at",
    sortedBy: "desc",
  });
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
  </script>
  