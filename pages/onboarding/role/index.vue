<template>
  <div class="table-area">
    <Table 
      tableHeading="List Role" 
      :tableLoadingStatus="tableLoding"
      :tableConfig="tableConfig" 
      :tableData="listData"
      :tableQuery="listQuery" 
      :tableCheckBoxVisibility="true" 
      @pagination="handlePagination()"
      @edit="handleEdit($event)" 
      @delete="handleDelete($event)"
      @multipleSelection="handleMultipleSelection($event)" 
      @search="handleSearch($event)"  
    />
  </div>
</template>
    
<script setup>
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus'
import { getList as getRole, destroy } from "@/api/role.js"
import Table from "@/components/tables/Table.vue";

// decleration 
const router = useRouter();
const listData = ref();
let tableLoding = ref(false)

let tableConfig = reactive([
  {
    label: "Role Name",
    prop: "name",
    width: "900",
    sortable: true,
    className: ""
  },
])


// query params 
let listQuery = {
  search: "",
  sort_in: "desc",
  sort_by: "created_at",
  is_deleted: false,
  page: 1,
  size: "10",
};

// admin search
function handleSearch(searchKey) {
  listQuery.search = searchKey.value
  getList();
}


// pagination
function handlePagination(data) {
  getList();
}


// multi file select 
function handleMultipleSelection(data) {
  console.log(data);
}


// get all role 
function getList() {
  tableLoding.value = true
  getRole(listQuery).then((response) => {
    listData.value = response.data
    tableLoding.value = false
  })
}


// edit role
function handleEdit(data) {
  console.log(data.id)
  let r = "role/edit";
  router.push(`onboarding/${r}_${data.id}`);
}


// delete role
function handleDelete(data) {
  ElMessageBox.confirm(
    'This will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      destroy(data.id).then(() => {
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
        getList()
      })

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

// on page mount 
onMounted(() => {
  getList()
})

// setup page meta 
definePageMeta({
  layout: "default",
});
</script>