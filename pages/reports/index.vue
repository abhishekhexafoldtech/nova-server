<template>
    <section class="login_wrap">
        <h1>Reports</h1>
    </section>
</template>
    
    
<script setup>
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

onMounted(() => {
    navStore.setBreadCrumbs('Reports')
})

definePageMeta({
    layout: "default",
});
</script>

<style scoped lang="scss">
.login_wrap {
    min-height: calc(100vh - 75px);
}
</style>
    
    
    