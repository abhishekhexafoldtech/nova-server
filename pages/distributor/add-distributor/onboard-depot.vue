<template>
  <section v-loading="loading" class="edit_mang_wrap">
    <div class="mang_inner comp_inner">
      <h4 class="page_heading mb-3 pb-2">Onboard depot</h4>
      <div class="comp_inner">
        <el-form
          label-position="top"
          label-width="100px"
          :model="formData"
          :rules="formValidationRules"
          ref="formRef"
        >
          <el-row :gutter="80">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <!-- Name of depot -->
              <div class="comp_form_box pb-3">
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Name of depot"
                    prop="name_of_depot"
                  >
                    <el-input
                      v-model="formData.name_of_depot"
                      placeholder="Name of depot"
                    />
                  </el-form-item>
                </div>
              </div>

              <!-- location’s GPS address -->
              <div class="comp_form_box pb-3">
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
                <img class="gh_post" :src="ghanaPost" alt="ghanaPost" />
              </div>

              <el-row>
                <el-col :xm="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <!-- Fire certificate -->
                  <div class="comp_form_box phase3_upload m-0">
                    <div class="fieldrow m-0">
                      <p class="frm_label">Fire certificate</p>
                      <SingleFileUpload
                        id="FireCertificate"
                        iconClass="iconClass"
                        @getImage="getFireCertificate"
                      />
                    </div>
                    <p v-if="isUploadFireCertificate" class="text-danger">
                      Please upload fire certificate
                    </p>
                  </div>
                </el-col>

                <!-- Proof of tenancy -->
                <el-col :xm="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <div class="comp_form_box phase3_upload m-0">
                    <div class="fieldrow m-0">
                      <p class="frm_label">Proof of tenancy</p>
                      <SingleFileUpload
                        id="ProofOfTenancy"
                        iconClass="iconClass"
                        @getImage="getProofOfTenancy"
                      />
                    </div>
                    <p v-if="isUploadProofOfTenancy" class="text-danger">
                      Please upload proof of tenancy
                    </p>
                  </div>
                </el-col>
              </el-row>
              <div class="onboard_check mt-4">
                <el-checkbox
                  @change="sameBInsurance"
                  v-model="sameBusinessInsurence"
                />
                <span>same as business insurance details</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="ins_heading">
                <h3>Insurance details</h3>
                <p>Please enter your business insurance details</p>
              </div>

              <!-- Name of Insurance Company -->
              <div class="comp_form_box">
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Name of Insurance Company"
                    prop="insurence_detail.name_of_insurence_company"
                  >
                    <el-input
                      v-model="
                        formData.insurence_detail.name_of_insurence_company
                      "
                      placeholder="Name of insurance company"
                    />
                  </el-form-item>
                </div>
              </div>

              <!-- Policy Number -->
              <div class="comp_form_box">
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Policy Number"
                    prop="insurence_detail.policy_number"
                  >
                    <el-input
                      v-model="formData.insurence_detail.policy_number"
                      placeholder="Policy number"
                    />
                  </el-form-item>
                </div>
              </div>

              <!-- Expiry of Insurance -->
              <div class="comp_form_box">
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Expiry of Insurance"
                    prop="insurence_detail.expiry_of_insurence"
                  >
                    <el-date-picker
                      value-format="YYYY-MM-DD"
                      v-model="formData.insurence_detail.expiry_of_insurence"
                      type="date"
                      placeholder="Expiry of insurance"
                      size="default"
                    />
                  </el-form-item>
                </div>
              </div>

              <!-- Insurance Card -->
              <div class="comp_form_box phase3_upload m-0">
                <div class="fieldrow m-0">
                  <p class="frm_label">Insurance Card</p>
                  <SingleFileUpload
                    id="InsurenceCard"
                    iconClass="iconClass"
                    @getImage="getInsurenceCard"
                  />
                </div>
                <p v-if="isUploadInsurenceCard" class="text-danger">
                  Please upload insurance card
                </p>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="comp_footer">
          <nuxt-link class="btn btn-default" to="/distributor"
            >Cancel</nuxt-link
          >
          <el-button class="btn btn-primary" @click="handleSave"
            >Save</el-button
          >
        </div>
      </div>
    </div>
    <!-- with Email -->
    <DialogStatus
      v-if="emailDailog"
      :dialogVisible="emailDailog.status"
      :dialogTitle="emailDailog.title"
      :dialogImage="emailDailog.image"
      :dialogText="emailDailog.discription"
      :dialogTextSize="emailDailog.discriptionSize"
      :dialogTitleSize="emailDailog.titleSize"
      :rightButtonName="emailDailog.rightButtonName"
      @handleRightButton="handleSendEmail"
      @dialogVisible="handleCloseEmailDialog"
    />
  </section>
</template>

<script setup>
import { ref, reactive, watch, onMounted ,onUnmounted} from "vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
import { nameRule, numberRule } from "@/rules/all-rules";
import {
  getAllLocationKyc,
  createComapanyLocation,
  createComapanyLocationKyc,
  getBusinessInsuranceDetail,
  postLocationInsurenceDetails,
  uploadCompanyLocationKycDocument,
} from "@/api/distributor/onboard-depot";
import { useNavStore } from "@/stores/NavStore";
import DialogStatus from "./Dialog/Status.vue";
import axios from "axios";
import admin_mail from "@/assets/img/admin_mail.png";
import SingleFileUpload from "~/components/upload/SingleFileUpload.vue";
import ghanaPost from "@/assets/svg/ghanapost.svg";
const navStore = useNavStore();

const router = useRouter();
const formRef = ref(null);
const isUploadFireCertificate = ref(false);
const isUploadProofOfTenancy = ref(false);
const isUploadInsurenceCard = ref(false);
const isuploadInsDetails = ref(false);

// companyLocationId
const companyLocationId = ref("");

//fire certificate id
const fireCertificateId = ref("");
//Proof_of_tenancy id
const proofOfTenancyId = ref("");

//location kyc ids
const locationKycId = ref([]);

//company id
const companyId = ref("");

//company insurance id
const companyInsuranceId = ref("");

// waiteForResponse
const waiteForResponse = ref(false);

//isDocUploaded
const isFireDocUploaded = ref(false);
const isTenancyDocUploaded = ref(false);

//loder
let loading = ref(false);

//form data
const sameBusinessInsurence = ref(false);
const formData = reactive({
  name_of_depot: "",
  gps_address: "",
  fire_certificate: "",
  proof_of_tenancy: "",
  insurence_detail: {
    name_of_insurence_company: "",
    policy_number: "",
    expiry_of_insurence: "",
    insurence_card: "",
  },
});

// with email data
const emailDailog = reactive({
  status: false,
  title: "Send email to distributor",
  image: admin_mail,
  discription: "Inform distributor that onboarding is under review.",
  discriptionSize: 17,
  titleSize: 22,
  leftButtonName: "Cancel",
  rightButtonName: "Send Email",
});

//validation rules
const formValidationRules = reactive({
  name_of_depot: nameRule("the name of depot"),
  gps_address: nameRule("the gps address"),
  insurence_detail: {
    name_of_insurence_company: nameRule("the name of insurance company"),
    policy_number: numberRule("the policy number"),
    expiry_of_insurence: nameRule("the expiry of insurance"),
  },
});

//getInsurenceCard
const getInsurenceCard = (image) => {
  if (image) {
    isUploadInsurenceCard.value = false;
  } else {
    isUploadInsurenceCard.value = true;
  }
  formData.insurence_detail.insurence_card = "image";
};

//fire_certificate
const getFireCertificate = (image) => {
  if (image) {
    const notFindKyc = locationKycId.value.find((id) => {
      if (id.document_name === "Fire_certificate") {
        fireCertificateId.value = id.id;
        return id.id;
      }
    });
    if (!notFindKyc) {
      const locationKycData = {
        document_name: "Fire_certificate",
        required_back_side: true,
        document_allowed_extension: ["jpg", "png"],
        max_document_size_in_mb: 10,
        document_rank: 0,
        regular_expression: {},
        is_active: true,
        is_optional: true,
      };

      createComapanyLocationKyc(locationKycData)
        .then((res) => {
          if (res.status === 201) {
            fireCertificateId.value = res.data.id;
            getAllLocationKycData();
          }
        })
        .catch((error) => {
          flashNotification("warning", "Unable to create document kyc");
        });
      formData.fire_certificate = "image";
    }
    isUploadFireCertificate.value = false;
  } else {
    isUploadFireCertificate.value = true;
  }
  formData.fire_certificate = "image";
};

//proofOfTenancy
const getProofOfTenancy = (image) => {
  if (image) {
    const notFindKyc = locationKycId.value.find((id) => {
      if (id.document_name === "Proof_of_tenancy") {
        proofOfTenancyId.value = id.id;
        return id.id;
      }
    });
    if (!notFindKyc) {
      const locationKycData = {
        document_name: "Proof_of_tenancy",
        required_back_side: true,
        document_allowed_extension: ["jpg", "png"],
        max_document_size_in_mb: 10,
        document_rank: 0,
        regular_expression: {},
        is_active: true,
        is_optional: true,
      };

      createComapanyLocationKyc(locationKycData)
        .then((res) => {
          if (res.status === 201) {
            proofOfTenancyId.value = res.data.id;
            getAllLocationKycData();
          }
        })
        .catch((error) => {
          flashNotification("warning", "Unable to create document kyc");
        });
      formData.fire_certificate = "image";
    }
    isUploadProofOfTenancy.value = false;
  } else {
    isUploadProofOfTenancy.value = true;
  }
  formData.proof_of_tenancy = "image";
};

//here handleSendEmail function
function handleSendEmail() {
  router.push("/distributor");
}

function handleCloseEmailDialog() {
  router.push("/distributor");
}

//uploadDoc
const uploadDoc = (docId, image, docName) => {
  console.log(docName)
  const CertificateDocParams = {
    id: companyLocationId.value,
    document_type: docId,
  };
  //upload documents
  uploadCompanyLocationKycDocument(
    CertificateDocParams,
    companyLocationId.value
  )
    .then((res) => {
      if (res.status === 201) {
        // upload certificate
        axios
          .put(res.data.front_document_url, image)
          .then((uploadResponse) => {
            // Handle successful upload
            if (uploadResponse.status === 200 && docName == "tenancy") {
              isTenancyDocUploaded.value = true;
            }
            else if (uploadResponse.status === 200 && docName == "fire") {
              isFireDocUploaded.value = true;
            }
          })
          .catch((error) => {
            waiteForResponse.value = false;
            // loading.value = false;
            flashNotification(
              "warning",
              `Unable to upload location kyc documents`
            );
          });
      }
    })
    .catch((error) => {
      waiteForResponse.value = false;
      // loading.value = false;
      flashNotification(
        "warning",
        `Unable to upload Certificate of Registration`
      );
    });
};

const sendLocationInsurenceDetails = (insurence_details,id,insurence_card) => {
  postLocationInsurenceDetails(insurence_details, id)
    .then((res) => {
      if (res.status === 201) {
        axios
          .put(res.data.insurance_copy, "abc.jpg")
          .then((res) => {
            if (res.status === 200) {
              isuploadInsDetails.value = true;
            }
          })
          .catch((err) => {
            loading.value = false;
            waiteForResponse.value = false;
            flashNotification("warning", `unable to upload insurance card`);
          });
      }
    })
    .catch((error) => {
      flashNotification("warning", `unable upload insurance details`);
      loading.value = false;
      waiteForResponse.value = false;
    });
};
// handleSave
const handleSave = async () => {
  // static popup
  emailDailog.status = true;
  if (formData.proof_of_tenancy === "") {
    isUploadProofOfTenancy.value = true;
  }
  if (formData.fire_certificate === "") {
    isUploadFireCertificate.value = true;
  }
  if (formData.insurence_detail.insurence_card === "") {
    isUploadInsurenceCard.value = true;
  }
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        //post name of data error.response
        const depotData = {
          location_type: "depot",
          is_verified: false,
          contact: null,
          location_name: formData.name_of_depot,
          longitude: 0,
          latitude: 0,
          region: null,
          district: null,
          area: null,
          street: null,
          is_active: true,
        };
        const insurence_details = {
          policy_number: formData.insurence_detail.policy_number,
          insurance_company:
            formData.insurence_detail.name_of_insurence_company,
          expiry: formData.insurence_detail.expiry_of_insurence,
          is_verified: true,
        };
        if (waiteForResponse.value) {
          return;
        }
        waiteForResponse.value = true;
        loading.value = true;
        createComapanyLocation(depotData)
          .then((res) => {
            if (res.status === 201) {
              companyLocationId.value = res.data.id;
              // upload fire certificate
              uploadDoc(fireCertificateId.value,formData.fire_certificate,"fire");
              // upload tenancy
              uploadDoc(proofOfTenancyId.value,formData.proof_of_tenancy,"tenancy");
              // post LocationInsurenceDetails
              sendLocationInsurenceDetails(insurence_details, res.data.id,formData.insurence_detail.insurence_card);
            }
          })
          .catch((error) => {
            loading.value = false;
            console.log(error)
            if (error.response.status === 400) {
              flashNotification(
                "warning",
                `Company location name is already exists`
              );
            } else {
              flashNotification("warning", `Failed onboard depot`);
            }
            waiteForResponse.value = false;
          });
      } catch (error) {
        flashNotification("error", "An error occurred. Please try again.");
      }
    } else {
      flashNotification("warning", "Please fill required fields");
    }
  });
};

watch([isTenancyDocUploaded,isFireDocUploaded, isuploadInsDetails], () => {
  if ((isTenancyDocUploaded.value === true && isFireDocUploaded.value===true && isuploadInsDetails.value === true)) {
    flashNotification("success", `Onboarding successfully`);
    emailDailog.status = true;
    loading.value = false;
    waiteForResponse.value = false;
    return false;
  }
});

const getAllLocationKycData = () => {
  getAllLocationKyc()
    .then((res) => {
      if (res.status == 200) {
        locationKycId.value = res.data.data;
      }
    })
    .catch((error) => {
      flashNotification("warning", "Unable to get location kyc data");
    });
};

// set  sameBInsurance  function console
const sameBInsurance = (value) => {
  if (value === true) {
    getBusinessInsuranceDetail(companyId.value, companyInsuranceId.value)
      .then((res) => {
        if (res.status == 200) {
          formData.insurence_detail.name_of_insurence_company =res.data.insurance_company;
          formData.insurence_detail.policy_number = res.data.policy_number;
          formData.insurence_detail.expiry_of_insurence = res.data.expiry;
          axios
            .get(res.data.insurance_copy, res.data.id)
            .then((res) => {
              if (res.status == 200) {
                formData.insurence_detail.insurence_card =
                  res.data.insurance_copy;
              }
            })
            .catch((error) => {
              flashNotification(
                "warning",
                "Unable to get insurence card image"
              );
              sameBusinessInsurence.value = false;
            });
        }
      })
      .catch((error) => {
        sameBusinessInsurence.value = false;
        flashNotification("warning", "Unable to fetch insurence details ");
      });
  } else {
    formData.insurence_detail.name_of_insurence_company = "";
    formData.insurence_detail.policy_number = "";
    formData.insurence_detail.expiry_of_insurence = "";
    formData.insurence_detail.insurence_card = "";
  }
};

onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Add distributor");
  companyInsuranceId.value = sessionStorage.getItem("insurance_id");
  companyId.value = sessionStorage.getItem("company_id");
  getAllLocationKycData();
});

onUnmounted(()=>{
  // sessionStorage.clear("company_id")
  // sessionStorage.clear("company_location_id")
  // sessionStorage.clear("dist_id")
  // sessionStorage.clear("insurance_id")
})

// definePageMeta({
//   layout: "default",
// });
</script>

<style scoped lang="scss">
.comp_inner {
  .comp_form_box {
    margin-bottom: 25px;

    .fieldrow {
      margin: 0;
    }

    .gh_post {
      margin-top: 12px;
    }
  }
}

.ins_heading {
  margin-bottom: 30px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: var(--black);
    margin: 0;
    margin-bottom: 10px;
  }

  p {
    color: var(--black);
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.5px;
    margin: 0;
  }
}

.comp_inner .comp_form_box p {
  font-weight: 600;
}
</style>
