<template>
    <section class="login_wrap">
     <h1>Support</h1>
    </section>
</template>
    
    
<script setup>
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

onMounted(() => {
navStore.setBreadCrumbs('Support')
})

definePageMeta({
    layout: "default",
});

</script>
    
    
    