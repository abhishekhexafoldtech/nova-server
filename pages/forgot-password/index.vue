<template>
  <section class="login_wrap">
    <div class="login_inner">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="login_left">
            <div class="login_form">
              <img class="logo" src="@/assets/nova_logo2.png" />
              <form class="form_inner" @submit.prevent="handleSubmit">
                <h3>Forgot Password</h3>
                <p>Please enter your phone number to receive a verification code</p>
                <div class="fieldrow">
                  <input 
                  type="text" 
                  class="form_input" 
                  :class="form.mobileNo ?  'has_value' : ''" 
                  v-model="form.mobileNo" 
                  required />
                  <label class="form_label">Phone Number</label>
                </div>
                <small v-if="!allowNext && inputPlaceHolder">Please provide registered mobile number</small>
                <div class="fieldrow">
                  <button class="btn w-100 btn-primary" @click="handleSubmit">
                    Next
                  </button>
                </div>
                <div class="fieldrow">
                  <NuxtLink to="/login"><u>Back to sign in</u></NuxtLink>
                </div>
              </form>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="login_right">
            <img src="@/assets/img/forgot.png" />
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>


<script setup>
const form = reactive({
  mobileNo: null
})
const allowNext = ref(true);
const handleSubmit = () => {
  if (!form.mobileNo) {
    return;
  }
  console.log("submited")
  const router = useRouter();
  router.push("/forgot-password/otp")
};
watch(form, () => {
  if (form.mobileNo === "") {
    allowNext.value = true;
    console.log(allowNext);
  }
});
definePageMeta({
  layout: "",
});
</script>
  