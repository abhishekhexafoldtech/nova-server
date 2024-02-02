<template>
  <div>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <div class="prod_heading">
            <h4 class="cd_heading">{{ heading }}</h4>
            <button @click="handlePersonalDetails">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
          </div>
          <div class="cd_list" v-if="!admin">
            <div class="cd_item">
              <img :src="Calender" alt="icon" />
              <h4>Joining Date:<span>{{details?.joining_date}}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Location" alt="icon" />
              <h4>Address:<span>{{details?.address_name}}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Phone" alt="icon" />
              <h4>Phone number:<span>{{details.phone}}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="District" alt="icon" />
              <h4>District:<span>{{details.district}}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Email" alt="icon" />
              <h4>Email:<span>{{details.email}}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Region" alt="icon" />
              <h4>Region:<span>{{details.region}}</span></h4>
            </div>
            <!-- <div class="cd_item">
              <img :src="Zone" alt="icon" />
              <h4>Zone:<span>Northern</span></h4>
            </div> -->
          </div>

          <slot name="leftpart1"></slot>

          <div class="cd_list" v-if="(admin && admin_details) || (admin && admin_address)">
            <div class="cd_item" v-for="(value, key) in data">
              <h4 class="ps-0">
                {{ key }}<span>{{ value }}</span>
              </h4>
            </div>
          </div>

          <div class="mt-5 pt-2" v-if="props.deliveryAgent">
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
      <el-col :xs="24" :sm="24" :md="12" :lg="12" v-if="right">
        <div class="cd_box">
          <h4 class="cd_heading">Uploaded documents</h4>
          <div class="up_doc">
            <div class="doc_item">
              <img :src="props.details?.documents?.front_document_url" :alt="props.details?.documents.front_document_name" @error="handleImageError('front_doc')"/>
              <img v-if="props.details?.documents?.document_name=='ghana_card'" :src="props.details?.documents.back_document_url" :alt="props.details?.documents?.document_name" @error="handleImageError('back_doc')"/>
              <h4>
                <span>{{ props.details?.documents?.document_name?.split("_").join(" ") }}</span>
                Uploaded on {{ props.details?.documents?.created_at?.split("T")[0].split("-").join("/")}}
              </h4>
              <template v-if="!isVerified">
                <nuxt-link class="verify_pending" v-if="props.deliveryAgent" :to="`/delivery/verify-agent-${customerId}`">
                  {{ verificationStatusText }}
                </nuxt-link>
                <nuxt-link class="verify_pending" v-else :to="`/customers/verify-customer-${customerId}`">
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
import {
  Calendar,
  PhoneFilled,
  MapLocation,
  ChatDotSquare,
  Place,
} from "@element-plus/icons-vue";
import District from "@/assets/svg/district.svg";
import Email from "@/assets/svg/email.svg";
import Location from "@/assets/svg/location.svg";
import Region from "@/assets/svg/region.svg";
import Zone from "@/assets/svg/zone.svg";
import Calender from "@/assets/svg/calender.svg";
import Phone from "@/assets/svg/phone.svg";

const customerId = 51161;
const router = useRouter();
// Define a ref property for verification status (true for verified, false for pending)
const isVerified = ref(false);

// Use a computed property to determine the text based on the verification status
const verificationStatusText = computed(() => {
  return isVerified.value ? "Verified Successfully" : "Verification Pending";
});

const props = defineProps({
  details: {
    type: Object,
    default: {}
  },
  deliveryAgent: {
    default: false,
    required: false,
  },
  admin: {
    required: false,
    default: false,
    type: Boolean,
  },
  admin_details: {
    required: false,
    default: false,
    type: Boolean,
  },
  admin_address: {
    required: false,
    default: false,
    type: Boolean,
  },
  right: {
    type: Boolean,
    default: true,
    required: false,
  },
  heading: {
    type: String,
    required: false,
    default: "Personal Details",
  },
  data: {
    required: false,
    default: {},
    type: Object,
  },
});

watch(props, async()=>{
  console.log(props.details)
})

function handlePersonalDetails() {
  if (router.distributor) {
    router.p_details = {
      name: "Yaw boafo",
      email: "yawboafo@gmail.com",
      phoneNumber: "02774000",  
      apartment: "ahgought-ashgotham road",
      area: "Accra",
      rigion: "Accra",
      district: "Ghana",
      post_code: "GA",
      dateOfBirth: "2003-05-06",
    };
    router.push(`/distributor/edit-personal-details`);
    delete router.distributor;
  }
}
function handleImageError(data){
  if(data === 'front_doc'){
    props.details.documents.front_document_url = "https://via.placeholder.com/300x200"
  }
  if(data === "back_doc"){
    props.details.documents.back_document_url = "https://via.placeholder.com/300x200"
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 992px) {
  .cd_box {
    height: 100%;
  }
}

.cd_heading {
  text-transform: capitalize;
}

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
