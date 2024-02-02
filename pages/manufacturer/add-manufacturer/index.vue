<template>
  <section class="edit_mang_wrap">
    <div class="mang_inner comp_inner">
      <div class="mang_title">
        <h3>Manufacturer details</h3>
        <p>Enter your business details</p>
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
              <!-- Company Name -->
              <div class="fieldrow">
                <el-form-item label="Company Name" prop="company_name">
                  <el-input
                    v-model="formData.company_name"
                    placeholder="Company Name"
                  />
                </el-form-item>
              </div>

              <!-- Company Registration Number -->
              <div class="fieldrow">
                <el-form-item
                  label="Company Registration Number"
                  prop="company_registration_number"
                >
                  <el-input
                    v-model="formData.company_registration_number"
                    placeholder="Company registration number"
                  />
                </el-form-item>
              </div>

              <!-- Country Origin -->
              <div class="fieldrow">
                <el-form-item label="Country Origin" prop="country_origin">
                  <el-select
                    v-model="formData.country_origin"
                    filterable
                    placeholder="Select Country"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <!-- Address -->
              <div class="fieldrow">
                <el-form-item label="Address" prop="address">
                  <el-input v-model="formData.address" placeholder="Address" />
                </el-form-item>
              </div>

              <!-- Phone Number -->
              <div class="fieldrow">
                <el-form-item label="Phone number" prop="phone_number">
                  <el-input
                    v-model="formData.phone_number"
                    placeholder="Phone number"
                  />
                </el-form-item>
              </div>

              <!-- Email -->
              <div class="fieldrow">
                <el-form-item label="E mail ID" prop="email">
                  <el-input
                    v-model="formData.email"
                    placeholder="Email"
                    type="email"
                  />
                </el-form-item>
              </div>

              <!-- Manufacture Cylinder -->
              <div class="fieldrow">
                <el-form-item
                  label="Manufacture Cylinder"
                  prop="manufacture_cylinder"
                >
                  <el-select
                    v-model="formData.manufacture_cylinder"
                    filterable
                    placeholder="Manufacture Code"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <!-- Cylinder Size -->
              <div class="fieldrow">
                <el-form-item label="Cylinder Size" prop="cylinder_size">
                  <el-select
                    v-model="formData.cylinder_size"
                    filterable
                    placeholder="Select Cylinder Suply Category"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <!-- Cylinder types -->
              <div class="fieldrow manufacture_check">
                <el-form-item label="Cylinder Types" prop="cylinder_types">
                  <el-select
                    v-model="formData.cylinder_types"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    :reserve-keyword="false"
                    placeholder="Choose tags for your article"
                  >
                    <el-option
                      v-for="item in formData.cylinder_types_content"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <div class="comp_form_box add_dist_up w355">
            <!-- Certificate of Registration -->
            <div class="fieldrow">
              <p>ISO Certificate</p>
              <SingleFileUpload
                iconClass="iconClass"
                @getImage="getCertificateOfregistration"
              />
            </div>
            <p v-if="isRegistrationUploaded" class="text-warning">
              please upload Certificate of Registration.
            </p>
          </div>
        </el-col>
      </el-row>
      <!-- cancel and save button -->
      <div class="comp_footer">
        <nuxt-link class="btn btn-default" @click="handleCancel"
          >Cancel</nuxt-link
        >
        <button class="btn btn-primary" @click="handleSave">Save</button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
import {
  nameRule,
  numberRule,
  emailRule,
  selectBoxRule,
} from "@/rules/all-rules";
import SingleFileUpload from "@/components/upload/SingleFileUpload.vue";

const router = useRouter();
const formRef = ref(null);

//validation values for certificate
const isRegistrationUploaded = ref(false);

//form data
const formData = reactive({
  company_name: "",
  company_registration_number: "",
  country_origin: "",
  address: "",
  phone_number: "",
  email: "",
  manufacture_cylinder: "",
  cylinder_size: "",
  ios_certificate: {},
  cylinder_types: [],
  cylinder_types_content: ["3kg", "6kg", "12kg"],
});
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
//validation rules
const formValidationRules = reactive({
  company_name: nameRule("company name"),
  company_registration_number: numberRule("company registration number"),
  country_origin: nameRule("country origin"),
  address: nameRule("address"),
  phone_number: numberRule("phone number"),
  email: emailRule("email"),
  manufacture_cylinder: nameRule("manufacture cylinder"),
  cylinder_size: nameRule("cylinder size"),
  cylinder_types: selectBoxRule("cylinder types"),
});
//getCertificateOfregistration
const getCertificateOfregistration = (image) => {
  if (image) {
    formData.ios_certificate = image;
    isRegistrationUploaded.value = false;
  } else {
    isRegistrationUploaded.value = true;
  }
};
//call api with form data
const handleSave = () => {
  if (!Object.keys(formData.ios_certificate).length) {
    formRef.value.validate();
    isRegistrationUploaded.value = true;
    return;
  }
  //call api with the form data
  formRef.value.validate(async (valid) => {
    if (
      Object.keys(formData.ios_certificate).length &&
      formData.certificate_of_commencement !== "" &&
      valid
    ) {
      try {
        // Perform data submission logic here
        let r = "manufacturer";
        router.push(`/${r}`);
        flashNotification("success", "manufacturer details added successfully");
      } catch (error) {
        flashNotification("error", "An error occurred. Please try again.");
      }
    } else {
      flashNotification("warning", "Please fill required fields");
    }
  });
};
const handleCancel = () => {
  router.push("/manufacturer");
  formData = {
    company_name: "",
    company_registration_number: "",
    country_origin: "",
    address: "",
    phone_number: "",
    email: "",
    manufacture_cylinder: "",
    cylinder_size: "",
    ios_certificate: {},
    cylinder_types: [],
  };
};
definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.comp_inner .comp_form_box .fieldrow {
  margin-bottom: 25px;
}

.comp_inner .comp_form_box p {
  font-size: 16px;
}
</style>
