<template>
  <div>
    <section v-loading="loading" class="edit_mang_wrap">
      <div class="mang_inner comp_inner">
        <div class="mang_title mb-3">
          <h3>
            Please fill the following details to complete onboarding process
          </h3>
        </div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form
              label-position="top"
              label-width="100px"
              :model="formData"
              :rules="formValidationRules"
              ref="formRef"
            >
              <div class="comp_form_box">
                <h5 class="cf_title">Enter Personal Details</h5>
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="First Name"
                    prop="firstName"
                  >
                    <el-input
                      placeholder="First name"
                      v-model="formData.firstName"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Last Name"
                    prop="lastName"
                  >
                    <el-input
                      placeholder="Last name"
                      v-model="formData.lastName"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item label="Phone Number" prop="phoneNumber">
                    <el-input
                      placeholder="Phone  number"
                      v-if="formData"
                      v-model="formData.phoneNumber"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Date of Birth"
                    prop="dateOfBirth"
                  >
                    <!-- <el-date-picker
                      value-format="YYYY-MM-DD"
                      v-model="formData.dateOfBirth"
                      type="date"
                      placeholder="Pick a day"
                      size="default"
                    /> -->
                    <DatePicker
                      :age-factor="18"
                      @handleDate="handleDateOfBirth"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Email" prop="email">
                    <el-input placeholder="Email" v-model="formData.email" />
                  </el-form-item>
                </div>
              </div>
              <div class="comp_form_box">
                <!-- <h5 class="cf_title">Address</h5> -->
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Apartment"
                    prop="apartment"
                  >
                    <el-input
                      class=""
                      v-model="formData.apartment"
                      placeholder="House no.,Street"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Street" prop="street">
                    <el-input
                      class=""
                      v-model="formData.street"
                      placeholder="House no.,Street"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Area" prop="area">
                    <el-input
                      class=""
                      v-model="formData.area"
                      placeholder="Area"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Region" prop="region">
                    <el-input
                      class=""
                      v-model="formData.region"
                      placeholder="Region"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="District"
                    prop="district"
                  >
                    <el-input
                      class=""
                      v-model="formData.district"
                      placeholder="Region"
                    />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Post Code"
                    prop="post_code"
                  >
                    <el-input
                      class=""
                      v-model="formData.post_code"
                      placeholder="Post code"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="comp_form_box">
                <h5 class="cf_title">Enter your location’s GPS address</h5>
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="GPS Address"
                    prop="gps_address"
                  >
                    <el-input
                      class=""
                      v-model="formData.gps_address"
                      placeholder="GPS address"
                    />
                  </el-form-item>
                </div>
                <img class="gh_post" :src="ghanapost" alt="ghanapost" />
              </div>
            </el-form>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="comp_form_box w355">
              <h5 class="cf_title">Details of national ID</h5>
              <div class="fieldrow">
                <p>Select ID type</p>
                <el-radio-group v-model="radio">
                  <el-radio :label="3">Ghana card</el-radio>
                  <el-radio :label="6">Voter's ID</el-radio>
                </el-radio-group>
              </div>
              <SingleFileUpload
                iconClass="iconClass"
                @getFullImageData="getGhanaId"
                :value="formData.id.ghanaCard"
                style="margin-top: -25px; margin-bottom: 25px;"
                v-if="radio === 3"
              />
              <SingleFileUpload
                iconClass="iconClass"
                @getFullImageData="getVoterId"
                :value="formData ? formData.id.voterId : ''"
                style="margin-top: -25px; margin-bottom: 25px;"
                v-if="radio === 6"
              />
            </div>
            <div class="comp_form_box w355">
              <div class="fieldrow">
                <p>Face recognization</p>
                <SingleFileUpload
                  iconClass="iconClass"
                  @getFullImageData="getFace"
                  :reactivePropertyfirstName="
                    formData ? formData.id.face_recognition : ''
                  "
                  :value="formData ? formData.id.face_recognition : ''"
                />
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="comp_footer">
          <nuxt-link class="btn btn-default" to="/onboarding">Cancel</nuxt-link>
          <el-button class="btn btn-primary" @click="handleContinue"
            >Continue</el-button
          >
        </div>
      </div>
    </section>

    <!-- Dialog box -->
    <el-dialog
      v-model="dialogVisible"
      @close="closeDialog"
      title="Send login credentials"
      center
      class="rounded-3 shadow fw-bold w-75 w-md-30"
    >
      <div class="d-flex justify-content-center">
        <img :src="admin_mail" alt="Mail" />
      </div>
      <span>
        <center>Send temporary logic credentials to admin</center>
      </span>

      <template #footer>
        <span class="dialog-footer d-flex">
          <div class="col-6">
            <button
              class="btn border border-primary w-75 btn-cancel"
              @click="handleCancel"
            >
              Cancel
            </button>
          </div>
          <div class="col-6">
            <button
              class="btn btn-primary w-100 btn-sendemail"
              @click="handleSendCredWithEmail"
            >
              Send email
            </button>
          </div>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { edit, update, storeAddress } from "@/api/admin-kyc.js";
import { adminSendCred } from "@/api/admin-send-creds.js";
import { flashNotification } from "@/composables/useNotification.js";
import { nameRule } from "@/rules/all-rules";
import SingleFileUpload from "@/components/upload/SingleFileUpload.vue";
import admin_mail from "@/assets/svg/admin_mail.svg";
import SuccessDialog from "@/pages/onboarding/dialog-box/SuccessDialog.vue";
import ghanapost from "@/assets/svg/ghanapost.svg";
import { getServerLink } from "@/composables/useGetDocUploadServer.js";
import { uploadDocument } from "@/api/upload";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
const router = useRouter();
const AuthStore = useAuthStore();
const dialogVisible = ref(false);
let loading = ref(false);

//radio button
const radio = ref(3);

// watch(radio,()=>{
//   console.log(formData)
// })

const formData = reactive({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: "",
  email: "",
  gps_address: "",
  id: {
    ghanaCard: {},
    voterId: {},
    face_recognition: {},
  },
  apartment: "",
  street: "",
  area: "",
  region: "",
  district: "",
  post_code: "",
  is_active: true,
});

// const formDataAdress = reactive({
//   apartment: "",
//   street: "",
//   area: "",
//   region: "",
//   district: "",
//   post_code: "",
//   is_active: true,
// });

const formRef = ref(null);
let adminEmail = null;

const adminId = computed(() => {
  const route = useRoute();
  const file = router ? route.path.split("/").slice(-1)[0] : "";
  const name = file.split("_");
  const id = name[1];
  return id;
});

// fetch basic details
function fetch(id) {
  edit(id).then((response) => {
    // console.log("resp1", response.data);
    formData.firstName = response.data.first_name;
    formData.lastName = response.data.last_name;
    formData.phoneNumber = response.data.phone;
    formData.email = response.data.email;
    adminEmail = response.data.email;
    // console.log("adminEmail", adminEmail)
  });
}

//get id and face
const getGhanaId = (fullFile,metaData) => {
  formData.id.ghanaCard = fullFile;
  if (!imageDoc.name) {
    formData.id.ghanaCard = {};
  }
};

const getVoterId = (fullFile,metaData) => {
  formData.id.voterId = fullFile;
  if (!imageDoc.name) {
    formData.id.voterId = {};
  }
};

const getFace = (fullFile,metaData) => {
  formData.id.face_recognition = fullFile;
  if (!imageDoc.name) {
    formData.id.face_recognition = {};
  }
};

//dialogVisible called
const closeDialog = () => {
  dialogVisible.value = false;
};

// setting up the date of birth
function handleDateOfBirth(birthDate) {
  formData.dateOfBirth = birthDate;
}

// validation
const formValidationRules = reactive({
  firstName: nameRule("first name"),
  lastName: nameRule("last name"),
  phoneNumber: nameRule("phone number"),
  dateOfBirth: nameRule("date of birth"),
  email: nameRule("email"),
  gps_address: nameRule("gps address"),
  apartment: nameRule("apartment number"),
  street: nameRule("street"),
  area: nameRule("area"),
  region: nameRule("region"),
  district: nameRule("district"),
  post_code: nameRule("post_code"),
});

//handle save
const handleContinue = async () => {
  loading.value = true;
  if (formRef.value && formRef.value.validate) {
    formRef.value.validate(async (valid) => {
      if (valid) {
        let updateBasicDetails = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phoneNumber,
          date_of_birth: formData.dateOfBirth,
          email: formData.email,
        };
        console.log("valid 1",formData.id.ghanaCard,formData.id.voterId);
        if (!formData.id.ghanaCard.raw && !formData.id.voterId.raw) {
          flashNotification(
            "warning",
            "Please upload atleast one document"
          );
          loading.value = false;
          return;
        }
        if (!formData.id.face_recognition.raw) {
          flashNotification(
            "warning",
            "Please upload face recognization document"
          );
          loading.value = false;
          return;
        }

        update(adminId.value, updateBasicDetails).then((response) => {
          console.log("res1", response);
        }).catch((err)=>{
          flashNotification("warning","Something went wrong please try again later.")
          loading.value = false;
        });

        await uploadAllDocs();

        let addressDetails = {
          admin_id: AuthStore.user_info.id,
          apartment: formData.apartment,
          street: formData.street,
          area: formData.area,
          region: formData.region,
          district: formData.district,
          post_code: formData.post_code,
          is_active: true,
        };

        storeAddress(addressDetails).then((response) => {
          console.log("res2", response);
        });
        loading.value = false;
        dialogVisible.value = true;
        flashNotification("success", "Admin KYC done successfully");
      } else {
        loading.value = false;
        flashNotification("warning", "Please fill required fields");
      }
      loading.value = false;
    });
  }
};

const uploadAllDocs = async () => {
  if (formData.id.ghanaCard.raw) {
    try {
      const result = await getServerLink(
        AuthStore.user_info.id,
        "ghana_card",
        "admin"
      );
      const { front_document_url, error } = result;
      if (error) {
        flashNotification(
          "warning",
          "Something went wrong please try again later."
        );
        return;
      }
      const docUpload = await uploadDocument(
        formData.id.ghanaCard.raw,
        front_document_url
      );
      if (docUpload.status != 200) {
        flashNotification(
          "warning",
          "Something went wrong please try again later."
        );
        return;
      }
    } catch (err) {
      loading.value = false;
      flashNotification(
        "warning",
        "Something went wrong please try again later."
      );
      return;
    }
  }
  if (formData.id.voterId.raw) {
    try {
      const result = await getServerLink(
        AuthStore.user_info.id,
        "voter_id",
        "admin"
      );
      const { front_document_url, error } = result;
      if (error) {
        flashNotification(
          "warning",
          "Something went wrong please try again later."
        );
        return;
      }
      const docUpload = await uploadDocument(
        formData.id.voterId.raw,
        front_document_url
      );
      if (docUpload.status != 200) {
        flashNotification(
          "warning",
          "Something went wrong please try again later."
        );
        return;
      }
    } catch (err) {
      loading.value = false;
      flashNotification(
        "warning",
        "Something went wrong please try again later."
      );
      return;
    }
  }
  if (formData.id.face_recognition.raw) {
    try {
      const result = await getServerLink(
        AuthStore.user_info.id,
        "face_recognization",
        "admin"
      );
      const { front_document_url, error } = result;
      console.log("front_documant_url",front_document_url);
      if (error) {
        flashNotification(
          "warning",
          "Something went wrong please try again later."
        );
        return;
      }
      const docUpload = await uploadDocument(
        formData.id.face_recognition.raw,
        front_document_url
      );
      if (docUpload.status != 200) {
        flashNotification(
          "warning",
          "Something went wrong please try again later."
        );
        return;
      }
    } catch (err) {
      loading.value = false;
      flashNotification(
        "warning",
        "Something went wrong please try again later."
      );
      return;
    }
  }
};

const handleSendCredWithEmail = () => {
  let senCred = {
    id: adminId.value,
    email: adminEmail,
    password: "Admin@123",
  };
  adminSendCred(senCred.id, senCred)
    .then((response) => {
      router.push("/onboarding");
    })
    .catch((err) => {
      loading.value = false;
      // console.log("error is", err)
    });
  dialogVisible.value = false;
  router.push("/onboarding");
};

const handleCancel = () => {
  router.push("/onboarding");
};

onMounted(() => {
  fetch(adminId.value);
  navStore.setBreadCrumbs("Orboarding / Add-admin / KYC");
});
</script>
