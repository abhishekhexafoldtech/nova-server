<template>
  <div>
    <section class="edit_mang_wrap">
      <div class="mang_inner">
        <div class="mang_title mb-3">
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
          <p class="form_text">
            <nuxt-link to="">Didn't receive OTP code?</nuxt-link> 
            <span v-show="resendTimer.phone != 0">
              Resend in {{ minutes.phone }}:{{ seconds.phone < 10 ? "0" + seconds.phone : seconds.phone }}
            </span>
            <span
              style="cursor: pointer"
              @click="resendOtpPhone"
              class="text-danger"
              v-show="resendTimer.phone === 0"
              > Resend</span
            >
          </p>
          <p v-if="isOtpNotCurrected" class="text-danger">Error! Incorrect OTP entered</p>
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

          <p class="form_text">
            <nuxt-link>Didn't receive OTP code?</nuxt-link> 
            <span v-show="resendTimer.email != 0">
              Resend in {{ minutes.email }}:{{ seconds.email < 10 ? "0" + seconds.email : seconds.email }}
            </span>
            <span
              style="cursor: pointer"
              @click="resendOtpEmail"
              class="text-danger"
              v-show="resendTimer.email === 0"
              > Resend</span
            >
          </p>
        </div>
        <div class="otp_footer">
          <button
            :disabled="!isOtpComplete" class="btn btn-primary"
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
import {  ref,  reactive,  computed,  onMounted,  onBeforeUnmount,  nextTick,} from "vue";
const mobileOtp = reactive(["", "", "", "", "", ""]); // Array to hold mobile OTP values
const emailOtp = reactive(["", "", "", "", "", ""]); // Array to hold email OTP values
const resendTimer = ref(
  {
    phone:60,
    email:60
  }
); // Timer for OTP resend (initially set to 60 seconds)
const minutes = ref(
  {
    phone:0,
    email:0
  }
); // Remaining minutes
const seconds = ref({
  phone:0,
  email:0
}); // Remaining seconds
let resendIntervalIdPhone = null;
let resendIntervalIdEmail = null; // Interval ID for the resend timer
const mobileOtpInput = ref();
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

//here checks all 
const isOtpComplete = computed(() => {
  return (
    mobileOtp.every((value) => value !== "") &&
    emailOtp.every((value) => value !== "")
  );
});

//accept only number and string
const sanitizeInput = (input) => {
  return input.replace(/[^a-zA-Z0-9]/g, '');
};


const onMobileOtpInput = (index) => {
  mobileOtp[index] = sanitizeInput(mobileOtp[index]).slice(0, 1);

  if (mobileOtp[index] !== "") {
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


const onEmailOtpInput = (index) => {
  emailOtp[index] = sanitizeInput(emailOtp[index]).slice(0, 1);

  if (emailOtp[index] !== "") {
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
}

//resend otp
const resendOtpPhone = (event) => {
  event.stopPropagation();
  for (let i = 0; i < mobileOtp.length; i++) {
    mobileOtp[i] = "";
  }

  startResendTimer('phone');
  emit("resendPhone");
  console.log("resendphone")
  CallParentResendOtpFun()
  
};

const resendOtpEmail = (event) => {
  event.stopPropagation();

  for (let i = 0; i < emailOtp.length; i++) {
    emailOtp[i] = "";
  }

  startResendTimer('email');
  emit("resendEmail")
  CallParentResendOtpFun()
  
};

//post data child to parent component using emmits
const handleVerifyData = () => {
  const mobileOtpValue = mobileOtp.join("");
  const emailOtpValue = emailOtp.join("");
  emit("emailAndPhoneOtp", mobileOtpValue, emailOtpValue);
};
//timer 
const startResendTimer = (data) => {
  console.log("mounted resend otp compoenent")
  if(data != 'email'){
    console.log("mounted resend otp compoenent phone")
    resendTimer.value.phone = 60;
    minutes.value.phone = Math.floor(resendTimer.value.phone / 60);
    seconds.value.phone = resendTimer.value.phone % 60;
    resendIntervalIdPhone = setInterval(() => {
      resendTimer.value.phone--;
      minutes.value.phone = Math.floor(resendTimer.value.phone / 60);
      seconds.value.phone = resendTimer.value.phone % 60;
  
      if (resendTimer.value.phone === 0) {
        clearInterval(resendIntervalIdPhone);
      }
    }, 1000);
  }
  if(data !='phone'){
    resendTimer.value.email = 60;
    minutes.value.email = Math.floor(resendTimer.value.email / 60);
    seconds.value.email = resendTimer.value.email % 60;
    resendIntervalIdEmail = setInterval(() => {
      resendTimer.value.email--;
      minutes.value.email = Math.floor(resendTimer.value.email / 60);
      seconds.value.email = resendTimer.value.email % 60;
  
      if (resendTimer.value.email === 0) {
        clearInterval(resendIntervalIdEmail);
      }
    }, 1000);
  }

};

onMounted(() => {
  startResendTimer();
});

onBeforeUnmount(() => {
  clearInterval(resendIntervalIdEmail);
  clearInterval(resendIntervalIdPhone);
});
</script>

<style>
.otp-page {
  height: 100vh;
}
</style>
