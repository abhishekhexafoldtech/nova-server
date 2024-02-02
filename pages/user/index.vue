<template>
  <!-- <div class="container-area">
    <h4 class="page_heading">Profile</h4>
    <div class="prof_card">
      <figure>
        <img src="@/assets/img/blank_profile.png" alt="">
        <el-button class="edit_prof">
          <i class="fa fa-pencil"></i>
        </el-button>
      </figure>
      <div class="prof_con">
        <h4>Yaw graham</h4>
        <p>Admin</p>
      </div>
    </div>
    <div class="table_header">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Profile Details" name="profile">
          <div class="prof_form">
            <Profile />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Address" name="address">
          <el-card>
            address
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Reset password" name="password">
          <div class="prof_form">
            <ResetPassword 
              v-if="resetPasswardVisibility"
              @getChildFormData="handleResetPasswordChildFormData($event)"
            />
            <Otp 
            v-if="otpVisibility"
            @getChildFormData="handleOtpdChildFormData($event)"
            />
           <NewPassword 
            v-if="newPasswordVisibility"
           />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Request KYC updation" name="kyc">
          <div class="prof_form">
            <KycUpdate @handleKyc="handleKyc"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div> -->

  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <figure class="p_img">
          <img
            src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp"
            alt="Profile"
          />
          <button>
            <i class="fa fa-pen"></i>
          </button>
        </figure>
        <div class="h_right">
          <h4>Yaw Boafo</h4>
          <p>Customer</p>
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Personal details" name="personal_details">
          </el-tab-pane>
          <el-tab-pane label="Address" name="address"> </el-tab-pane>
          <el-tab-pane label="Reset password" name="reset_password">
          </el-tab-pane>
          <el-tab-pane label="Request KYC updation" name="request_KYC_updation">
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- table heading -->
    <h4 class="page_heading mt-4 mb-3">{{ tableName }}</h4>

    <UserDetails
      v-if="activeName === 'personal_details'"
      :admin="true"
      :admin_details="true"
      :heading="heading"
      :data="resetPasswordData.personalDetails"
    />

    <UserDetails
      v-if="activeName === 'address'"
      :admin="true"
      :right="false"
      :heading="heading"
      :admin_address="true"
      :data="resetPasswordData.adminAddress"
    />

    <UserDetails
      class="kyc_box"
      v-if="activeName === 'reset_password'"
      :admin="true"
      :right="false"
      :heading="resetPasswordData.heading"
    >
      <template #leftpart1>
        <p class="sub_text">{{ resetPasswordData.description }}</p>
        <el-form @submit.prevent="handleResetPassword">
          <el-input
            class="form_input"
            placeholder="Phone number"
            type="number"
            v-model="resetPasswordData.phoneNumber"
            size="9"
            v-if="resetPasswordTabMode==='phone'"
          />
          <SixDigitOtp
            v-if="resetPasswordTabMode==='otp'"
            @handleOtpEnter="handleResetPassword"
            @handleOtp="setOtp"
          />
          <div v-if="resetPasswordTabMode === 'password'">
            <InputPassword
              placeholder="Old password"
              :focus="true"
              @handlePassword="handleOldPassword"
              @handleEnter="handleResetPassword"
              ref="passwordOldClear"
            />
            <InputPassword
              placeholder="New password"
              @handlePassword="handleNewPassword"
              @handleEnter="handleResetPassword"
              ref="passwordNewClear"
            />
            <p class="small_text text-danger">
              Must be at least 8 characters and contain both number and special
              character
            </p>
            <InputPassword
              placeholder="Confirm password"
              @handlePassword="handleConfirmNewPassword"
              @handleEnter="handleResetPassword"
              ref="passwordConfirmClear"
            />
          </div>
          <el-button
            class="btn"
            type="primary"
            @click.prevent="handleResetPassword"
            :disabled="
              (resetPasswordData.mode === 'phone' &&
                resetPasswordData.phoneNumber.length != 9) ||
              (resetPasswordData.mode === 'otp' &&
                resetPasswordData.otp.length != 6) || apiRequestDisable
            "
            >{{ resetPasswordData.buttonText }}</el-button
          >
        </el-form>
      </template>
    </UserDetails>

    <UserDetails
      class="kyc_box"
      v-if="activeName === 'request_KYC_updation'"
      :admin="true"
      :heading="heading"
      :right="false"
    >
      <template #leftpart1>
        <p class="upd_text mt-5 mb-4">
          To update your KYC details, You can raise a request to your super
          admin
        </p>
        <p class="upd_text">Please mention the details you want to update</p>
        <el-form @submit.prevent="handleSubmitKyc">
          <el-input
            type="textarea"
            class="mt-2"
            :rows="5"
            v-model="resetPasswordData.kycUpdateText"
          />
          <div class="button_normal">
            <button class="btn btn-default" @click.prevent="handleCancelKyc">
              Cancel
            </button>
            <button
              class="btn btn-primary text-white"
              @click.prevent="handleSubmitKyc"
              :disabled="!resetPasswordData.kycUpdateText.length"
            >
              Send request
            </button>
          </div>
        </el-form>
      </template>
    </UserDetails>

    <DialogStatus
      dialogTitle="Password reset successfully"
      :dialogVisible="dialogVisible"
      :dialogImage="successImage"
      width="350"
      dialogText="Please sign in with the new password"
      rightButtonName="Continue"
      @dialogVisible="dialogVisible = false"
      @handleRightButton="handleSuccessPopup"
    />
  </div>
</template>


<script setup>
import UserDetails from "@/components/userpanel/CustomerDetail.vue";
import SixDigitOtp from "@/components/otp/SixDigitOtp.vue";
import InputPassword from "@/components/input/Password.vue";
import DialogStatus from "@/components/Dialog/Status.vue";
import successImage from "@/assets/svg/success.svg";
import { useAuthStore } from "~/stores/authStore";
import { getAdminProfile, adminResetPassword } from "~/api/admin";
import { getOtp,verifyOtp } from "~/api/admin-opt";
const activeName = ref("reset_password");
const dialogVisible = ref(false);
const passwordOldClear = ref(null);
const passwordNewClear = ref(null);
const passwordConfirmClear = ref(null);
const adminProfile = ref({});
const heading = ref("Personal details");
const AuthStore = useAuthStore();
const router = useRouter();
const apiRequestDisable = ref(false);
const resetPasswordTabMode = ref("phone")
const resetPasswordData = reactive({
  description: "Please enter your phone number to receive a verification code",
  phoneNumber: "",
  heading: "Reset password",
  otp: "",
  buttonText: "Next",
  kycUpdateText: "",
  personalDetails: {
    "First name": "-",
    "Last name": "-",
    "Phone number":  "-",
    "Date of birth":  "-",
    "Email": "-",
  },
  adminAddress: {
    "House no., Street": "-",
    "District": "-",
    "Area": "-",
    "Post code": "-",
    "Region": "-",
    "GPS address": "-",
  },
});

function handleResetPassword() {
  if (resetPasswordTabMode.value === 'phone') {
    if (resetPasswordData.phoneNumber.length != 9) {
      flashNotification("warning", "Please provide a valide phone number.");
      return;
    }
   handleSendOtp();
  } else if (resetPasswordTabMode.value === "otp") {
    if (resetPasswordData.otp.length != 6) {
      flashNotification("warning", "Please enter a valid one time password.");
      return;
    }
    handleVerifyOtp();
  } else if (resetPasswordTabMode.value === "password") {
    if (
      !resetPasswordData.oldPassword?.length ||
      !resetPasswordData.newPassword?.length ||
      !resetPasswordData.confirmNewPassword?.length
      ) {
        flashNotification("warning", "Please fill all the details.");
      return;
    }
    if (resetPasswordData.newPassword != resetPasswordData.confirmNewPassword) {
      flashNotification("warning", "Password mismatch.");
      return;
    }
    handlePassword();
  }
}
function handleSendOtp(){
  apiRequestDisable.value = true;
   getOtp({
    "country_code":"+233",
    "phone_number": resetPasswordData.phoneNumber
   }).then((res)=>{
    if(res.status === 204){
      flashNotification("success","Otp sent to your mobile number.");
      resetPasswordTabMode.value = 'otp'
        apiRequestDisable.value = false;
    }
   }).catch((err)=>{
    flashNotification("error",err.response.data.error_message);
    apiRequestDisable.value = false;
   })
}
function handleVerifyOtp(){
  apiRequestDisable.value = true;
    verifyOtp({
  "purpose": "reset_pin",
  "country_code": "+233",
  "phone": resetPasswordData.phoneNumber,
  "phone_otp": "123456"
}).then((res)=>{
  if(res.status === 200){
    resetPasswordTabMode.value = 'password'
  }
}).catch((err)=>{
  flashNotification("error",(err.response.data.error_message.error_description ? err.response.data.error_message.error_description : err.response.data.error_message) );
  // remove after otp is working
  resetPasswordTabMode.value = 'password'
})
}
function handlePassword(){
  apiRequestDisable.value = true;
  adminResetPassword(AuthStore.user_info.id,{
    "old_password": resetPasswordData.oldPassword,
    "password": resetPasswordData.newPassword
  }).then((res)=>{
    if(res.status === 200){
      passwordOldClear.value.handleClear();
    passwordNewClear.value.handleClear();
    passwordConfirmClear.value.handleClear();
    dialogVisible.value = true;
    apiRequestDisable.value = false;
    resetPasswordTabMode.value = 'phone'
    }
  }).catch((err)=>{
    flashNotification("error",(err.response.data.error_message.error_description ? err.response.data.error_message.error_description : err.response.data.error_message) );
  })
}
function setOtp(otp) {
  resetPasswordData.otp = otp;
}
function handleOldPassword(password) {
  resetPasswordData.oldPassword = password;
}
function handleNewPassword(password) {
  resetPasswordData.newPassword = password;
}
function handleConfirmNewPassword(password) {
  resetPasswordData.confirmNewPassword = password;
  if(resetPasswordData.oldPassword.length>0 && (resetPasswordData.newPassword === resetPasswordData.confirmNewPassword)){
    apiRequestDisable.value = false;
  }else{
    apiRequestDisable.value = true;
  }
}
function handleSuccessPopup(data) {
  dialogVisible.value = false;
  if (data === "right") {
    activeName.value = "personal_details";
   resetPasswordTabMode.value === 'phone';
    apiRequestDisable.value = false;
  }
}
function handleCancelKyc() {
  if (resetPasswordData.kycUpdateText.length) {
    flashNotification("warning", "Entered data will be lost.");
    resetPasswordData.kycUpdateText = "";
  }
  activeName.value = "personal_details";
}
function handleSubmitKyc() {
  if (resetPasswordData.kycUpdateText.length) {
    flashNotification("success", "Your request submitted.");
    resetPasswordData.kycUpdateText = "";
    activeName.value = "personal_details";
    return;
  }
  flashNotification("warning", "Please provide details before requesting.");
}
watch(resetPasswordTabMode,()=>{
  if(resetPasswordTabMode.value === 'phone'){
    resetPasswordData.heading = 'Reset Password',
    resetPasswordData.description = 'Please enter your phone number to receive a verification code',
    resetPasswordData.buttonText = 'Next'
  }else if(resetPasswordTabMode.value === 'otp' ){
    resetPasswordData.heading = "Enter one-time password";
    resetPasswordData.description =
    "Please enter teh 6-digit one time password (OTP) sent to the phone";
  }else if(resetPasswordTabMode.value === 'password'){
    resetPasswordData.description =
    "Your new password must be different from previous password.";
    resetPasswordData.buttonText = "Continue";
    resetPasswordData.heading = "Enter new password";
  }
})
watch(activeName, () => {
  heading.value = activeName.value.split("_").join(" ");
  if (activeName === "update_KYC_details") {
    resetPasswordData.heading = "Request KYC updation";
  }
})
watch(adminProfile, () => {
  resetPasswordData.personalDetails = {
    "First name" : adminProfile.value?.first_name || "-",
    "Last name" : adminProfile.value?.last_name || "-",
    "Phone number": adminProfile.value?.phone.split("+233")[1] || "-",
    "Date of birth": adminProfile.value?.date_of_birth || "-",
    "Email": adminProfile.value?.email || "-",
  };
  resetPasswordData.adminAddress = {
    "House no., Street": `${adminProfile.value?.apartment ? adminProfile.value?.apartment : "-"} .,${adminProfile.value?.street ? adminProfile.value?.street : '-'}`,
    "District": adminProfile.value?.district || "-",
    "Area":  adminProfile.value?.area || "-",
    "Post code":  adminProfile.value?.post_code || "-",
    "Region": adminProfile.value?.region || "-",
    "GPS address": "-",
  }
  resetPasswordData.phoneNumber = adminProfile.value?.phone.split("+233")[1];
});
onMounted(() => {
  if(!AuthStore.user_info.id){
    router.push("/login");
    flashNotification("warning","Please login.");
    return;
  }
  getAdminProfile(AuthStore.user_info.id)
  .then((responce) => {
    if (responce.status == 200) {
      adminProfile.value = responce.data;
    }
      else{
        flashNotification("warning","Please try again later we are facing some server issue")
      }
    })
    .catch((error) => {
      flashNotification("error","Something went wrong please try again later.")
    });
  });
  definePageMeta({
    layout: "default",
});
</script>

<style scoped lang="scss">
.p_img {
  display: inline-block;
  vertical-align: middle;
  width: 110px;
  height: 110px;
  margin: 0;
  position: relative;

  img {
    border-radius: 0px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }

  button {
    position: absolute;
    bottom: -8px;
    right: -8px;
    background-color: var(--white);
    color: var(--violet);
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: none;
    font-size: 12px;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.08),
      0px 4px 4px 0px rgba(0, 0, 0, 0.08);
  }
}

.h_right {
  max-width: calc(100% - 110px);

  p {
    color: #7b809a;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    margin: 0;
  }
}

.el-input {
  max-width: 450px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: block;
}

.el-button {
  background: #5e72e4;
  width: 210px;
  height: 41px;
  margin: 35px 0;
  font-weight: 700;
  font-size: 14px;
}

.password {
  width: 450px;
}

.text-area {
  width: 455px;
  border: 1px solid #5e72e4;
  border-radius: 8px;
  overflow: hidden;
}

.button_normal {
  max-width: 450px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  margin-top: 50px;

  button {
    width: 210px;

    &:disabled {
      background-color: var(--menu-grey);
      color: var(--black);
    }
  }
}

.small_text {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  max-width: 450px;
}

.upd_text {
  color: var(--black);
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5px;
}
</style>