<template>
  <div class="main_div">
    <el-row :gutter="30" class="main_row">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <h4 class="cd_heading">{{ heading }}</h4>
          <div>
            <h4 class="cd_heading">License details</h4>
            <div class="cd_list">
              <div class="cd_item">
                <h4 v-if="license_details.license_number != null" class="p-0">License number:<span>{{ license_details.license_number }}</span></h4>
                <h4 v-else class="p-0">License number:<span>N/A</span></h4>

              </div><br>
              <div class="cd_item">
                <h4 v-if="license_details.expiry != null" class="p-0">License Expiry date:<span>{{ license_details.expiry }}</span></h4>
                <h4 v-else class="p-0">License Expiry date:<span>N/A</span></h4>

              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <h4 class="cd_heading">Uploaded documents</h4>
          <div class="up_doc">
            <div class="doc_item">
              <img src="@/assets/img/card-visa.jpg" alt="image" @error="handleImageError('profile')"/>
              <h4>
                <span>License (Front side)</span>
                Uploaded on 11/08/2023
              </h4>
              <template v-if="!isVerified">
                <nuxt-link class="verify_pending">
                  <!-- :to="`/delivery/verify-agent-${customerId}`" -->
                  {{ verificationStatusText }}
                </nuxt-link>
              </template>
              <template v-else>
                <div class="verify_success">
                  <i class="ri-check-line"></i>{{ verificationStatusText }}
                </div>
              </template>
            </div>
            <div class="doc_item">
              <img src="@/assets/img/card-visa.jpg" alt="image" />
              <h4>
                <span>License (Back side)</span>
                Uploaded on 11/08/2023
              </h4>
              <template v-if="!isVerified">
                <nuxt-link class="verify_pending">
                  <!-- :to="`/delivery/verify-agent-${customerId}`" -->
                  {{ verificationStatusText }}
                </nuxt-link>
              </template>
              <template v-else>
                <div class="verify_success">
                  <i class="ri-check-line"></i>{{ verificationStatusText }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
const isVerified = ref(false);

let abcd = ref("https://minio.minio--yzwf6hkd6qdh.addon.code.run:443/nova/employee/0c1c9b8e-dbc1-4872-967e-a284f57cd11c/ghana_card/ff7bc556-3c2d-4670-a07d-1b88cb126101_back.jpg")
const props = defineProps({

license_details: {
  type: Object,
  default: function () {
    return {
    
    };
  }
},

});


const verificationStatusText = computed(() => {
  return isVerified.value ? "Verified Successfully" : "Verification Pending";
});


function handleImageError(type) {
  if (type === 'profile') {
    abcd = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4TTdIlL3swAddqR7ZY42BAgAo5Xj4lawocuvnjIuEVXm7ref0Xb9D0LTqfCNyPVGpy8&usqp=CAU"
  }
}


onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Delivery vehicles & agents / Total delivery agents / License details");
});
</script>
  
<style lang="scss" scoped>
.main_div {
  margin-top: 40px;
}

.cd_heading {
  text-transform: capitalize;
}

@media (max-width: 992px) {
  .main_row {
    gap: 30px;
  }

  .cd_box {
    min-height: auto;
  }
}
</style>
  