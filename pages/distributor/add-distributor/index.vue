<template>
  <section v-loading="loading" class="edit_mang_wrap">
    <div class="mang_inner add_admin">
      <div class="mang_title">
        <h3>Add distributor</h3>
        <p>Enter your details</p>
      </div>
      <!-- form -->
      <el-form
        :model="newDistributorForm"
        :rules="newDistributorFormRoles"
        ref="formRef"
        label-position="top"
        label-width="100px"
        size="large"
      >
        <el-row :gutter="25">
          <!-- First Name -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow">
              <el-form-item
                v-if="newDistributorForm"
                label="First Name"
                prop="first_name"
              >
                <el-input
                  placeholder="First name"
                  v-model="newDistributorForm.first_name"
                />
              </el-form-item>
            </div>
          </el-col>

          <!-- Last Name -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow">
              <el-form-item
                v-if="newDistributorForm"
                label="Last Name"
                prop="last_name"
              >
                <el-input
                  placeholder="Last name"
                  v-model="newDistributorForm.last_name"
                />
              </el-form-item>
            </div>
          </el-col>

          <!-- Phone Number -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow">
              <el-form-item
                v-if="newDistributorForm"
                label="Phone Number"
                prop="phone"
              >
                <el-input
                  type="number"
                  placeholder="Phone number"
                  v-model="newDistributorForm.phone"
                />
              </el-form-item>
            </div>
          </el-col>

          <!-- Email -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow">
              <el-form-item
                v-if="newDistributorForm"
                label="Email"
                prop="email"
              >
                <el-input
                  type="email"
                  placeholder="Email"
                  v-model="newDistributorForm.email"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="perm_footer">
        <el-button class="btn btn-default" @click="handleCancel"
          >Cancel</el-button
        >
        <el-button
          class="btn btn-primary"
          type="primary"
          @click="handleSubmit(formRef)"
          >Continue</el-button
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { flashNotification } from "@/composables/useNotification.js";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  nameRule,
  phoneNoRule,
  emailRule,
  selectBoxRule,
} from "@/rules/all-rules";
import { addNewDistributor } from "@/api/distributor/add-distributor";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
const router = useRouter();
const formRef = ref();
let loading = ref(false);

//stop multiple api request
const waiteForResponse = ref(false);

//form data
const newDistributorForm = reactive({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  // role: "",
});

// handleSubmit
function handleSubmit(formEl) {
  if (waiteForResponse.value) {
    return;
  }
  if (!formEl) {
    return;
  }
  formEl.validate(async (valid) => {
    if (valid) {
      const phone = newDistributorForm.phone;
      newDistributorForm.phone = `+233${phone}`;
      loading.value = true;
      // try catch block
      waiteForResponse.value = true;
      await addNewDistributor(newDistributorForm)
        .then((res) => {
          // console.log(res); sess
          if (res.status === 201) {
            flashNotification(
              "success",
              `New distributor ${newDistributorForm.first_name} is successfully added.`
            );
            //set id in session storage
            sessionStorage.setItem("dist_id", res.data.id);
            //send otp data
            router.distributor_otp_data = {
              country_code: "+233",
              phone: newDistributorForm.phone,
              email: newDistributorForm.email,
            };
            router.push("/distributor/add-distributor/otp");
          }
          loading.value = false;
        })
        .catch((error) => {
          waiteForResponse.value = false;
          if (error.response.status === 422) {
            flashNotification(
              "warning",
              `${error.response.data.error_message}`
            );
          }
          // if email already exists
          else if (error.response.status === 400) {
            if (error.response.data.error_message.includes("email")) {
              flashNotification(
                "warning",
                `${newDistributorForm.email} already exists`
              );
            }
            // if phone already exists
            else if (error.response.data.error_message.includes("phone")) {
              flashNotification(
                "warning",
                `${newDistributorForm.phone} already exists`
              );
            } else {
              flashNotification("warning", "Something went wrong");
            }
          }
          loading.value = false;
        });
    } else {
      flashNotification("warning", "Please fill required fields");
      return false;
    }
  });
}

//handle cancel
function handleCancel() {
  const form = newDistributorForm;
  if (
    form.first_name.length ||
    form.last_name.length ||
    form.phone ||
    form.email
  ) {
    flashNotification("warning", "Entered data for new distributor is lost.");
  }
  router.push("/distributor");
}

// newDistributorFormRoles
const newDistributorFormRoles = reactive({
  first_name: nameRule("first name"),
  last_name: nameRule("last name"),
  phone: phoneNoRule("phone"),
  email: emailRule("email"),
  // role: selectBoxRule("role for distributor"),
});

onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Add distributor");
});

// definePageMeta({
//   layout: "default",
// });
</script>

<style scoped lang="scss">
.fieldrow {
  margin-bottom: 20px;
}
</style>
