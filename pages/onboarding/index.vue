<template>
  <div class="container-area">
    <h4 class="page_heading">Manage admins & roles</h4>
    <div class="table_header">
      <el-button v-if="activeName == 'first'" type="button" class="btn_add" @click="handleCreateAdmin()"><span
          class="text-white"><i>+</i>Add Admin</span>
      </el-button>
      <el-button v-if="activeName == 'second'" type="button" class="btn_add" @click="handleCreateRole()"><span
          class="text-white"><i>+</i>Add Role</span>
      </el-button>

      <!-- tab  -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Admins" name="first">
          <div class="table-area">
            <Table 
              tableHeading="List Admin" 
              :tableLoadingStatus="tableLoding"
              :tableConfig="tableConfig" 
              :tableData="listData" 
              :tableQuery="listQuery"
              :moreActionsVisibility="true" 
              :tableCheckBoxVisibility="true" 
              @pagination="handlePagination()" 
              @edit="handleEditAdmin($event)" 
              @delete="handleDelete($event)"
              @multipleSelection="handleMultipleSelection($event)"
              @search="handleSearch($event)" 
              @rolePermission="handleAssignRoleAndPermission($event)"
              @resetPassword="handleResetPassword($event)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Roles" name="second">
          <RoleModule />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
  
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { getList as getAdminList, destroy } from "@/api/admin.js"
import { useRouter } from "vue-router";
import RoleModule from "@/pages/onboarding/role/index.vue"
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
import Table from "@/components/tables/Table.vue";

const router = useRouter();
const activeName = ref("first");
let tableLoding = ref(false)
const listData = ref();


let tableConfig = reactive([
  {
    label: "ID",
    prop: "id",
    width: "400",
    sortable: true,
    className: "redFont"
  },
  {
    label: "Name",
    prop: "first_name",
    width: "400",
    sortable: true,
    className: "redFont"
  },
  {
    label: "Phone #",
    prop: "phone",
    width: "200",
    sortable: true,
    className: "redFont"
  },
  {
    label: "Email",
    prop: "email",
    width: "300",
    sortable: true,
    className: "redFont"
  },
  // {
  //   label: "Role",
  //   prop: "assigned_role",
  //   width: "",
  //   sortable: true,
  //   className: "redFont"
  // },

]);

let listQuery = {
  search: "",
  sort_in: "desc",
  sort_by: "created_at",
  is_deleted: false,
  page: 1,
  size: "10",
};



// reset password 
function handleResetPassword() {
  router.push("/user")
}

// assign-rol-admin
function handleAssignRoleAndPermission(data) {
  router.adminName=data.admin_name
  navigateTo("/onboarding/assign-role-permission");
}

// admin search
function handleSearch(searchKey) {
  listQuery.search = searchKey.value
  getList();
}


// pagination
function handlePagination(data) {
  getList();
}

// add Admin
function handleCreateAdmin() {
  let r = "add-admin";
  router.push(`onboarding/${r}`);
}



// delete admin
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

// get list
function getList(){
  tableLoding.value = true
  getAdminList(listQuery).then((response) => {
    listData.value = response.data
    console.log("listData.value", listData.value)
    tableLoding.value = false
  })
}

function handleMultipleSelection(data) {
  console.log(data);
}

// add Role
function handleCreateRole() {
  let r = "role/add";
  router.push(`onboarding/${r}`);
}

// edit 
function handleEditAdmin() {
  // let r = "role";
  // router.push(`onboarding/${r}`);
}



onMounted(() => {
  navStore.setBreadCrumbs('Orboarding')
  getList();
  const route = useRouter();
  if(route.previousRoute && route.previousRoute == 'role') {
    activeName.value = 'second';
    route.previousRoute = "";
  }else{
    activeName.value = "first"
  }
})

definePageMeta({
  layout: "default",
});
</script>