<template>
  <div id="app-layout" :class="[isCollapsed && 'g-sidenav-hidden']">
    <div class="header_wrap"  />
    <Sidenav />
    <main class="main-content position-relative max-height-vh-100 h-100">
      <Navbar />
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidenav from "@/layouts/Sidenav";
import Navbar from "@/layouts/Navbar";

import { useNavStore } from "@/stores/NavStore";
import setTooltip from "@/assets/js/tooltip";

const navStore = useNavStore();
const isCollapsed = computed(() => {
  return navStore.isSidenavCollapsed;
});

</script>
