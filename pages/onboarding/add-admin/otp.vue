<template>
  <div>
    <EmailAndPhoneOtp @emailAndPhoneOtp="handleOtpSubmit" @resendPhone="handleResendPhoneOtp" @resendEmail="handleResendEmailOtp"  :isOtpNotCurrected="isOtpNotCurrected"/>
    
    <!-- dialog  -->
    <el-dialog
      v-model="dialogVisible"
      @close="closeDialog"
      title="Admin added successfully"
      center
      class="rounded-3 shadow fw-bold w-75 w-md-30"
    >
      <div class="d-flex justify-content-center">
        <img :src="admin_mail" alt="Mail" />
      </div>
      <span>
        Admin has been added successfully. Do you want to send the temporary login credentials or do you want to continue with onboarding
      </span>

      <template #footer>
        <span class="dialog-footer d-flex">
          <div class="col-6">
            <button class="btn border border-primary w-75" @click="handleSendCredWithEmail">
                Send email
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-primary w-100" @click="handleWithOnboarding" >
              Continue onboarding
            </button>
          </div>
        </span>
      </template>
    </el-dialog>
</div>

</template>

<script setup>
import { ref,reactive, onMounted } from "vue";
import { getOtp, verifyOtp } from "@/api/admin-opt.js"
import { adminSendCred } from "@/api/admin-send-creds.js"
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
import admin_mail from "@/assets/svg/admin_mail.svg"
import EmailAndPhoneOtp from '@/components/otp/EmailAndPhoneOtp.vue';
import { useNavStore } from "@/stores/NavStore";

const navStore = useNavStore();
const router = useRouter();
const dialogVisible = ref(false);
const isOtpNotCurrected=ref(false);
let adminPhone = "";
let adminEmail = "";

let senCred = reactive({
  "id": null,
  "email": null,
  "password": "Admin@123"
})

const closeDialog = () => {
  dialogVisible.value = false;
};


 //Call this function for resend OTP
function resendOtp(){ 
  handleGetOtp()
}

//provide child component function from the parent component
provide('resendOtp',resendOtp) 


// continue as onboarding
const handleWithOnboarding = () => {
  dialogVisible.value = false;
  // router.push("/onboarding/complete-onboarding");
  // let r = "add-admin/complete-onboarding";
  router.push(`complete-onboarding_${senCred.id}`);
};


// send cred. over email
const handleSendCredWithEmail = () => {
  adminSendCred(senCred.id, senCred).then((response) => {
    router.push("/onboarding");
  })
  .catch((err) => {
    console.log("error is", err)
  })
  dialogVisible.value = false;
  router.push("/onboarding");
};


// function for submit otp of email and mobile
function handleOtpSubmit(mobile,email) {
  let dataPost = {
    "purpose": "signup",
    "country_code": "+233",
    "phone": adminPhone,
    "phone_otp": mobile,
    "email": adminEmail,
    "email_otp": email
    }
    verifyOtp(dataPost).then((response) => {
      if(response.status == 200) {
        senCred.id = response.data.data.id
        senCred.email = response.data.data.email
        flashNotification("success", "verify Sucessfully");
        dialogVisible.value = true;
      } else {
        flashNotification("warning", "Something went wrong");
      }
  })
  .catch((err) => {
    console.log('error is', err.response.data)
    flashNotification("warning", err.response.data.error_message);
  })
}

// function for getting otp when this page append
function handleGetOtp() {
  let dataPost = {
    "country_code": "+233",
    "phone_number": adminPhone,
    "email": adminEmail
  }
  getOtp(dataPost).then(() => {
    console.log('ok')
  })
}

function handleResendPhoneOtp(){
  let dataPost = {
    "country_code": "+233",
    "phone_number": adminPhone,
  }
  getOtp(dataPost).then(() => {
    console.log('ok')
  })
};

function handleResendEmailOtp(){
  let dataPost = {
    "email": adminEmail
  }
  getOtp(dataPost).then(() => {
    console.log('ok')
  })
}


onMounted(() => {
  navStore.setBreadCrumbs('Orboarding / Add-admin / OTP')
  if(router.admin_data){
    adminPhone =  router.admin_data.phone,
    adminEmail =  router.admin_data.email
  }
  handleGetOtp();
})

</script>

<style>
.otp-page {
  height: 100vh;
}
</style>


