<template>
    <form class="form_inner" @submit.prevent="">
        <h3>Sign In</h3>
        <p>Enter your email and password to sign in</p>
        <div class="fieldrow">
            <input v-if="formData" type="text" class="form_input" :class="formData.id ? 'has_value' : ''"
                v-model="formData.id" required />
            <label class="form_label">Email / Phone Number</label>
        </div>
        <div class="fieldrow">
            <input v-if="formData" :type="eyePassword == 'true' ? 'text' : 'password'" class="form_input password"
                :class="formData.password ? 'has_value' : ''" v-model="formData.password" required />
            <label class="form_label">Password</label>
            <slot name="default"></slot>
        </div>
        <div class="fieldrow text-right">
            <NuxtLink to="/forgot-password">Forgot password</NuxtLink>
        </div>
        <div class="fieldrow">
            <button class="btn w-100 btn-primary" @click="handleSubmit">
                Sign In
            </button>
        </div>
    </form>
</template>

<script>
import {reactive } from "vue";
export default {
    methods:{
        handleSubmit(){
            this.$emit('handleSubmit',this.formData);
        },
    },
    setup() {
        const formData = reactive({
            id: null,
            password: null
        });
        return {
            formData,
        }
    },
    props:{
        eyePassword : {
            type : Boolean,
            required:true,
            default : false
        },
    }
}
</script>
