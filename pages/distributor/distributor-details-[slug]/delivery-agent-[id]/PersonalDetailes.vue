<template>
  <div class="main_div">
    <el-row :gutter="30" class="main_row">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <h4 class="cd_heading">Personal details</h4>
          <div class="cd_list">
            <div class="cd_item">
              <img :src="Phone" alt="icon" />
              <h4>Phone number:<span>{{ personal_details.phone }}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Region" alt="icon" />
              <h4>Region:<span>N/A</span></h4>
            </div>

            <div class="cd_item">
              <img :src="Location" alt="icon" />
              <h4>Address:<span>N/A</span></h4>
            </div>
            <br />
            <div class="cd_item">
              <img :src="Email" alt="icon" />
              <h4>Email:<span>{{ personal_details.email }}</span></h4>
            </div> 
            <br />
            <div class="cd_item">
              <img :src="District" alt="icon" />
              <h4>District:<span>N/A</span></h4>
            </div>
          </div>
          <div class="mt-5">
            <h4 class="cd_heading">Work details</h4>
            <div class="cd_list">
              <div class="cd_item">
                <h4 class="p-0">Work timing:<span>{{ work_details.work_start_time }} - {{ work_details.work_end_time }}</span></h4>
              </div>
              <div class="cd_item">
                <h4 class="p-0">Delivery Zone:<span>{{ work_details.delivery_zone }}</span></h4>
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
              <img src="@/assets/img/card-visa.jpg" alt="image" />
              <h4>
                <span>Voter ID</span>
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

          <div class="mt-5">
            <h4 class="cd_heading">Assigned vehicle details</h4>
            <div  v-if="assigned_vehicles">
              <div class="cd_list" v-if="assigned_vehicles[0]">
                <div class="cd_item">
                  <h4 class="p-0">Vehical name:<span>{{ assigned_vehicles[0].name }}</span></h4>
                </div>
                <div class="cd_item">
                  <h4 class="p-0">Vehical ID:<span>{{ assigned_vehicles[0].display_id }}</span></h4>
                </div>
                <div class="cd_item">
                  <h4 class="p-0">Color:<span>{{ assigned_vehicles[0].color }}</span></h4>
                </div>
                <div class="cd_item">
                  <h4 class="p-0">Model:<span>{{ assigned_vehicles[0].model }}</span></h4>
                </div>
                <div class="cd_item">
                  <h4 class="p-0">Passing number:<span>{{ assigned_vehicles[0].passing_number }}</span></h4>
                </div>
                <div class="cd_item">
                  <h4 class="p-0">Registration number:<span>{{ assigned_vehicles[0].registration_number }}</span></h4>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import District from "@/assets/svg/district.svg";
import Email from "@/assets/svg/email.svg";
import Location from "@/assets/svg/location.svg";
import Region from "@/assets/svg/region.svg";
import Phone from "@/assets/svg/phone.svg";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const props = defineProps({

  personal_details: {
    type: Object,
    default: function () {
      return {};
    }
  },
  work_details: {
    type: Object,
    default: function () {
      return {};
    }
  },
  assigned_vehicles: {
    type: Object,
    default: function () {
      return {};
    }
  },
});

const isVerified = ref(false);

const verificationStatusText = computed(() => {
  return isVerified.value ? "Verified Successfully" : "Verification Pending";
});

onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Delivery vehicles & agents / Total delivery agents / Personal details");
});
</script>

<style lang="scss" scoped>
.cd_box {
  min-height: calc(100vh - 245px);
}

.cd_heading {
  text-transform: capitalize;
}

.main_div {
  margin-top: 40px;
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
