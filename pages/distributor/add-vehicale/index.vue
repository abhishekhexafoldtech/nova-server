<template>
  <section class="edit_mang_wrap">
    <div class="mang_inner comp_inner">
      <div class="mang_title">
        <h3>Please Enter Vehicle Details</h3>
      </div>
      <el-form
        class="white_form"
        label-position="top"
        label-width="100px"
        :model="formData"
        :rules="formValidationRules"
        ref="formRef"
      >
        <el-row class="main_row">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="main_col">
            <h5 class="form_title">Vehicle details</h5>
            <div class="fieldrow">
              <el-form-item prop="vehicleName">
                <el-input
                  placeholder="Vehicle name"
                  v-model="formData.vehicleName"
                />
              </el-form-item>
            </div>

            <div class="fieldrow">
              <el-form-item prop="vehicleId">
                <el-input
                  v-model="formData.vehicleId"
                  placeholder="Vehicle ID"
                />
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item prop="passingNumber">
                <el-input
                  v-model="formData.passingNumber"
                  placeholder="Passing number"
                />
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item prop="capacity">
                <el-input v-model="formData.capacity" placeholder="Capacity" />
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item prop="joinDate">
                <el-input v-model="formData.joinDate" placeholder="Join date" />
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item prop="modelName">
                <el-input
                  v-model="formData.modelName"
                  placeholder="Model name"
                />
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item prop="color">
                <el-input v-model="formData.color" placeholder="Color" />
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item prop="yearOfMake">
                <el-select
                  v-model="formData.yearOfMake"
                  placeholder="Year of make"
                >
                  <el-option label="2011" value="20011" />
                  <el-option label="2012" value="2012" />
                  <el-option label="2013" value="2013" />
                </el-select>
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item prop="regNumber">
                <el-input
                  v-model="formData.regNumber"
                  placeholder="Registration number"
                />
              </el-form-item>
            </div>
            <h5 class="form_title mt-5">Assigned delivery agent</h5>
            <div class="fieldrow">
              <el-form-item prop="slctAgent">
                <el-select v-model="formData.slctAgent" placeholder="Select">
                  <el-option label="agent1" value="agent1" />
                  <el-option label="agent2" value="agent2" />
                  <el-option label="agent3" value="agent3" />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="main_col">
            <h5 class="form_title">Road worthy</h5>
            <div class="fieldrow">
              <el-form-item prop="ExpiryDate">
                <el-input
                  placeholder="Expiry date"
                  v-model="formData.ExpiryDate"
                />
              </el-form-item>
            </div>

            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="comp_form_box add_dist_up m-0">
                  <div class="fieldrow m-0">
                    <el-row :gutter="10">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <p class="subtitle">Front Side</p>
                        <SingleFileUpload
                          iconClass="iconClass"
                          @getImage="getId"
                        />
                      </el-col>

                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <p class="subtitle">Back Side</p>
                        <SingleFileUpload
                          iconClass="iconClass"
                          @getImage="getId"
                        />
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <p v-if="isUpload" class="text-warning">
                  please upload national id details.
                </p>
              </el-col>
            </el-row>

            <h5 class="form_title mt-5">Insurance details</h5>
            <div class="fieldrow">
              <el-form-item prop="company">
                <el-input placeholder="Company" v-model="formData.company" />
              </el-form-item>
            </div>

            <div class="fieldrow">
              <el-form-item prop="policyNumber">
                <el-input
                  v-model="formData.policyNumber"
                  placeholder="Policy number"
                />
              </el-form-item>
            </div>
            <div class="fieldrow">
              <el-form-item prop="insExpiryDate">
                <el-input
                  v-model="formData.insExpiryDate"
                  placeholder="Expiry date"
                />
              </el-form-item>
            </div>

            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="comp_form_box add_dist_up m-0">
                  <div class="fieldrow">
                    <el-row :gutter="10">
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <p class="subtitle">Front Side</p>
                        <SingleFileUpload
                          iconClass="iconClass"
                          @getImage="getId"
                        />
                      </el-col>
                      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <p class="subtitle">Back Side</p>
                        <SingleFileUpload
                          iconClass="iconClass"
                          @getImage="getId"
                        />
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <p v-if="isUpload" class="text-warning">
                  please upload national id details.
                </p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="main_col">
            <h5 class="form_title">Vehicle images</h5>
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="comp_form_box add_dist_up">
                  <div class="fieldrow m-0">
                    <el-row :gutter="10">
                      <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                        <p class="subtitle">Front Side</p>
                        <SingleFileUpload
                          iconClass="iconClass"
                          @getImage="getId"
                        />
                      </el-col>

                      <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                        <p class="subtitle">Back Side</p>
                        <SingleFileUpload
                          iconClass="iconClass"
                          @getImage="getId"
                        />
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <p v-if="isUpload" class="text-warning">
                  please upload national id details.
                </p>
              </el-col>
            </el-row>

            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="comp_form_box add_dist_up m-0">
                  <div class="fieldrow">
                    <el-row :gutter="10">
                      <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                        <p class="subtitle">Side 1</p>
                        <SingleFileUpload
                          iconClass="iconClass"
                          @getImage="getId"
                        />
                      </el-col>

                      <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="11">
                        <p class="subtitle">Side 2</p>
                        <SingleFileUpload
                          iconClass="iconClass"
                          @getImage="getId"
                        />
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <p v-if="isUpload" class="text-warning">
                  please upload national id details.
                </p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <div class="comp_footer">
        <RouterLink class="btn btn-default" to="/product">Cancel</RouterLink>
        <el-button class="btn btn-primary" @click="handleSave"
          >Save & continue</el-button
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification";
import SingleFileUpload from "@/components/upload/SingleFileUpload.vue";
import {
  nameRule,
  selectBoxRule,
  numberRule,
  dateRule,
} from "@/rules/all-rules";

// Define the form data with initial values
const formData = reactive({
  vehicleName: "", // Initialize with an empty string
  vehicleId: "", // Initialize with an empty string
  passingNumber: "", // Initialize with an empty string
  capacity: "", // Initialize with an empty string
  joinDate: "", // Initialize with an empty string
  modelName: "", // Initialize with an empty string
  color: "", // Initialize with an empty string
  yearOfMake: "", // Initialize with an empty string
  regNumber: "", // Initialize with an empty string
  slctAgent: "", // Initialize with an empty string
  ExpiryDate: "", // Initialize with an empty string
  company: "", // Initialize with an empty string
  policyNumber: "", // Initialize with an empty string
  insExpiryDate: "", // Initialize with an empty string
  imageUrls: [], // Initialize as an empty array to store image URLs
});

// Define a flag to show or hide error messages
const showErrorMessage = ref(true);
// Reference to the form element
const formRef = ref(null);

const handleImageUploaded = (boxes) => {
  // Access the updated data from the child component
  // You can update the imageUrls array here with the updated data
  formData.imageUrls = boxes.map((box) => box.image);
};

// Define form validation rules
const formValidationRules = reactive({
  vehicleName: nameRule("vehicle name"),
  vehicleId: nameRule("vehicle id"),
  passingNumber: numberRule("Passing number"),
  capacity: numberRule("Capacity"),
  joinDate: dateRule("Join date"),
  modelName: nameRule("Model name"),
  color: nameRule("Color"),
  company: nameRule("Company"),
  yearOfMake: dateRule("Year of make"),
  regNumber: numberRule("Registration number"),
  slctAgent: selectBoxRule("Agent"),
  ExpiryDate: dateRule("Expiry date"),
  insExpiryDate: dateRule("Insaurance Expiry date"),
  policyNumber: numberRule("Policy number"),
});

// Handle form submission
const handleSave = () => {
  formRef.value.validate((valid) => {
    let val = showErrorMessage.value;
    console.log("Form submitted:", JSON.stringify(formData));
    if (valid && val === false) {
      // Form is valid, do something with the data
      console.log("Form submitted:", JSON.stringify(formData));
      if (true) {
        flashNotification("success", "Add Successfully");
        const router = useRouter();
        router.push("/ditributor");
      } else {
        flashNotification("error", "Something went wrong");
      }
    }
  });

  if (
    formData.imageUrls.length === 0 ||
    formData.imageUrls.some((url) => !url)
  ) {
    showErrorMessage.value = true;
    return false;
  } else {
    // At least one image is missing
    showErrorMessage.value = false;
  }
};

watch(
  () => formData.imageUrls,
  (newImageUrls) => {
    const isAllImagesUploaded = newImageUrls.every((url) => url);
    if (isAllImagesUploaded) {
      // All images have been uploaded
      showErrorMessage.value = false;
    } else {
      // At least one image is missing
      showErrorMessage.value = true;
    }
  }
);
</script>

<style scoped lang="scss">
.edit_mang_wrap {
  padding: 55px 25px;
}

.fieldrow {
  margin-bottom: 25px;
}

.main_row {
  margin: 0 -20px;

  .main_col {
    padding: 0 20px;
  }
}

.el-select .el-input {
  width: 100%;
}

.form_title {
  color: var(--black);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21.92px;
  letter-spacing: -0.8px;
  margin: 0;
  margin-bottom: 15px;
}

.subtitle {
  margin-bottom: 15px !important;
}
</style>
