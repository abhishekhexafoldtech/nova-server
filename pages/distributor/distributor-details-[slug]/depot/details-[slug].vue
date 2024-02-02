<template>
  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <!-- <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4TTdIlL3swAddqR7ZY42BAgAo5Xj4lawocuvnjIuEVXm7ref0Xb9D0LTqfCNyPVGpy8&usqp=CAU"
          alt="Profile"
        /> -->
        <div class="h_right">
          <div class="h_name">
            <h4>Gas agency</h4>
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
            <div>
              <p>Depot</p>
              <p>Company name:<span>kwatsons ltd</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Depot details" name="d_details"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <br />
    <div>
      <DepotDetailes v-if="activeName === 'd_details'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DepotDetailes from "@/components/distributor/location/depot/DepotDetailes";
const activeName = ref("d_details");
const value5 = ref(true);
// const router = useRouter();
</script>
<style scoped lang="scss">
.cd_header .header_inner {
  max-width: 400px;

  .h_right {
    width: 100%;
    padding: 0;
  }
}
</style>
