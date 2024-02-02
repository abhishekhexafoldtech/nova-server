<template>
  <section class="login_wrap">
    <div class="login_inner">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="login_left">
            <div class="login_form">
              <img class="logo" src="@/assets/nova_logo2.png" />
              <Login @handleSubmit="handleSubmit" :eyePassword="eyePassword">
                <template #default>
                  <IconsEye class="view_pass" :eye="eyePassword" @click="
                eyePassword == 'true'
                    ? (eyePassword = 'false')
                    : (eyePassword = 'true')
                " />
                </template>
              </Login>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="login_right">
            <img src="@/assets/img/sign-in-password.png" />
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
  
  
<script setup>
import IconsEye from "@/components/icons/Eye.vue"
import { useAuthStore } from "@/stores/authStore"
import { flashNotification } from "@/composables/useNotification.js";
import {ref} from "vue";
import Login from "~/components/Login.vue";
const AuthStore = useAuthStore()
const eyePassword = ref("false");

const handleSubmit = (formData) => {
  if (formData.id && formData.password) {
    let loginObj = {}
    const phonePattern =  /^\d{9}$/;
    if(phonePattern.test(formData.id)){
      loginObj.phone = `+233${formData.id}`
    }else{
      loginObj.email = formData.id;
    }
    loginObj.password = formData.password;
    AuthStore.Login({...loginObj}).then((res) => {
        const router = useRouter();
        router.push("/dashboards");
        loginObj = {};
    })
    .catch(error => {
          flashNotification("warning",error?.response?.data?.error_message || "Something went wrong please try again later");
    })
    .finally(() => {
      // Todo
    })
  }
}
definePageMeta({
  layout: "",
});
</script>
  
  
 
    

























































<!-- <template>
  <div>
    <div class="maincontainer bg-light">
      <div>
        <div class="signinform">

          <div class="container">
            <div class="login-form">
              <center><img src="@/assets/nova_logo.png" /></center>
              <br />
              <h3>Sign In</h3>
              <br />
              <small>Enter your email and password to sign in</small>
              <br />
              <br />


              <form>

              </form>




              <el-form
                ref="formDataRef"
                :model="formData"
                :rules="loginRules"
                auto-complete="on"
                label-position="top"
              >
                <el-form-item label="Email/Phone number" prop="userName">
                  <el-input
                    autocomplete="off"
                    v-model="formData.userName"
                    placeholder="Email/Phone number"
                  ></el-input>
                </el-form-item>

                <el-form-item label="Password" prop="password">
                  <el-input
                    type="password"
                    v-model="formData.password"
                    placeholder="Password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>

                <NuxtLink to="/forgot-password"
                  ><p class="forgot-pass-txt">Forgot password</p>
                </NuxtLink>
                <NuxtLink to="/dashboards"
                  ><el-button
                    class="login-btn"
                    type="primary"
                    @click="handleLogin"
                    >Sign in</el-button
                  >
                </NuxtLink>
              </el-form>
            </div>
          </div>

        </div>
      </div>
      <div>
        <div
          class="image p-5"
          style="
            background: linear-gradient(
              124deg,
              rgba(122, 165, 191, 0.6) -1.8%,
              rgba(69, 105, 135, 0.6) 105.23%
            );
          "
        >
          <img
            src="@/assets/img/sign-in-password.png"
            width="580"
            style="margin-top: 5rem"
          />
        </div>
      </div>
    </div>
  </div>
</template> -->

<!-- 
<script setup>
let formData = reactive({
  userName: null,
  password: null,
});

const loginRules = reactive({
  userName: [
    {
      required: true,
      message: "Please enter the correct user name",
      trigger: "blur",
    },
  ],

  password: [
    {
      required: true,
      message: "The password can not be less than 6 digits",
      trigger: "blur",
    },
  ],
});

function handleLogin() {
  console.log("form data", formData);
  formData.validate((valid) => {
    if (valid) {
      // Form is valid, perform further actions
      console.log("form data", formData);
    } else {
      // Form is invalid, handle error cases
      console("something wrong");
    }
  });
}

definePageMeta({
  layout: "",
});
</script> -->


<!-- <style scoped>
.login-right {
  margin: 10px;
  border-radius: 10px !important;
  background: linear-gradient(
    124deg,
    rgba(122, 165, 191, 0.6) -1.8%,
    rgba(69, 105, 135, 0.6) 105.23%
  );
}
</style> -->
  