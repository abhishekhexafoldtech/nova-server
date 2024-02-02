<template>
  <div>
        <!-- {{ responseData }} -->
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <div class="prod_heading">
            <h4 class="cd_heading">Owner Details</h4>
            <button @click="handleOwnerDetails">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
          </div>
          <div class="cd_list">
            <div class="cd_item">
              <img :src="UserProfile" alt="icon" />
              <h4>Owner name:<span>{{ owner_details.first_name  }} {{ owner_details.last_name  }}</span></h4>
            </div>

            
            <!-- <div class="cd_item">
              <img :src="District" alt="icon" />
              <h4>District<span>Ghana</span></h4>
            </div> -->
            <div class="cd_item">
              <img :src="Phone" alt="icon" />
              <h4>Phone number:<span>{{ owner_details.phone }}</span></h4>
            </div>
            <!-- <div class="cd_item">
              <img :src="Region" alt="icon" />
              <h4>Region<span>Accra</span></h4>
            </div> -->
            <div class="cd_item">
              <img :src="Email" alt="icon" />
              <h4>Email:<span>{{ owner_details.email }}</span></h4>
            </div>
          </div>

          <div class="mt-5" v-if="props.deliveryAgent">
            <h4 class="cd_heading">Work details</h4>
            <div class="cd_list">
              <div class="cd_item">
                <h4 class="p-0">Work timing:<span>8:00AM - 5:00PM</span></h4>
              </div>
              <div class="cd_item">
                <h4 class="p-0">Delivery Zone:<span>Northern</span></h4>
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
                <nuxt-link class="verify_pending" :to="`/distributor/verify-distributor-${manufacturerNumber}`">
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

          <div class="mt-5 pt-2" v-if="props.deliveryAgent">
            <h4 class="cd_heading">Assigned vehicle details</h4>
            <div class="cd_list">
              <div class="cd_item">
                <h4 class="p-0">Work timing:<span>8:00AM - 5:00PM</span></h4>
              </div>
              <div class="cd_item">
                <h4 class="p-0">Delivery zone:<span>Northern</span></h4>
              </div>
              <div class="cd_item">
                <h4 class="p-0">Color:<span>Black</span></h4>
              </div>
              <div class="cd_item">
                <h4 class="p-0">Model:<span>Mini truck</span></h4>
              </div>
              <div class="cd_item">
                <h4 class="p-0">Passing number:<span>GH02774</span></h4>
              </div>
              <div class="cd_item">
                <h4 class="p-0">Registration number:<span>GH1234</span></h4>
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
import UserProfile from "@/assets/svg/user_profile.svg";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

// Define a ref property for verification status (true for verified, false for pending)
const isVerified = ref(false);

// Use a computed property to determine the text based on the verification status
const verificationStatusText = computed(() => {
  return isVerified.value ? "Verified Successfully" : "Verification Pending";
});

// Prop for the manufacturer number  // props.manufacturerNumber
const manufacturerNumber = 15;

const router = useRouter();

const props = defineProps({
  deliveryAgent: {
    default: false,
    required: false,
  },

  responseData: {
    type: Object,
    default: function () {
      return {};
    }
  },

  owner_details: {
    type: Object,
    default: function () {
      return {};
    }
  },


});
function handleOwnerDetails() {
  router.o_details = {
    ownerName: "Yaw Graham",
    district: "Ghana",
    phoneNumber: "02774000000",
    region: "Accra",
    email: "yawboafo@gmail.com",
    apartment: "agkjhk-ahojhtytgh road",
  };
  router.push("/distributor/edit-owner-details");
}
onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Owner details");
});
</script>

<style lang="scss" scoped>
.prod_heading {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;

  .cd_heading {
    margin: 0;
  }

  button {
    background-color: transparent;
    color: var(--violet);
    font-size: 16px;
    width: 26px;
    height: 26px;
    line-height: 24px;
    padding: 0;
    padding-left: 2px;
    text-align: center;
    border: none;
    border-radius: 3px;
    margin-top: 3px;
    transition: all 200ms ease-in-out;

    &:hover {
      background-color: var(--violet);
      color: var(--white);
    }
  }
}
</style>
