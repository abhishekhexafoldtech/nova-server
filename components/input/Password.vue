<template>
    <div class="password">
        <el-input :type="!passwordVisible ? 'password' : 'text'" v-model="password" :placeholder="placeholder"
            ref="inputFocus" @keydown="handleKeydown($event)" />
        <i class="fa fa-eye" aria-hidden="true" v-if="passwordVisible" @click="handlePasswordVisibility"></i>
        <i class="fa fa-eye-slash" aria-hidden="true" v-if="!passwordVisible" @click="handlePasswordVisibility"></i>
    </div>
</template>

<script setup>
const passwordVisible = ref(false);
const inputFocus = ref();
const password = ref("");
const emit = defineEmits();
const props = defineProps({
    placeholder: {
        required: true,
        type: String,
        default: "Password"
    },
    focus: {
        type: Boolean,
        required: false,
        default: false
    }
})
function handlePasswordVisibility() {
    passwordVisible.value = !passwordVisible.value
};
function handleKeydown(event) {
    if (event.key == "Enter") {
        emit("handleEnter")
    }
}
function handleClear() {
    password.value = "";
}
watch(password, () => {
    emit("handlePassword", password.value);
});
onMounted(() => {
    if (props.focus) {
        inputFocus.value.input.focus();
    }
})
defineExpose({
    handleClear
})
</script>

<style scoped lang="scss">
.password {
    display: inline-block;
    width: 100%;
    position: relative;

    .el-input {
        height: 48px;
        max-width: 100%;
        margin: 0.2rem 0;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        color: #495057;
        margin-bottom: 25px;
    }

    .fa {
        position: absolute;
        right: 15px;
        top: 19px;
        color: #8392AB;
        cursor: pointer;
    }
}
</style>