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
            <h4>Yaw Boafo</h4>
            <el-switch
              v-model="value5"
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
            <p class="grey">Depot manager</p>
            <p>Distributor name:<span>Yav Gravan</span></p>
            <p>ID:<span>101</span></p>
          </div>
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Personal details" name="p_detail"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- conditional rendering -->
    <h4 class="page_heading mt-4 mb-3">{{ tableName }}</h4>
    <div>
      <DistributorDetails v-if="activeName === 'p_detail'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DistributorDetails from "@/components/distributor/DistributorDetails.vue";

const activeName = ref("p_detail");
const tableName = ref("");
const value5 = ref(true);

//change component afetr calling
const handleClick = (tab, event) => {
  activeName.value = tab.props.name;
};
</script>
<style scoped lang="scss">
.cd_header .header_inner .h_right .h_info {
  flex-wrap: wrap;
  max-width: 400px;
  gap: 4px 80px;
}
</style>
