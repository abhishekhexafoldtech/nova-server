<template>
  <div>
    <section v-loading="loading" class="edit_mang_wrap">
      <div class="mang_inner comp_inner">
        <div class="mang_title">
          <h3>National ID details</h3>
        </div>
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="comp_form_box add_dist_up w355">
              <div class="fieldrow">
                <p class="mb-3">Select ID type</p>
                <el-radio-group v-model="selectedIdType">
                  <el-radio :label="1" @change="clearData">Ghana card</el-radio>
                  <el-radio :label="2" @change="clearData">Voter's ID</el-radio>
                </el-radio-group>
                <SingleFileUpload
                  v-if="selectedIdType === 1"
                  id="national_id"
                  iconClass="iconClass"
                  @getImage="getId"
                />
                <SingleFileUpload
                  v-if="selectedIdType === 2"
                  id="national_id"
                  iconClass="iconClass"
                  @getImage="getId"
                />
              </div>
            </div>
            <p v-if="isUpload" class="text-warning">
              please upload national id details.
            </p>
          </el-col>
        </el-row>
        <div class="comp_footer float-start">
          <nuxt-link class="btn btn-default" to="/distributor"
            >Cancel</nuxt-link
          >
          <button class="btn btn-primary" @click="handleSave">Save</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, watch, onMounted, reactive } from "vue";
import {
  getComapanyOwnerKyc,
  uploadNationalId,
  createComapanyOwnerKyc,
} from "@/api/distributor/add-distributor";
import { flashNotification } from "@/composables/useNotification.js";
import axios from "axios";
import admin_mail from "@/assets/svg/admin_mail.svg";
import SingleFileUpload from "@/components/upload/SingleFileUpload.vue";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
const router = useRouter();

// loader
let loading = ref(false);

//form data
const formData = reactive({
  ghanaCard: "",
  voterId: "",
});

//stop multiple api request
const waiteForResponse = ref(false);

// document types
const documentTypes = ref([]);

//document Id
const documentId = ref("");

//distributor id
const distributorId = ref("");

//error messege value
const isUpload = ref(false);
//set or change selected id type value
const selectedIdType = ref(1);

// dailog-box data
const successDialog = reactive({
  status: false,
  title: "Distributor added successfully",
  image: admin_mail,
  discription:
    "Yaw graham has added successfully. Do you want to send the temporary login credentials or do you want to continue with onboarding",
  discriptionSize: 17,
  titleSize: 22,
  leftButtonName: "Send Email",
  rightButtonName: "Continue with onboarding",
});

function creteKyc(KycData) {
  createComapanyOwnerKyc(KycData)
    .then((res) => {
      documentId.value = res.data.id;
      getComapanyOwnerKyc().then((res) => {
        if (res.status === 200) {
          documentTypes.value = res.data.items;
        }
      });
    })
    .catch((error) => {
      flashNotification("warning", `Unable to create copany owner kyc`);
    });
}

//getId set image based on selectedIdType value
const getId = (image) => {
  if (selectedIdType.value === 1) {
    formData.voterId = "";
    const notFindKyc = documentTypes.value.find((id) => {
      if (id.document_name === "Ghana_card") {
        documentId.value = id.id;
        return id.document_name;
      }
    });
    //if not found kyc its craeted new doc kyc
    if (!notFindKyc) {
      const createKycData = {
        document_name: "Ghana_card",
        require_back_side: true,
        document_allowed_extension: ["jpg", "png"],
        max_document_size_in_mb: 5,
        document_rank: 0,
        regular_expression: {},
        is_active: true,
        is_optional: true,
      };
      creteKyc(createKycData);
    }
    formData.ghanaCard = image;
    // formData.nationalId=image;
  } else if (selectedIdType.value === 2) {
    formData.ghanaCard = "";
    const notFindKyc = documentTypes.value.find((id) => {
      if (id.document_name === "Voter_id") {
        documentId.value = id.id;
        return id.document_name;
      }
    });
    if (!notFindKyc) {
      const createKycData = {
        document_name: "Voter_id",
        require_back_side: true,
        document_allowed_extension: ["jpg", "png"],
        max_document_size_in_mb: 5,
        document_rank: 0,
        regular_expression: {},
        is_active: true,
        is_optional: true,
      };
      creteKyc(createKycData);
    }
    formData.voterId = image;
    // formData.nationalId=image;
  }
};

//clear previuys uploaded image data
const clearData = (pre) => {
  if (pre === 1) {
    formData.voterId = "";
  } else {
    formData.ghanaCard = "";
  }
};

//handle save and call or post data to the server
const handleSave = () => {
  const docParams = {
    id: distributorId.value,
    document_type: documentId.value,
  };
  // if (formData.ghanaCard !== "" || formData.voterId !== "") {
  if (formData.ghanaCard !== "" || formData.voterId !== "") {
    if (waiteForResponse.value) {
      return;
    }
    loading.value = true;
    waiteForResponse.value = true;
    uploadNationalId(docParams, distributorId.value)
      .then((res) => {
        if (res.status === 201) {
          //post image on server
          axios
            .put(res.data.front_document_url, "abc.jpg")
            .then((uploadResponse) => {
              // Handle successful upload
              if (uploadResponse.status === 200) {
                flashNotification("success", `Document successfully uploaded.`);
                router.push("/distributor/add-distributor/business-details");
                // successDialog.status = true;
              }
              loading.value = false;
            })
            .catch((error) => {
              loading.value = false;
              // Handle upload error
              flashNotification("warning", `Document failed to upload`);
            });
        }
      })
      .catch((error) => {
        loading.value = false;
        waiteForResponse.value = false;
        flashNotification("warning", `Document failed to upload`);
      });
    // isUpload.value = false;
  } else {
    isUpload.value = true;
  }
};

//watching formData property and set error message
watch(formData, () => {
  if (formData.ghanaCard !== "" || formData.voterId !== "") {
    isUpload.value = false;
  }
});

onMounted(async () => {
  //get distributor id using session storage
  navStore.setBreadCrumbs("Distributor / Add distributor");
  distributorId.value = sessionStorage.getItem("dist_id");

  await getComapanyOwnerKyc()
    .then((res) => {
      if (res.status === 200) {
        documentTypes.value = res.data.items;
      }
    })
    .catch((err) => {
      flashNotification("warning", `Unable to fetch company owner kyc`);
    });
});
</script>
<style></style>
