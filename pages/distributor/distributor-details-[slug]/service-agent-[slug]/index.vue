<template>
  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <img :src="user.header_details.profile_pic" alt="Profile" @error="handleImageError('profile')" />
        <div class="h_right">
          <div class="h_name">
            <h4>{{ `${user.header_details.first_name || "-"} ${user.header_details.last_name || ""}` }}</h4>
            <el-switch v-model="activeUser" class="ml-2" inline-prompt style="
                --el-switch-on-color: #0a7b37;
                --el-switch-off-color: #ff4949;
              " active-text="Active" inactive-text="In-active" />
          </div>
          <div class="h_info">
            <div>
              <p class="text-capitalize">{{ user.header_details?.role || "-"}}</p>
              <p>ID:<span>{{ user.header_details.display_id || "-" }}</span></p>
            </div>
            <div>
              <br />
              <p>Company name:<span class="text-capitalize">{{ user.header_details.company || "-" }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Personal details" name="personal_details"></el-tab-pane>
          <el-tab-pane label="Rating" name="rating"></el-tab-pane>
          <el-tab-pane label="All orders" name="all_orders"></el-tab-pane>
          <el-tab-pane label="Complaints" name="complaints"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- Conditional rendering -->
    <div>
      <PersonalDetailes v-if="activeName === 'personal_details'" :data="user.personal_details" />
      <Rating v-if="activeName === 'rating'" :data="user.rating" />
      <AllOrdersTable v-if="activeName === 'all_orders'" />
      <ComplaintsTable v-if="activeName === 'complaints'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PersonalDetailes from "@/components/distributor/delivery-vehicals-agents/service-agent/PersonalDetailes.vue";
import Rating from "@/components/distributor/delivery-vehicals-agents/service-agent/Rating.vue";
import AllOrdersTable from "@/components/distributor/delivery-vehicals-agents/service-agent/AllOrders.vue";
import ComplaintsTable from "@/components/distributor/delivery-vehicals-agents/service-agent/Complaints.vue";
import { useRoute } from "vue-router";
import { getEmployee } from "@/api/employee/employee"

const activeName = ref("personal_details");
const routeName = ref("");
const employeeId = ref("")
const activeUser = ref(false);
const route = useRoute();

const user = reactive(
  {
    header_details: {},
    personal_details: {},
    rating: {},
    all_orders: {},
    complaints: {}
  }
)

watch(activeName, async () => {
  await getEmployeeDetails();
})

async function getEmployeeDetails() {
  const routeParams = `tab=${activeName.value}&employee_type=${routeName.value}`
  try {
    const data = await getEmployee(employeeId.value,routeParams);
    // const data = await getEmployee("0ab88329-333f-4b66-bc1a-1f323d8351d9", routeParams);
    if(activeName.value === 'personal_details'){
      user[activeName.value] = await data.data[0];
      setHeaderDetails();
    }
    else{
      user[activeName.value] = await data.data;
    }
  } catch (err) {
    flashNotification("warning","Something went wrong please try again later.")
  }
}

async function setHeaderDetails() {
  const header_details = user[activeName.value].header_details;
  const role = typeof(header_details.role) == "string" ? header_details?.role?.split("_").join(" ") : "-";
  user.header_details = { ...header_details, role }
  activeUser.value = user.header_details.is_active;
}

function handleImageError(type) {
  if (type === 'profile') {
    user.header_details.profile_pic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4TTdIlL3swAddqR7ZY42BAgAo5Xj4lawocuvnjIuEVXm7ref0Xb9D0LTqfCNyPVGpy8&usqp=CAU"
  }
}

onMounted(async() => {
  const path = route.path.split("/");
  routeName.value = path[path.length - 1].split("-").splice(0, 2).join("_");
  employeeId.value = path[path.length - 1].split("-").splice(2,path[path.length - 1].split("-").length-1).join("-");
  await getEmployeeDetails();

})
</script>
