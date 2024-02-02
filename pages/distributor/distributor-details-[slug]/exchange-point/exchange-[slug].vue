<template>
  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <div class="h_right">
          <div class="h_name">
            <h4>Accra</h4>
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
              <p>Exchange point</p>
              yes mam
              <p>Company name:<span>kwatsons ltd</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="Exchange point details"
            name="e_point_details"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <br />
    <div>
      <ExchangePointDetailes v-if="activeName === 'e_point_details'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ExchangePointDetailes from "@/components/distributor/location/exchange-point/ExchangePointDetails.vue";
const activeName = ref("e_point_details");
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
