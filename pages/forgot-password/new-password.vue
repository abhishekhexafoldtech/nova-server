<template>
  <section class="login_wrap">
    <div class="login_inner">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="login_left">
            <div class="login_form">
              <img class="logo" src="@/assets/nova_logo2.png" />
              <form class="form_inner" @submit.prevent="">
                <h3>Create new password</h3>
                <p>Your new password must be different from previous password</p>
                <div class="fieldrow">
                  <input 
                    :type="eyeNewPassword == 'true' ? 'text' : 'password'" 
                    class="form_input password" 
                    :class="form.password ?  'has_value' : ''" 
                    v-model="form.password"
                    minlength="8" 
                    required 
                  />
                  <label class="form_label">New password</label>
                  <IconsEye class="view_pass" :eye="eyeNewPassword"
                    @click="eyeNewPassword == 'true' ? eyeNewPassword = 'false' : eyeNewPassword = 'true'" />
                </div>
                <small v-if="!passwordMatch || !password > 8">Must be atleast 8 characters which contain both number and special charecter</small>
                <div class="fieldrow">
                  <input 
                    :type="eyeConfirmPassword == 'true' ? 'text' : 'password'" 
                    class="form_input password"
                    :class="form.confirmpassword ?  'has_value' : ''" 
                    v-model="form.confirmpassword" 
                  />
                  <label class="form_label">Confirm password</label>
                  <IconsEye class="view_pass" :eye="eyeConfirmPassword"
                    @click="eyeConfirmPassword == 'true' ? eyeConfirmPassword = 'false' : eyeConfirmPassword = 'true'" />
                </div>
                <small :class="passwordMatch ? 'text-success' : 'text-danger'">{{ passwordMatchContent }}</small>
                <div class="fieldrow">
                  <button class="btn w-100 btn-primary" @click="handleSubmit">Next</button>
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
import IconsEye from "@/components/icons/Eye.vue";
const form = reactive({
  password: null,
  confirmpassword: null
})
const passwordMatch = ref(false);
const eyeNewPassword = ref("false");
const eyeConfirmPassword = ref("false")
const passwordMatchContent = ref("Both passwords must match");
watch(form, () => {
  console.log(form)
  if (form.password === form.confirmpassword && form.password) {
    passwordMatch.value = true;
  } else {
    passwordMatch.value = false;
  }
  passwordMatch.value ? passwordMatchContent.value = "Both passwords are matched" : 'Both passwords must match'
});
const handleSubmit = () => {
  if (passwordMatch && form.password.length >= 8) {
    const router = useRouter();
    router.push("/dashboards")
  }
}
definePageMeta({
  layout: "",
});
</script>


  
 
    