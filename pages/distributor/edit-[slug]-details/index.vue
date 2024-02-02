<template>
  <div>
    <section v-loading="loading" class="edit_mang_wrap">
      <div class="mang_inner comp_inner">
        <div class="mang_title mb-3">
          <h3>Edit {{ abtRoute }} details</h3>
        </div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form label-position="top" label-width="100px" :model="formData" :rules="formValidationRules"
              ref="formRef">
              <div class="comp_form_box">
                <h5 class="cf_title">
                  Enter
                  {{
                    abtRoute === "owner" ? abtRoute : `your ${abtRoute}`
                  }}
                  Details
                </h5>
                <div class="fieldrow" v-if="abtRoute === 'personal'">
                  <el-form-item v-if="formData" label="Name" prop="name">
                    <el-input placeholder="Name" v-model="formData.name" />
                  </el-form-item>
                </div>

                <!-- owner name  -->
                <div class="fieldrow" v-if="abtRoute === 'owner'">
                  <el-form-item v-if="formData" label="Owner name" prop="ownerName">
                    <el-input placeholder="Owner name" v-model="formData.ownerName" />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item label="Phone Number" prop="phoneNumber">
                    <el-input placeholder="Phone  number" v-if="formData" v-model="formData.phoneNumber" />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Date of Birth" prop="dateOfBirth">
                    <!-- <el-date-picker
                        value-format="YYYY-MM-DD"
                        v-model="formData.dateOfBirth"
                        type="date"
                        placeholder="Pick a day"
                        size="default"
                      /> -->
                    <DatePicker :age-factor="18" @handleDate="handleDateOfBirth" />
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
                  <el-form-item v-if="formData" label="House no., Street" prop="apartment">
                    <el-input class="" v-model="formData.apartment" placeholder="House no.,Street" />
                  </el-form-item>
                </div>
                <!-- <div class="fieldrow">
                    <el-form-item v-if="formData" label="Street" prop="street">
                      <el-input
                        class=""
                        v-model="formData.street"
                        placeholder="House no.,Street"
                      />
                    </el-form-item>
                  </div> -->
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Area" prop="area">
                    <el-input class="" v-model="formData.area" placeholder="Area" />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Region" prop="region">
                    <el-input class="" v-model="formData.region" placeholder="Region" />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="District" prop="district">
                    <el-input class="" v-model="formData.district" placeholder="Region" />
                  </el-form-item>
                </div>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="Post Code" prop="post_code">
                    <el-input class="" v-model="formData.post_code" placeholder="Post code" />
                  </el-form-item>
                </div>
                <div class="fieldrow" v-if="abtRoute === 'owner'">
                  <el-form-item v-if="formData" label="Company website" prop="company_website">
                    <el-input class="" v-model="formData.company_website" placeholder="company website" />
                  </el-form-item>
                </div>
              </div>
              <div class="comp_form_box">
                <h5 class="cf_title">Enter your location’s GPS address</h5>
                <div class="fieldrow">
                  <el-form-item v-if="formData" label="GPS Address" prop="gps_address">
                    <el-input class="" v-model="formData.gps_address" placeholder="GPS address" />
                  </el-form-item>
                </div>
                <img class="gh_post" :src="ghanapost" alt="ghanapost" />
              </div>
            </el-form>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="comp_form_box w355">
              <h5 class="cf_title big_title">Details of national ID</h5>
              <div class="fieldrow">
                <p><span class="text-danger me-2">*</span>Select ID type</p>
                <el-radio-group v-model="radio">
                  <el-radio :label="3">Ghana card</el-radio>
                  <el-radio :label="6">Voter's ID</el-radio>
                </el-radio-group>
              </div>
              <SingleFileUpload iconClass="iconClass" @getImage="getGhanaId" :value="formData.id.ghanaCard"
                style="margin-top: -25px; margin-bottom: 25px;" v-if="radio === 3" />
              <SingleFileUpload iconClass="iconClass" @getImage="getVoterId" :value="formData ? formData.id.voterId : ''"
                style="margin-top: -25px; margin-bottom: 25px;" v-if="radio === 6" />
            </div>
            <div class="comp_form_box w355">
              <div class="fieldrow">
                <p><span class="text-danger me-2">*</span>Face recognization</p>
                <SingleFileUpload iconClass="iconClass" @getImage="getFace" :reactivePropertyfirstName="formData ? formData.id.face_recognition : ''
                  " :value="formData ? formData.id.face_recognition : ''" />
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="comp_footer">
          <el-button class="btn btn-default" @click="handleCancel">Cancel</el-button>
          <el-button class="btn btn-primary" @click="handleContinue">Continue</el-button>
        </div>
      </div>
    </section>

    <!-- Dialog box -->
    <el-dialog v-model="dialogVisible" @close="closeDialog" title="Send login credentials" center
      class="rounded-3 shadow fw-bold w-75 w-md-30">
      <div class="d-flex justify-content-center">
        <img :src="admin_mail" alt="Mail" />
      </div>
      <span>
        <center>Send temporary logic credentials to admin</center>
      </span>

      <template #footer>
        <span class="dialog-footer d-flex">
          <div class="col-6">
            <button class="btn border border-primary w-75 btn-cancel" @click="handleCancel">
              Cancel
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-primary w-100 btn-sendemail" @click="handleSendCredWithEmail">
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

const abtRoute = ref("");

const formData = reactive({
  ownerName: "",
  district: "",
  phoneNumber: "",
  region: "",
  email: "",
  apartment: "",
  name: "",
  dateOfBirth: "",
  gps_address: "",
  id: {
    ghanaCard: {},
    voterId: {},
    face_recognition: {},
  },
  street: "",
  area: "",
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
const getGhanaId = (imageDoc, fullFile) => {
  formData.id.ghanaCard = fullFile;
  if (!imageDoc.name) {
    formData.id.ghanaCard = {};
  }
};

const getVoterId = (imageDoc, fullFile) => {
  formData.id.voterId = fullFile;
  if (!imageDoc.name) {
    formData.id.voterId = {};
  }
};

const getFace = (imageDoc, fullFile) => {
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
  ownerName: nameRule("owener name"),
  phoneNumber: nameRule("phone number"),
  dateOfBirth: nameRule("date of birth"),
  email: nameRule("email"),
  gps_address: nameRule("gps address"),
  apartment: nameRule("apartment number"),
  area: nameRule("area"),
  region: nameRule("region"),
  district: nameRule("district"),
  post_code: nameRule("post_code"),
  name: nameRule("name"),
});

//handle save
const handleContinue = async () => {
  if (formRef.value && formRef.value.validate) {
    formRef.value.validate(async (valid) => {
      if (valid) {
        if (!formData.id.ghanaCard.raw && !formData.id.voterId.raw) {
          flashNotification("warning", "Please upload atleast one document");
          return;
        }
        if (!formData.id.face_recognition.raw) {
          flashNotification(
            "warning",
            "Please upload face recognization document"
          );
          return;
        }

        // for redirecting to origin page (without any api calling)
        if (abtRoute.value === "owner") {
          router.owner = true;
          router.push(`/distributor/distributor-${"undefind"}`);
        } else {
          router.push(`/distributor/customer-101`);
        }

        // update(adminId.value, updateBasicDetails).then((response) => {
        //   console.log("res1", response);
        // });

        // await uploadAllDocs();

        // let addressDetails = {
        //   admin_id: AuthStore.user_info.id,
        //   apartment: formData.apartment,
        //   street: formData.street,
        //   area: formData.area,
        //   region: formData.region,
        //   district: formData.district,
        //   post_code: formData.post_code,
        //   is_active: true,
        // };

        // storeAddress(addressDetails).then((response) => {
        //   console.log("res2", response);
        // });
        // loading.value = false;
        // dialogVisible.value = true;
        // flashNotification("success", "Admin KYC done successfully");
      } else {
        // loading.value = false;
        flashNotification("warning", "Please fill required fields");
      }
      // loading.value = false;
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
      // router.push("/onboarding");
    })
    .catch((err) => {
      // console.log("error is", err)
    });
  dialogVisible.value = false;
  // router.push("/onboarding");
};

const handleCancel = () => {
  if (abtRoute.value === "owner") {
    router.owner = true;
    router.push(`/distributor/distributor-${"undefind"}`);
  } else {
    router.push(`/distributor/customer-101`);
  }
};

onMounted(() => {
  const route = useRoute();
  abtRoute.value = route.params.slug;
  if (abtRoute.value === "owner") {
    Object.assign(formData, router.o_details);
    delete router.o_details;
  } else {
    Object.assign(formData, router.p_details);
    delete router.p_details;
  }
  fetch(adminId.value);
  navStore.setBreadCrumbs(`Distributor / Edit ${abtRoute.value} details`);
});
</script>

<style scoped lang="scss">
.comp_inner .comp_form_box .fieldrow {
  margin-bottom: 25px;
}

.comp_inner .comp_form_box p {
  font-size: 16px;
}
.comp_inner .comp_form_box .cf_title.big_title{
  font-size: 16px;
  font-weight: 600;
}
</style>
