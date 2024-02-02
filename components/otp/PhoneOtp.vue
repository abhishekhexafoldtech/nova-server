<template>
  <div>
    <section class="edit_mang_wrap">
      <div class="mang_inner">
        <div class="mang_title">
          <h3>{{ title }}</h3>
        </div>
        <div class="otp_wrap">
          <p class="form_text">
            Please enter the 6-digit OTP sent to the phone number
          </p>
          <div class="fieldrow">
            <el-input
              v-for="(value, index) in mobileOtp"
              :key="index"
              ref="mobileOtpInput"
              v-model="mobileOtp[index]"
              maxlength="1"
              @input="onMobileOtpInput(index)"
              @keydown="onMobileOtpKeyDown(index, $event)"
            ></el-input>
          </div>
          <p v-if="isOtpNotCurrected" class="text-danger">Error! Incorrect OTP entered</p>
          <p class="form_text">
            <nuxt-link to="/">Didn't receive OTP code?</nuxt-link> Resend in
            {{ minutes }}:{{ seconds < 10 ? "0" + seconds : seconds }}
            <span
              style="cursor: pointer"
              @click="resendOtp"
              class="text-danger"
              v-show="resendTimer === 0"
              >Resend</span
            >
          </p>
        </div>
        <div class="otp_footer">
          <button
          class="btn btn-primary"
            :disabled="!isOtpComplete"
            type="primary"
            @click="handleVerifyData"
          >
            Verify & Proceed
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {  ref,  reactive,  computed,  onMounted,  onBeforeUnmount,  nextTick,  defineEmits,  defineProps,} from "vue";
const emit = defineEmits();
let mobileOtp = reactive(["", "", "", "", "", ""]); // Array to hold mobile OTP values
const resendTimer = ref(60); // Timer for OTP resend (initially set to 60 seconds)
const minutes = ref(0); // Remaining minutes
const seconds = ref(0); // Remaining seconds
let resendIntervalId = null; // Interval ID for the resend timer
const mobileOtpInput = ref();
const CallParentResendOtpFun=inject('resendOtp')

const props = defineProps({
  title: {
    default: "OTP Verification",
    type: String,
  },
  isOtpNotCurrected:{
    type: Boolean,
    default: false,
  }
});

const isOtpComplete = computed(() => {
  return mobileOtp.every((value) => value !== "");
});

//otp input box take only number and character
const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9]/g, '');
};
const onMobileOtpInput = (index) => {
  const sanitizedInput = sanitizeInput(mobileOtp[index]);
  mobileOtp[index] = sanitizedInput.slice(0, 1);

  if (sanitizedInput !== "") {
    if (index < 5) {
      nextTick(() => {
        mobileOtpInput.value[index + 1].input.focus();
      });
    }
  }
};


const onMobileOtpKeyDown = (index, event) => {
  if (event.key === "Backspace" && index >= 0) {
    if (index > 0 && mobileOtp[index] === "") {
      // Clear the previous OTP value
      mobileOtp[index - 1] = "";
      nextTick(() => {
        mobileOtpInput.value[index - 1].input.focus();
      });
    }
  }
};
//resend otp
const resendOtp = (event) => {
  event.stopPropagation();

  for (let i = 0; i < mobileOtp.length; i++) {
    mobileOtp[i] = "";
  }

  startResendTimer();
  CallParentResendOtpFun()
};

//varify otp
const handleVerifyData = () => {
  const mobileOtpValue = mobileOtp.join("");
  emit("getMobileOtpData", mobileOtpValue);
};

const startResendTimer = (e) => {  
  resendTimer.value = 60;
  minutes.value = Math.floor(resendTimer.value / 60);
  seconds.value = resendTimer.value % 60;

  resendIntervalId = setInterval(() => {
    resendTimer.value--;
    minutes.value = Math.floor(resendTimer.value / 60);
    seconds.value = resendTimer.value % 60;
    if (resendTimer.value === 0) {
      clearInterval(resendIntervalId);
    }
  }, 1000);
};

onMounted(() => {
  startResendTimer();
});

onBeforeUnmount(() => {
  clearInterval(resendIntervalId);
});
</script>

<style>
.otp-page {
  height: 100vh;
}
</style>
