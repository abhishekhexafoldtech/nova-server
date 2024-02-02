<template>
  <div>
    <section class="edit_mang_wrap">
      <div class="mang_inner">
        <div class="mang_title">
          <h3>{{ title }}</h3>
        </div>
        <div class="otp_wrap">
          <p class="form_text">
            Please enter the 6-digit OTP sent to your email
          </p>

          <div class="fieldrow">
            <el-input
              v-for="(value, index) in emailOtp"
              :key="index"
              ref="emailOtpInput"
              v-model="emailOtp[index]"
              maxlength="1"
              @input="onEmailOtpInput(index)"
              @keydown="onEmailOtpKeyDown(index, $event)"
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
          <el-button
            :disabled="!isOtpComplete"
            type="primary"
            @click="handleVerifyData"
          >
            Verify & Proceed
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {  ref,  reactive,  computed,  onMounted,  onBeforeUnmount,  nextTick,  defineEmits,} from "vue";
const emailOtp = reactive(["", "", "", "", "", ""]); // Array to hold email OTP values
const resendTimer = ref(60); // Timer for OTP resend (initially set to 60 seconds)
const minutes = ref(0); // Remaining minutes
const seconds = ref(0); // Remaining seconds
let resendIntervalId = null; // Interval ID for the resend timer
const emailOtpInput = ref();
const emit = defineEmits();
const CallParentResendOtpFun=inject('resendOtp')

//props
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
  return emailOtp.every((value) => value !== "");
});

//otp input box take only number and character
const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9]/g, '');
};
//move next focus

const onEmailOtpInput = (index) => {
  const sanitizedInput = sanitizeInput(emailOtp[index]);
  emailOtp[index] = sanitizedInput.slice(0, 1);

  if (sanitizedInput !== "") {
    if (index < 5) {
      nextTick(() => {
        emailOtpInput.value[index + 1].input.focus();
      });
    }
  }
};

const onEmailOtpKeyDown = (index, event) => {
  if (event.key === "Backspace" && index >= 0) {
    if (index > 0 && emailOtp[index] === "") {
      // Clear the previous OTP value
      emailOtp[index - 1] = "";
      nextTick(() => {
        emailOtpInput.value[index - 1].input.focus();
      });
    }
  }
};

//resend otp
const resendOtp = (event) => {
  event.stopPropagation();

  for (let i = 0; i < emailOtp.length; i++) {
    emailOtp[i] = "";
  }

  startResendTimer();
  CallParentResendOtpFun()
};

//varify otp
const handleVerifyData = () => {
  const emailOtpValue = emailOtp.join("");
  emit("getEmailOtpData", emailOtpValue);
};

//timer 
const startResendTimer = () => {
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
    //timer will be called after mount
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
