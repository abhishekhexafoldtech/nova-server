<template>
  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4TTdIlL3swAddqR7ZY42BAgAo5Xj4lawocuvnjIuEVXm7ref0Xb9D0LTqfCNyPVGpy8&usqp=CAU"
          alt="Profile"
        />
        <div class="h_right">
          <div class="h_name">
            <h4>{{ `${user.header_details.first_name || "-"} ${user.header_details.last_name || ""}` }}</h4>
            <el-switch
              v-model="activeUser"
              class="ml-2"
              inline-prompt
              style="
                --el-switch-on-color: #0a7b37;
                --el-switch-off-color: #ff4949;
              "
              active-text="Active"
              inactive-text="In-active"
            />
          </div>

          <div class="h_info">
            <div>
              <p class="text-capitalize">{{ user.header_details.role || "-"}}</p>
              <p>ID:<span>{{ user.header_details.display_id || "-" }}</span></p>
            </div>

            <div>
              <p class="text-capitalize">Exchange point:<span>{{user.header_details.exchange_name || "-"}}</span></p>
              <p class="text-capitalize">Company name:<span >{{ user.header_details.company || "-" }}</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="cd_header_tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="Personal details"
            name="personal_details"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <br />
    <!-- renderd tab component -->
    <div>
      <PersonalDetailes v-if="activeName === 'personal_details'"  :data="user.personal_details"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import PersonalDetailes from "@/components/distributor/location/exchange-point-manager/PersonalDetails.vue";
import { getEmployee } from "~/api/employee/employee";
const activeName = ref("personal_details");
const activeUser = ref(true);
const route = useRoute();
const officerId = ref("");

const user = reactive({
  header_details:{},
  personal_details:{}
})

async function getEmployeeDetails() {
  const routeParams = `tab=personal_details&employee_type=exchange_point_manager`
  try {
    // const data = await getEmployee(officerId.value,routeParams);
    const data = await getEmployee("29f256d1-6caa-458b-8b81-f8c2900838b8", routeParams);
      user[activeName.value] = await data.data[0];
    setHeaderDetails();
  } catch (err) {
    flashNotification("warning","Something went wrong please try again later.")
  }
}

async function setHeaderDetails() {
  const header_details = user[activeName.value].header_details;
  const role = header_details.role.split("_").join(" ")
  const exchange_name = user[activeName.value].personal_details?.address[0]?.name;
  user.header_details = { ...header_details, role, exchange_name }
  activeUser.value = user.header_details.is_active;
}

function handleImageError(type) {
  if (type === 'profile') {
    user.header_details.profile_pic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4TTdIlL3swAddqR7ZY42BAgAo5Xj4lawocuvnjIuEVXm7ref0Xb9D0LTqfCNyPVGpy8&usqp=CAU"
  }
}

onMounted(async()=>{
  const path = route.path.split("/");
  officerId.value = path[path.length - 1].split("-").pop();
  await getEmployeeDetails();
})

</script>
<style scoped></style>
