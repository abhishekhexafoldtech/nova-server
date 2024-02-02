<template>
    <div>
      <section class="edit_mang_wrap">
        <div class="mang_inner comp_inner">
          <div class="mang_title">
            <h3>Add Units</h3>
          </div>
          <el-row :gutter="50">
            <el-col :xs="24" :sm="24" :md="12" :lg="11" :xl="11">
              <el-form
                label-position="top"
                label-width="100px"
                :model="formData"
                :rules="formValidationRules"
                ref="formRef"
              >
                <div class="comp_form_box">
                  <!-- select units type -->
                  <div class="fieldrow">
                    <el-form-item
                      v-if="formData"
                      label="Select Units Type"
                      prop="unit_types"
                    >
                      <el-select
                        v-model="formData.unit_types"
                        placeholder="Select units type"
                        @change="getUnitTypeValue"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
  
                  <!-- Name Of Exchange Point -->
                  <div class="fieldrow">
                    <el-form-item
                      v-if="formData"
                      label="Name of Exchange Point"
                      prop="name_of_exchange_point"
                    >
                      <el-input
                        v-model="formData.name_of_exchange_point"
                        placeholder="Name of exchange point"
                      />
                    </el-form-item>
                  </div>
  
                  <!-- Exchange point phone number -->
                  <div class="fieldrow">
                    <el-form-item
                      v-if="formData"
                      label="Exchange Point Phone Number"
                      prop="exchange_point_phone_number"
                    >
                      <el-input
                        v-model="formData.exchange_point_phone_number"
                        placeholder="Exchange point phone number"
                      />
                    </el-form-item>
                  </div>
  
                  <!-- Exchange Point email -->
                  <div class="fieldrow">
                    <el-form-item
                      v-if="formData"
                      label="Exchange Point Email"
                      prop="exchange_point_email"
                    >
                      <el-input
                        v-model="formData.exchange_point_email"
                        placeholder="Exchange point email"
                      />
                    </el-form-item>
                  </div>
  
                  <!-- Area -->
                  <div class="fieldrow">
                    <el-form-item v-if="formData" label="Area" prop="area">
                      <el-input v-model="formData.area" placeholder="Area" />
                    </el-form-item>
                  </div>
  
                  <!-- Region -->
                  <div class="fieldrow">
                    <el-form-item v-if="formData" label="Region" prop="region">
                      <el-input v-model="formData.region" placeholder="Region" />
                    </el-form-item>
                  </div>
  
                  <!-- District -->
                  <div class="fieldrow">
                    <el-form-item
                      v-if="formData"
                      label="District"
                      prop="district"
                    >
                      <el-input
                        v-model="formData.district"
                        placeholder="District"
                      />
                    </el-form-item>
                  </div>
  
                  <!-- Post Code -->
                  <div class="fieldrow">
                    <el-form-item
                      v-if="formData"
                      label="Post Code"
                      prop="post_code"
                    >
                      <el-input
                        v-model="formData.post_code"
                        placeholder="Post code"
                      />
                    </el-form-item>
                  </div>
  
                  <!-- zone -->
                  <div class="fieldrow">
                    <el-form-item v-if="formData" label="Zone" prop="zone">
                      <el-input v-model="formData.zone" placeholder="zone" />
                    </el-form-item>
                  </div>
                </div>
  
                <!-- GPS address -->
                <div class="comp_form_box">
                  <h5 class="cf_title">Enter your location’s GPS address</h5>
                  <div class="fieldrow">
                    <el-form-item
                      v-if="formData"
                      label="GPS Address"
                      prop="gps_address"
                    >
                      <el-input
                        v-model="formData.gps_address"
                        placeholder="GPS address"
                      />
                    </el-form-item>
                  </div>
                  <img class="gh_post" :src="GhanaPost" alt="GhanaPost" />
                </div>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="comp_form_box add_dist_up w355">
                <!-- Proof of ownership/ Tenany -->
                <div class="fieldrow">
                  <p>Proof of Ownership / Tenancy</p>
                  <SingleFileUpload
                    id="proof_of_tenancy"
                    iconClass="iconClass"
                    @getImage="getProofOfTenancy"
                  />
                </div>
                <p v-if="isProofOfTenancyUploaded" class="text-warning">
                  Please upload Proof Of Tenancy.
                </p>
              </div>
            </el-col>
          </el-row>
          <!-- cancel and save button -->
          <div class="comp_footer">
            <el-button class="btn btn-default" @click="handleCancel"
              >Cancel</el-button
            >
            <button class="btn btn-primary" @click="handleSave">Save</button>
          </div>
        </div>
      </section>
    </div>
  </template>
  <script setup>
  import { ref, reactive, onMounted, defineEmits } from "vue";
  import { useRouter } from "vue-router";
  import { flashNotification } from "@/composables/useNotification.js";
  import {
    nameRule,
    numberRule,
    gpsCoordinatesRule,
    selectBoxRule,
  } from "@/rules/all-rules";
  import SingleFileUpload from "@/components/upload/SingleFileUpload.vue";
  import GhanaPost from "@/assets/svg/ghanapost.svg";
  import { useNavStore } from "@/stores/NavStore";
  const navStore = useNavStore();
  const emit = defineEmits();
  const router = useRouter();
  const formRef = ref(null);
  
  const options = ref(["Depot", "Exchange point"]);
  
  const isProofOfTenancyUploaded = ref(false);
  
  //form data
  const formData = reactive({
    unit_types: "Exchange point",
    name_of_exchange_point: "",
    exchange_point_phone_number: "",
    exchange_point_email: "",
    area: "",
    region: "",
    district: "",
    post_code: "",
    zone: "",
    gps_address: "",
    proof_of_tenancy: "",
  });
  
  //validation rules
  const formValidationRules = reactive({
    unit_types: selectBoxRule("unit type"),
    name_of_exchange_point: nameRule("name of exchange point"),
    exchange_point_phone_number: nameRule("exchange point phone number"),
    exchange_point_email: nameRule("exchange point email"),
    area: nameRule("the area"),
    region: nameRule("the region"),
    district: nameRule("the district"),
    post_code: numberRule("the post code"),
    zone: nameRule("the zone"),
    gps_address: gpsCoordinatesRule("the gps address"),
    // Add more validation rules as needed...
  });
  
  //getProofOfTenancy
  const getProofOfTenancy = (image) => {
    if (image) {
      formData.proof_of_tenancy = image;
      isProofOfTenancyUploaded.value = false;
    } else {
      isProofOfTenancyUploaded.value = true;
    }
  };
  
  //call api with form data
  const handleSave = () => {
    router.push(`/units/add-units/exchange-point/insurance`);
  
    if (
      formData.proof_of_tenancy === "" &&
      formRef.value &&
      formRef.value.validate
    ) {
      formRef.value.validate();
      isProofOfTenancyUploaded.value = true;
    }
    //call api with the form data
    if (formRef.value && formRef.value.validate) {
      formRef.value.validate(async (valid) => {
        if (valid) {
          console.log("ok");
        }
      });
    }
  };
  
  const getUnitTypeValue = (value) => {
    console.log(value)
    if ((value == "Exchange point")) {
      router.push(`/units/add-units/exchange-point`);
    } else if ((value == "Depot")) {
      router.push(`/units/add-units/depot`);
    }
    // emit("setUnitType", val);
  };
  
  function handleCancel() {
    // router.push(``);
  }
  
  //onMounted called
  onMounted(async () => {
    navStore.setBreadCrumbs("Units / Add units / Exchange point");
  });
  
  // definePageMeta({
  //   layout: "default",
  // });
  </script>
  
  <style scoped lang="scss">
  .comp_inner .comp_form_box .fieldrow {
    margin-bottom: 25px;
  }
  </style>
  