<template>
  <div>
    <EmailAndPhoneOtp
      id="otpComponent"
      @emailAndPhoneOtp="emailAndPhoneOtp"
      :isOtpNotCurrected="isOtpNotCurrected"
    />
  </div>
</template>

<script setup>
import EmailAndPhoneOtp from "~/components/otp/EmailAndPhoneOtp.vue";
import { flashNotification } from "@/composables/useNotification.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { sendOtp, verifyOtp } from "@/api/distributor/add-distributor";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

var router = useRouter();
const isOtpNotCurrected = ref(false); //if otp not currect in that case we can show their error message

//stop multiple api request
const waiteForResponse = ref(false);

// onMount calles
onMounted(() => {
  if (router.distributor_otp_data) {
    const sendOtpParams = {
      country_code: router.distributor_otp_data.country_code,
      phone_number: router.distributor_otp_data.phone.slice(4),
      email: router.distributor_otp_data.email,
    };
    handleGetOtp(sendOtpParams);
  }
});

const handleGetOtp = (sendOtpParams) => {
  sendOtp(sendOtpParams)
    .then((res) => {
      // console.log("response-", res);
    })
    .catch((er) => {
      flashNotification("warning", `Unable to the send OTP`);
    });
};
// emit functions
//get otp data
function emailAndPhoneOtp(phoneOtp, emailOtp) {
  if (waiteForResponse.value) {
    return;
  }
  const verifyData = {
    purpose: "signup",
    country_code: router.distributor_otp_data.country_code,
    phone: router.distributor_otp_data.phone.slice(4),
    phone_otp: phoneOtp,
    email: router.distributor_otp_data.email,
    email_otp: emailOtp,
  };
  //verify otp

  verifyOtp(verifyData)
    .then((res) => {
      if (res.status === 200) {
        isOtpNotCurrected.value = false;
        flashNotification("success", "Verify Successfully");
        router.push("/distributor/add-distributor/national-id");
      }
    })
    .catch((error) => {
      waiteForResponse.value = false;
      if (error.response.status === 400) {
        if (error.response.data.error_message.includes("OTP expired")) {
          flashNotification("warning", `Otp expired please resend otp`);
        } else if (error.response.data.error_message.includes("sms")) {
          isOtpNotCurrected.value = true; //incase otp is wrong we set value true and show error their
          flashNotification("warning", `Please enter valid sms otp`);
        } else if (error.response.data.error_message.includes("email")) {
          isOtpNotCurrected.value = true;
          flashNotification("warning", `Please enter valid email otp`);
        } else {
          flashNotification("warning", "Something went wrong");
        }
      }
    });
}

//call here resend otp api
function resendOtp() {
  console.log("Resend OTP:");
  if (router.distributor_otp_data) {
    const sendOtpParams = {
      country_code: router.distributor_otp_data.country_code,
      phone_number: router.distributor_otp_data.phone.slice(4),
      email: router.distributor_otp_data.email,
    };
    handleGetOtp(sendOtpParams);
  }
}

// /onMount
onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Add distributor");
});

//provide child component function from the parent component
provide("resendOtp", resendOtp);
</script>
