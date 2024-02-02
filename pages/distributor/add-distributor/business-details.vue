<template>
  <div>
    <section v-loading="loading" class="edit_mang_wrap">
      <div class="mang_inner comp_inner">
        <div class="mang_title">
          <h3 class="mb-3">
            {{ router.b_details ? "Edit" : "" }} Business details
          </h3>
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
                <!-- Name of Business -->
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Name of Business"
                    prop="name_of_bussiness"
                  >
                    <el-input
                      v-model="formData.name_of_bussiness"
                      placeholder="Name of business"
                    />
                  </el-form-item>
                </div>

                <!-- Company Registration Number -->
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Company Registration Number"
                    prop="company_registration_number"
                  >
                    <el-input
                      v-model="formData.company_registration_number"
                      placeholder="Company registration number"
                    />
                  </el-form-item>
                </div>

                <!-- Company phone number -->
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Company Phone Number"
                    prop="company_phone_number"
                  >
                    <el-input
                      v-model="formData.company_phone_number"
                      placeholder="Company phone number"
                    />
                  </el-form-item>
                </div>

                <!-- Company email -->
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Company Email"
                    prop="company_email"
                  >
                    <el-input
                      v-model="formData.company_email"
                      placeholder="Company email"
                    />
                  </el-form-item>
                </div>

                <!-- House No. / Street -->
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="House No. / Street"
                    prop="house_number"
                  >
                    <el-input
                      v-model="formData.house_number"
                      placeholder="House no., Street"
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

                <!-- company website -->
                <div class="fieldrow">
                  <el-form-item
                    v-if="formData"
                    label="Comapny website"
                    prop="company_website"
                  >
                    <el-input
                      v-model="formData.company_website"
                      placeholder="Company website"
                    />
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
              <!-- Company Logo -->
              <div class="fieldrow">
                <p>Company Logo</p>
                <SingleFileUpload
                  id="company_logo"
                  iconClass="iconClass"
                  @getImage="getCompanyLogo"
                />
              </div>
              <p v-if="isCompanyLogoUploaded" class="text-warning">
                please upload Company Logo.
              </p>
            </div>

            <div class="comp_form_box add_dist_up w355">
              <!-- Certificate of Registration -->
              <div class="fieldrow">
                <p>Certificate of Registration</p>
                <SingleFileUpload
                  id="CertificateOfregistration"
                  iconClass="iconClass"
                  @getImage="getCertificateOfregistration"
                />
              </div>
              <p v-if="isRegistrationUploaded" class="text-warning">
                please upload Certificate of Registration.
              </p>
            </div>

            <!-- Certificate of Commencement -->
            <div class="comp_form_box add_dist_up w355">
              <div class="fieldrow">
                <p>Certificate of Commencement</p>
                <SingleFileUpload
                  id="CertificateOfCommencement"
                  iconClass="iconClass"
                  @getImage="getCertificateOfCommencement"
                />
              </div>
              <p v-if="isCommencementUploaded" class="text-warning">
                please upload Certificate of Commencement.
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
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
import { nameRule, numberRule, gpsCoordinatesRule } from "@/rules/all-rules";
import {
  createCompany,
  postCompanyLocation,
  getAllComapanyKyc,
  uploadCompanyDocument,
  createComapanyKyc,
} from "@/api/distributor/add-distributor.js";
import SingleFileUpload from "@/components/upload/SingleFileUpload.vue";
import GhanaPost from "@/assets/svg/ghanapost.svg";
import axios from "axios";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const router = useRouter();
const formRef = ref(null);
//loder
let loading = ref(false);

//validation values for certificate
const isRegistrationUploaded = ref(false);
const isCommencementUploaded = ref(false);
const isCompanyLogoUploaded = ref(false);

//store company
const storeComapnyId = ref([]);

//store certificateID
const certificateId = ref([]);

//store certificate id
const registrationCertificateId = ref("");
const commencementCertificateId = ref("");
const companyLogoId = ref("");

//created_CompanyID
const createdCompanyId = ref("");

//stop multiple api request
const waiteForResponse = ref(false);

//form data
const formData = reactive({
  name_of_bussiness: "",
  company_registration_number: "",
  company_phone_number: "",
  company_email: "",
  house_number: "",
  area: "",
  region: "",
  district: "",
  post_code: "",
  company_website: "",
  gps_address: "",
  companyLogo: "",
  certificate_of_registration: "",
  certificate_of_commencement: "",
});

//validation rules
const formValidationRules = reactive({
  name_of_bussiness: nameRule("bussiness name"),
  company_registration_number: nameRule("company registration number"),
  company_phone_number: nameRule("company phone number"),
  company_email: nameRule("company email"),
  house_number: nameRule("house number"),
  area: nameRule("the area"),
  region: nameRule("the region"),
  district: nameRule("the district"),
  post_code: numberRule("post code"),
  company_website: nameRule("company website"),
  gps_address: gpsCoordinatesRule("gps address"),
  // Add more validation rules as needed...
});

const getCompanyLogo = (image) => {
  if (image) {
    const notFindKyc = certificateId.value.find((id) => {
      if (id.document_name === "company_logo") {
        companyLogoId.value = id.id;
        return id.id;
      }
    });
    if (!notFindKyc) {
      const createKycData = {
        document_name: "company_logo",
        require_back_side: true,
        document_allowed_extension: ["jpg", "png"],
        max_document_size_in_mb: 5,
        document_rank: 0,
        regular_expression: {},
        is_active: true,
        is_optional: true,
      };
      createComapanyKyc(createKycData)
        .then((res) => {
          companyLogoId.value = res.data.id;
          getAllComapanyKyc().then((res) => {
            if (res.status == 200) {
              certificateId.value = res.data.items;
            }
          });
        })
        .catch((error) => {
          flashNotification("warning", `unable to create copany owner kyc`);
        });
    }
    formData.companyLogo = image;
    isCompanyLogoUploaded.value = false;
  } else {
    isCompanyLogoUploaded.value = true;
  }
};

//getCertificateOfregistration
const getCertificateOfregistration = (image) => {
  if (image) {
    const notFindKyc = certificateId.value.find((id) => {
      if (id.document_name === "certificate_of_registration") {
        registrationCertificateId.value = id.id;
        return id.id;
      }
    });
    if (!notFindKyc) {
      const createKycData = {
        document_name: "certificate_of_registration",
        require_back_side: true,
        document_allowed_extension: ["jpg", "png"],
        max_document_size_in_mb: 5,
        document_rank: 0,
        regular_expression: {},
        is_active: true,
        is_optional: true,
      };
      createComapanyKyc(createKycData)
        .then((res) => {
          registrationCertificateId.value = res.data.id;
          getAllComapanyKyc().then((res) => {
            if (res.status == 200) {
              certificateId.value = res.data.items;
            }
          });
        })
        .catch((error) => {
          flashNotification("warning", `unable to create copany owner kyc`);
        });
    }
    formData.certificate_of_registration = image;
    isRegistrationUploaded.value = false;
  } else {
    isRegistrationUploaded.value = true;
  }
};

//getCertificateOfCommencement
const getCertificateOfCommencement = (image) => {
  if (image) {
    const notFindKyc = certificateId.value.find((id) => {
      if (id.document_name === "certificate_of_commencement") {
        commencementCertificateId.value = id.id;
        return id.id;
      }
    });
    if (!notFindKyc) {
      const createKycData = {
        document_name: "certificate_of_commencement",
        require_back_side: true,
        document_allowed_extension: ["jpg", "png"],
        max_document_size_in_mb: 5,
        document_rank: 0,
        regular_expression: {},
        is_active: true,
        is_optional: true,
      };
      createComapanyKyc(createKycData)
        .then((res) => {
          commencementCertificateId.value = res.data.id;
          getAllComapanyKyc().then((res) => {
            if (res.status == 200) {
              certificateId.value = res.data.items;
            }
          });
        })
        .catch((error) => {
          flashNotification("warning", `unable to create copany owner kyc`);
        });
    }
    formData.certificate_of_commencement = image;
    isCommencementUploaded.value = false;
  } else {
    isCommencementUploaded.value = true;
  }
};

//check uploaded or not
const isCreatedCompany = ref(false);
const isUploadLocation = ref(false);
const isUploadDocument1 = ref(false);
const isUploadDocument2 = ref(false);

//call api with form data
const handleSave = () => {
  if (waiteForResponse.value) {
    return;
  }
  //checked all certificates uploaded or not...
  if (formData.companyLogo === "" && formRef.value && formRef.value.validate) {
    formRef.value.validate();
    isCompanyLogoUploaded.value = true;
  }
  if (
    formData.certificate_of_registration === "" &&
    formRef.value &&
    formRef.value.validate
  ) {
    formRef.value.validate();
    isRegistrationUploaded.value = true;
  }
  if (
    formData.certificate_of_commencement === "" &&
    formRef.value &&
    formRef.value.validate
  ) {
    formRef.value.validate();
    isCommencementUploaded.value = true;
    return;
  }
  //call api with the form data
  if (formRef.value && formRef.value.validate) {
    formRef.value.validate(async (valid) => {
      if (
        formData.certificate_of_registration !== "" &&
        formData.certificate_of_commencement !== "" &&
        valid
      ) {
        try {
          // Perform data submission logic here
          // createCompanyData
          const createCompanyData = {
            name: formData.name_of_bussiness,
            registration_no: formData.company_registration_number,
            type: "distributor",
            logo: "string",
            is_active: true,
            is_deleted: true,
            required_kyc_verification: true,
            is_kyc_auto_verified: false,
            is_kyc_completed: false,
            blocked: false,
            block_comment: {},
          };
          //waiteForResponse.value
          waiteForResponse.value = true;
          loading.value = true;
          createCompany(createCompanyData)
            .then((res) => {
              if (res.status === 201) {
                isCreatedCompany.value = true;
                createdCompanyId.value = res.data.id;
                //stored id in session storage
                sessionStorage.setItem("company_id", res.data.id);
                //post company  location
                const company_location_data = {
                  post_code_id: null,
                  company_id: createdCompanyId.value,
                  zone_id: null,
                  location_type: "headquarter",
                  is_verified: false,
                  contact: null,
                  location_name: formData.gps_code,
                  longitude: 0,
                  latitude: 0,
                  region: formData.region,
                  district: formData.district,
                  area: formData.area,
                  street: formData.house_number,
                  post_code: formData.post_code,
                  is_active: true,
                };
                //post location
                isUploadLocation.value = true;
                // postCompanyLocation(company_location_data)
                //   .then((res) => {
                //     if (res.status === 201) {
                //       isUploadLocation.value = true;
                //       sessionStorage.setItem(
                //         "company_location_id",
                //         res.data.id
                //       );
                //     }
                //   })
                //   .catch((error) => {
                //     waiteForResponse.value = false;
                //     loading.value = false;
                //     if (error.response.status === 400) {
                //       flashNotification(
                //         "warning",
                //         `Company location is alredy exists`
                //       );
                //     } else {
                //       flashNotification(
                //         "warning",
                //         `error is: ${error.response.status}`
                //       );
                //     }
                //   });

                const registrationDocParams = {
                  id: createdCompanyId.value,
                  document_type: registrationCertificateId.value,
                };
                //upload documents
                uploadCompanyDocument(
                  registrationDocParams,
                  createdCompanyId.value
                )
                  .then((res) => {
                    if (res.status === 201) {
                      //upload certificate
                      axios
                        .put(res.data.front_document_url, "abc.jpg")
                        .then((uploadResponse) => {
                          // Handle successful upload
                          if (uploadResponse.status === 200) {
                            isUploadDocument1.value = true;
                          }
                        })
                        .catch((error) => {
                          waiteForResponse.value = false;
                          loading.value = false;
                          // Handle upload error
                          flashNotification(
                            "warning",
                            `Unable to upload Certificate of Registration`
                          );
                        });
                    }
                  })
                  .catch((error) => {
                    waiteForResponse.value = false;
                    loading.value = false;
                    flashNotification(
                      "warning",
                      `Unable to upload Certificate of Registration`
                    );
                  });

                // second document........................................................

                //upload documents of

                const commencementDocParams = {
                  id: createdCompanyId.value,
                  document_type: commencementCertificateId.value,
                };
                uploadCompanyDocument(
                  commencementDocParams,
                  createdCompanyId.value
                )
                  .then((res) => {
                    if (res.status === 201) {
                      //upload certificate
                      axios
                        .put(res.data.front_document_url, "abc.jpg")
                        .then((uploadResponse) => {
                          // Handle successful upload
                          if (uploadResponse.status === 200) {
                            isUploadDocument2.value = true;
                          }
                        })
                        .catch((error) => {
                          waiteForResponse.value = false;
                          loading.value = false;
                          // Handle upload error
                          flashNotification(
                            "warning",
                            `Unable to upload Certificate of Commencement`
                          );
                        });
                    }
                  })
                  .catch((error) => {
                    waiteForResponse.value = false;
                    loading.value = false;
                    flashNotification(
                      "warning",
                      `Unable to upload Certificate of Commencement`
                    );
                  });
              }
            })
            .catch((error) => {
              waiteForResponse.value = false;
              loading.value = false;
              if (error.response.status === 400) {
                flashNotification(
                  "warning",
                  `company registration number is alredy exists`
                );
              } else {
                flashNotification("warning", `${error.response.error_message}`);
              }
            });
        } catch (error) {
          waiteForResponse.value = false;
          loading.value = false;
          flashNotification("error", "An error occurred. Please try again.");
        }
      } else {
        flashNotification("warning", "Please fill required fields");
      }
    });
  }
};

watch(
  [isCreatedCompany, isUploadLocation, isUploadDocument1, isUploadDocument2],
  () => {
    // redirect console
    if (
      isCreatedCompany.value == true &&
      isUploadLocation.value == true &&
      isUploadDocument1.value == true &&
      isUploadDocument2.value == true
    ) {
      //redirect fron next page
      if (router.b_details) {
        delete router.b_details;
        router.push(`/distributor/distributor-${"undefined"}`);
      } else {
        let r = "insurence-details";
        router.push(`${r}`);
      }
      flashNotification("success", "Business details added successfully");
      loading.value = false;
    }
  }
);

function handleCancel() {
  if (router.b_details) {
    delete router.b_details;
    router.push(`/distributor/distributor-${"undefined"}`);
  } else {
    router.push("/onboarding");
  }
}

//onMounted called
onMounted(async () => {
  navStore.setBreadCrumbs("Distributor / Add distributor");
  if (router.b_details) {
    Object.assign(formData, router.b_details);
    navStore.setBreadCrumbs("Distributor / Edit distributor");
  }
  await getAllComapanyKyc()
    .then((res) => {
      if (res.status == 200) {
        certificateId.value = res.data.items;
      }
    })
    .catch((error) => {
      flashNotification(
        "warning",
        "Your session has expired. Please loged In again"
      );
    });
});

// definePageMeta({
//   layout: "default",
// });
</script>

<style scoped lang="scss">
.comp_inner .comp_form_box .fieldrow {
  margin-bottom: 25px;
}

.comp_inner .comp_form_box p {
  font-size: 16px;
}
</style>
