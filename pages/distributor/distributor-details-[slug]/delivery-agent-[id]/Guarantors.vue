<template>
  <section>
    <h4 class="page_heading my-4">Guarantors</h4>
    <el-row class="kpi_card_wrap">
      <el-col class="cards" :xs="24" :sm="10" :md="7" :lg="7">
        <PlaneKpiCard @click="fetchApiData('guarantor1')" :class="[selectedApi === 'guarantor1' ? 'active-card' : '']"
          :caption="firstGuarantor.Caption" label="Name: " labelValue="abishek"
          :icon="firstGuarantor.icon" />
      </el-col>

      <!-- <el-col class="cards ms-md-4" :xs="24" :sm="10" :md="7" :lg="7">
        <PlaneKpiCard @click="fetchApiData('guarantor2')" :class="[selectedApi === 'guarantor2' ? 'active-card' : '']"
          :caption="secondGuarantor.Caption" label="Name: " :labelValue="secondGuarantor.name"
          :icon="secondGuarantor.icon" />
      </el-col> -->
    </el-row>

    <!-- {{ guarantor_location }} -->

    <div class="mt-5">
      <el-row :gutter="30" class="main_row">
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="cd_box">
            <h4 class="cd_heading">{{ selectedGuarantor.Caption }}</h4>
            <div>
              <!-- <h4 class="cd_heading">License details</h4> -->
              <div class="cd_list">
                <div class="cd_item">
                  <h4 class="p-0">
                    <!-- Name of guarantor :<span>{{ selectedGuarantor.name }}</span> -->
                    Name of guarantor :<span v-if="guarantor_personal_details">
                    <span v-if="guarantor_personal_details[0]">
                      {{ guarantor_personal_details[0].first_name }}
                    </span>
                    </span>

                  </h4>
                </div>
                <br />
                <div class="cd_item">
                  <h4 class="p-0">
                    <!-- Phone number :<span>{{
                      selectedGuarantor.phone_number
                    }}</span> -->
                    Phone number :<span v-if="guarantor_personal_details">
                    <span v-if="guarantor_personal_details[0]">
                      {{ guarantor_personal_details[0].phone }}
                    </span>
                    </span>
                  </h4>
                </div>
                <br />
                <div class="cd_item">
                  <h4 class="p-0">
                    <!-- Address :<span>{{ selectedGuarantor.address }}</span> -->
                    Address :<span v-if="guarantor_location">
                      <span v-if="guarantor_location[0]">
                        {{ guarantor_location[0].street }} {{ guarantor_location[0].area }}
                        {{ guarantor_location[0].region }} {{ guarantor_location[0].district }}
                        {{ guarantor_location[0].postal_code }}
                      </span>
                    </span>

                  </h4>
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
                  <span>Certificate of registration</span>
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
                  <span>Insurance card</span>
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
  </section>
</template>
<script setup>
import PlaneKpiCard from "@/components/cards/planeKpiCard.vue";
import Guarantor from "@/assets/svg/guarantor.svg";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const selectedApi = ref(null);

const props = defineProps({

personal_details: {
  type: Object,
  default: function () {
    return {};
  }
},

guarantor_location: {
  type: Object,
  default: function () {
    return {};
  }
},

guarantor_personal_details: {
  type: Object,
  default: function () {
    return {};
  }
},


});


const firstGuarantor = {
  name: "Yaw Graham",
  phone_number: "0254854000",
  icon: Guarantor,
  Caption: "First guarantor",
  address: "Agbogba-ashongman road",
};
const secondGuarantor = {
  name: "Aadan Bamidele",
  phone_number: "0288844000",
  icon: Guarantor,
  Caption: "Second guarantor",
  address: "Chongoi-bhabum",
};

const selectedGuarantor = ref(firstGuarantor);

// Define a ref property for verification status (true for verified, false for pending)
const isVerified = ref(false);

// Use a computed property to determine the text based on the verification status
const verificationStatusText = computed(() => {
  return isVerified.value ? "Verified Successfully" : "Verification Pending";
});

const fetchApiData = (name) => {
  selectedApi.value = name;
  if (name === "guarantor1") {
    selectedGuarantor.value = firstGuarantor;
  } else if (name === "guarantor2") {
    selectedGuarantor.value = secondGuarantor;
  }
};

onMounted(() => {
  navStore.setBreadCrumbs(
    "Distributor / Delivery vehicles & agents / Total delivery agents / Guarantors"
  );
});
</script>

<style scoped lang="scss">
@media (max-width: 992px) {
  .main_row {
    gap: 30px;
  }

  .cd_box {
    min-height: auto;
  }
}
</style>
