<template>
  <section v-loading="loading" class="edit_mang_wrap">
    <div class="mang_inner add_admin">
      <div class="mang_title">
        <h3>Add New Admin</h3>
        <p>Enter your details</p>
      </div>
      <el-form
        ref="form"
        label-position="top"
        label-width="100px"
        :model="formData"
        size="large"
        :rules="formRules"
      >
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow w455 mar15">
              <el-form-item
                v-if="formData"
                label="First Name"
                prop="first_name"
              >
                <el-input
                  class="form_input"
                  v-model="formData.first_name"
                  placeholder="First name"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow w455 mar15">
              <el-form-item v-if="formData" label="Last Name" prop="last_name">
                <el-input
                  class="form_input"
                  v-model="formData.last_name"
                  placeholder="Last name"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow w455 mar15">
              <el-form-item v-if="formData" label="Phone Number" prop="phone">
                <el-input
                  type="number"
                  class="form_input"
                  v-model="formData.phone"
                  placeholder="Phone number"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow w455 mar15">
              <el-form-item v-if="formData" label="Email" prop="email">
                <el-input
                  class="form_input"
                  v-model="formData.email"
                  placeholder="Email"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="fieldrow w455">
              <el-form-item v-if="formData" label="Role" prop="role_id">
                <el-select
                  class="form_input"
                  v-model="formData.role_id"
                  placeholder="please select role"
                >
                  <el-option
                    v-for="item in roles"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="perm_footer">
        <el-button class="btn btn-default" @click="handleCancel"
          >Cancel</el-button
        >
        <el-button class="btn btn-primary" @click="handleSubmit"
          >Continue</el-button
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/authStore";
import { flashNotification } from "@/composables/useNotification.js";
import { addNewAdmin } from "@/api/admin";
import { getRoleDropdownList } from "@/api/role";
import {
  nameRule,
  phoneNoRule,
  emailRule,
  selectBoxRule,
} from "@/rules/all-rules";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
let loading = ref(false);
const form = ref(null);
const router = useRouter();
const AuthStore = useAuthStore();
const roles = ref({});
const formData = reactive({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  role_id: "",
});

let listQueryRole = {
  is_deleted: false,
};

// submit form data
const handleSubmit = async () => {
  form.value.validate((valid) => {
    if (valid) {
      const phone = formData.phone;
      formData.phone = `+233${phone}`;
      loading.value = true;
      addNewAdmin({ ...formData })
        .then((response) => {
          if (response.status == 201) {
            flashNotification("success", "Admin added successfully.");
            router.admin_data = {
              phone: phone,
              email: formData.email,
            };
            router.push("/onboarding/add-admin/otp");
          } else if (response.status == 400) {
            flashNotification(
              "warning",
              "User may already exists please check the input fileds again.."
            );
          } else {
            // console.log("response")
          }
          console.log("errr", error.responce.data.error_message);
          loading.value = false;
        })
        .catch((error) => {
          loading.value = false;
          if (error.response.data.error === "ValidationException") {
            flashNotification("warning", error.response.data.error_message);
            return;
          }
          const errType = error.response.data.error_message
            .split("Key")[1]
            .split("(")[1]
            .split(")")[0];
          if (errType === "phone" || errType === "email") {
            flashNotification(
              "warning",
              `${formData[errType]} already exists told u though.`
            );
            return;
          }
          flashNotification(
            "warning",
            `Something went wrong, please try later. `
          );
        });
    } else {
      flashNotification("warning", "Please fill required fields");
    }
  });
};

// get all roles for select role dropdown
function getAdminRoles() {
  getRoleDropdownList(listQueryRole)
    .then((response) => {
      roles.value = response.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

const handleCancel = () => {
  router.push("/onboarding");
};

// rules for validation
const formRules = {
  first_name: nameRule("first name"),
  last_name: nameRule("last name"),
  phone: phoneNoRule("phone"),
  email: emailRule("email"),
  role_id: selectBoxRule("role for admin"),
};

onMounted(() => {
  getAdminRoles();
  navStore.setBreadCrumbs("Orboarding / Add-admin");
});
</script>

<style>
.admin-form {
  height: 100vh;
}
</style>
