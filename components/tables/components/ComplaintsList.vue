<template>
    <div>
      <Table
        :table-config="props.table.config"
        :table-data="props.table.data"
        :table-query="listQuery"
        :export="true"
        :filter="true"
        :filterData="filterData"
        :refresh="true"
        :editButtonVisibility="false"
        :deleteButtonVisibility="true"
        :viewButtonVisibility="true"
        :tableCheckBoxVisibility="true"
        :heading-row-reverse="true"
      />
    </div>
  </template>
  
  <script setup>
  import Table from "../Table.vue";
  const props = defineProps({
    table : {
      type: Object,
      required : true,
      default : {}
    },
    filterData : {
      type : Array,
      required : true,
      default : []
    }
  })
  let listQuery = reactive({
    page: 1,
    limit: 10,
    search: "",
    searchJoin: "or",
    orderBy: "created_at",
    sortedBy: "desc",
  });
  </script>
  