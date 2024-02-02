<template>
  <nav aria-label="breadcrumb" class="me-5">
    <h6>
      <i class="ri-home-4-line"></i> 
      <span v-if="nonActiveRoute" class="non-active"> / {{ nonActiveRoute }} </span>
      <span v-if="activeRoute" class="active">
        / {{ activeRoute }}
      </span>
    </h6>
  </nav>
</template>

<script setup>
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
const nonActiveRoute = ref("");
defineProps({
  currentPage: {
    type: String,
    default: "Default",
  },
  currentDirectory: {
    type: String,
    default: "Dashboard",
  },
  isRTL: {
    type: Boolean,
    default: false,
  },
});

const activeRoute = computed(() => {
  const breadCrumb = navStore.breadCrumb.split("/");
  if (breadCrumb.length > 1) {
    const lastOne = breadCrumb.pop();
    const join = breadCrumb.join("/");
    nonActiveRoute.value = join;
    return lastOne;
  }
  nonActiveRoute.value = ""
  return breadCrumb[0];
});
</script>

<style>
.non-active{
  font-weight: 400;
  font-size: 16px;
  color: #00000099;
  position: relative;
  top:1.8px;
}
.active{
  color : #000000;
  font-weight: 400;
  font-size: 16px;
  position: relative;
  top:2px;
}
</style>
