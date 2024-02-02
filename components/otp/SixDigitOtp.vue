<template>
    <div class="otp_wrap">
        <div class="fieldrow">
            <el-input v-for="(value, index) in otp" :key="index" ref="otpInput" v-model="otp[index]"
                @input="onOtpInput(index)" maxlength="1" @keydown="onOtpKeyDown(index, $event)" />
        </div>
        <p class="form_text">
            <a href="">Don't receive OTP code?  </a>
            <span v-if="otpCountDown > 0" class="otp_resend-count">Resend in {{ otpCountDown }}s</span>
            <span class="text-danger cursor-pointer" v-if="otpCountDown == 0" @click="startResendTimer">Resend</span>
        </p>
    </div>
</template>

<script setup>
const otpInput = ref();
const otpCountDown = ref(60);
let resendCoundDown = null;
const emit = defineEmits()
let otp = reactive(["", "", "", "", "", ""]);
const onOtpInput = (index) => {
    if (otp[index] != "") {
        for (let i = index + 1; i <= 5; i++) {
            if (otp[i] == "") {
                nextTick(() => {
                    otpInput.value[i].input.focus()
                })
                return
            }
        }
    }
};
const onOtpKeyDown = (index, event) => {
    if (event.key === "Enter") {
        emit("handleOtpEnter")
    }
    if (event.key === "Backspace" && index >= 0) {
        if (index > 0 && otp[index] === "") {
            otp[index - 1] = "";
            nextTick(() => {
                otpInput.value[index - 1].input.focus();
            });
        }
    }
};
watch(otp, () => {
    emit("handleOtp", otp.join(""));
});
const startResendTimer = () => {
    otpInput.value[0].input.focus();
    for (let i in otp) {
        otp[i] = "";
    }
    emit("handleOtpResend")
    otpCountDown.value = 60;
    resendCoundDown = setInterval(() => {
        otpCountDown.value -= 1;
        if (otpCountDown.value == 0) {
            clearInterval(resendCoundDown)
        }
    }, 1000);
}
onMounted(() => {
    startResendTimer();
    console.log("mounted")
});
onBeforeUnmount(() => {
    clearInterval(resendCoundDown)
})
</script>

<style scoped lang="scss">
.fiel_row {
    display: flex;
    gap: 10px;

    .el-input {
        max-width: 64px;
        height: 48px;
        font-size: 16px;
    }


}

.otp_resend {
    margin-top: 1rem;

    p {
        color: #8392AB;
    }

    &-count {
        color: black;
    }
}
</style>