<template>
  <div>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <h4 class="cd_heading">Company details</h4>
          <div class="cd_list">
            <div class="cd_item">
              <img :src="companyReg" alt="icon" />
              <h4>Company registration no:<span>A10123</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Location" alt="icon" />
              <h4>Address:<span>Agbogba-ashongman road</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Calender" alt="icon" />
              <h4>Joining date:<span>2020/12/15</span></h4>
            </div>
            <div class="cd_item">
              <img :src="District" alt="icon" />
              <h4>District<span>Ghana</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Phone" alt="icon" />
              <h4>Phone number:<span>0277400000</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Region" alt="icon" />
              <h4>Region:<span>Accra</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Email" alt="icon" />
              <h4>Email:<span>yawboafo@gmail.com</span></h4>
            </div>
            <div class="cd_item">
              <img :src="country" alt="icon" />
              <h4>Country:<span>Ghana</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Zone" alt="icon" />
              <h4>Zone<span>Northern</span></h4>
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
                <span>ISO certificate</span>
                Uploaded on 11/08/2023
              </h4>
              <template v-if="!isVerified">
                <nuxt-link class="verify_pending" :to="`/manufacturer/verify-manufacturer-${manufacturerNumber}`">
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
import District from "@/assets/svg/district.svg";
import country from "@/assets/svg/country.svg";
import companyReg from "@/assets/svg/companyReg.svg";
import Email from "@/assets/svg/email.svg";
import Location from "@/assets/svg/location.svg";
import Region from "@/assets/svg/region.svg";
import Zone from "@/assets/svg/zone.svg";
import Calender from "@/assets/svg/calender.svg";
import Phone from "@/assets/svg/phone.svg";

// Define a ref property for verification status (true for verified, false for pending)
const isVerified = ref(false);

// Use a computed property to determine the text based on the verification status
const verificationStatusText = computed(() => {
  return isVerified.value ? 'Verified Successfully' : 'Verification Pending';
});

// Prop for the manufacturer number  // props.manufacturerNumber
const manufacturerNumber = 15;


</script>