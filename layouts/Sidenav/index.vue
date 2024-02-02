<template>
  <aside id="sidenav-main" class="sidenav navbar navbar-vertical navbar-expand-xs"
    :class="`fixed-start ${navStore.sidenavType}`">
    <div class="sidenav-header">
      <!-- <i
        id="iconSidenav"
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
      ></i> -->
      <NuxtLink class="navbar-brand" to="/dashboards">
        <img src="../../assets/newgas_logo.png" class="navbar-brand-img big_logo" alt="main_logo" />
        <img src="../../assets/newgas_logo_small.png" class="navbar-brand-img small_logo" alt="main_logo" />

        <!-- <span class="ms-2 font-weight-bold h6" :class="navStore.sidenavType === 'bg-default bg-transparent' && 'text-white'
          "></span> -->
      </NuxtLink>
      <NuxtLink class="nav_admin" to="">
        Super Admin
      </NuxtLink>
    </div>

    <SidenavList />

    <div class="bootom_nav">
      <div class="bn_left" @click.prevent="router.push({ path: '/user' })">
        <figure class="online">
          <img src="../../assets/img/team-2.jpg" alt="">
        </figure>
        <div class="bn_left_con">
          <h5>Yew Graham</h5>
          <p>yewgraham@gmail.com</p>
        </div>
      </div>
      <NuxtLink id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" :class="`setting_btn ${showProfile ? 'show' : ''}`" @click="showProfile = !showProfile">
        <i class="ri-more-2-fill"></i>
      </NuxtLink>
      <ul class="dropdown-menu sidemenu_account" aria-labelledby="dropdownMenuButton" :class="showProfile ? 'show' : ''">
        <li @click.prevent="router.push({ path: '/user' })">
          <i class="fas fa-user"></i>
          <span>My Profile</span>
        </li>
        <li @click="logout()">
          <i class="ni ni-user-run"></i>
          <span>Logout</span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import SidenavList from "./SidenavList.vue";
import { useAuthStore } from "@/stores/authStore"
import { useNavStore } from "@/stores/NavStore";
import { useRouter } from "vue-router";
const router = useRouter();
const navStore = useNavStore();
const AuthStore = useAuthStore()
const showProfile = ref(false);

function logout() {
    AuthStore.LogOut().then(() => {
      navigateTo('/login')
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {

    })
}


</script>
