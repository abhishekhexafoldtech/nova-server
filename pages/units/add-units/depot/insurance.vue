<template>
    <section v-loading="loading" class="edit_mang_wrap">
      <div class="mang_inner comp_inner">
        <div class="mang_title">
          <h3 class="mb-3">
            Insurance details
          </h3>
          <p>Enter your business insurance details</p>
        </div>
        <div class="w1000">
          <el-form label-position="top" label-width="100px" :model="formData" :rules="formValidationRules" ref="formRef">
            <el-row :gutter="50" class="w854">
              <!--Name of Insurance Company  -->
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Name of Insurance Company" prop="name_of_insurence_company">
                    <el-input v-model="formData.name_of_insurence_company" placeholder="Name of insurance company" />
                  </el-form-item>
                </div>
              </el-col>
  
              <!-- Policy Number -->
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Policy Number" prop="policy_number">
                    <el-input v-model="formData.policy_number" placeholder="Policy number" />
                  </el-form-item>
                </div>
              </el-col>
  
              <!-- insurance card -->
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="comp_form_box phase3_upload">
                  <div class="fieldrow">
                    <p class="frm_label">Insurance Card</p>
                    <SingleFileUpload id="insurance_card" iconClass="iconClass" @getImage="getInsurenceCard" />
                  </div>
                  <p v-if="isUploaded" class="text-danger">
                    Please upload insurance card
                  </p>
                </div>
              </el-col>
  
              <!-- Expiry of insurance -->
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Expiry of Insurance" prop="expiry_of_insurence">
                    <el-date-picker value-format="YYYY-MM-DD" v-model="formData.expiry_of_insurence" type="date"
                      placeholder="Expiry of insurance" size="default" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <div class="comp_footer">
            <el-button class="btn btn-default" @click="handleCancel">Cancel</el-button>
            <el-button class="btn btn-primary" @click="handleSave">Save</el-button>
          </div>
        </div>
      </div>
    </section>
  </template>
    
  <script setup>
  import { ref, reactive, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { flashNotification } from "@/composables/useNotification.js";
  import { nameRule, numberRule } from "@/rules/all-rules";
  import SingleFileUpload from "~/components/upload/SingleFileUpload.vue";
  import { useNavStore } from "@/stores/NavStore";
  const navStore = useNavStore();
  
  const router = useRouter();
  const formRef = ref(null);
  const isUploaded = ref(false);
  //loader
  let loading = ref(false);
  const waiteForResponse = ref(false);
  //company id
  const companyId = ref("");
  
  const formData = reactive({
    name_of_insurence_company: "",
    policy_number: "",
    expiry_of_insurence: "",
    insurence_card: "",
  });
  
  const formValidationRules = reactive({
    name_of_insurence_company: nameRule("the name of insurance company"),
    policy_number: numberRule("the policy number"),
    expiry_of_insurence: nameRule("the expiry of insurance"),
  });
  
  //getInsurenceCard
  const getInsurenceCard = (image) => {
    if (image) {
      isUploaded.value = false;
    } else {
      isUploaded.value = true;
    }
    formData.insurence_card = image.name;
  };
  
  const handleSave = () => {
    //checked all certificates uploaded or not...
    if (
      formData.insurence_card === "" &&
      formRef.value &&
      formRef.value.validate
    ) {
      formRef.value.validate();
      isUploaded.value = true;
    }
  
    if (formRef.value && formRef.value.validate) {
      formRef.value.validate(async (valid) => {
        if (valid && !isUploaded.value) {
          try {
            flashNotification("success", "all ok");
            router.push("/units");
            // successDialog.status = true;
          } catch (error) {
            flashNotification("error", "An error occurred. Please try again.");
          }
        } else {
          flashNotification("warning", "Please fill required fields");
        }
      });
    }
  };
  
  
  
  function handleCancel() {
    router.push("/units");
  }
  
  onMounted(() => {
    navStore.setBreadCrumbs("Units / Add Units / Depot / Insurance details");
  });
  
  
  </script>
    
  <style scoped lang="scss">
  .w1000{
    padding-right: 200px;
  }
  .w854 {
    width: 100%;
    max-width: 854px;
  }
  
  .comp_inner .comp_form_box p {
    font-weight: 600;
  }
  
  .fieldrow {
    margin-bottom: 25px;
  }
  </style>
    