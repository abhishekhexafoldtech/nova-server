<template>
  <div id="sidenav-collapse-main" class="collapse navbar-collapse">
    <ul class="navbar-nav">
      <li class="nav-item">
        <SidenavItem to="/dashboards" text="Dashboards" :icon-img="iconImgDashboard" icon="ri-dashboard-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/distributor" text="Distributor" :icon-img="iconImgDistributor" icon="ri-group-2-line" />
      </li>
      
    </ul>



    

   
  </div>
</template>
<script setup>
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
import SidenavItem from "./SidenavItem.vue";
import { useNavStore } from "@/stores/NavStore";
import { useAuthStore } from "@/stores/authStore"
const AuthStore = useAuthStore()
const navStore = useNavStore();

import iconImgDashboard from '@/assets/svg/dashboard_home_icon.svg'
import iconImgDistributor from '@/assets/svg/distributor_dashboard_icon.svg'
import iconImgCollapseSupportSystem from '@/assets/svg/support_system_dashboard_icon.svg'
import iconImgDefault from '@/assets/svg/support_system_dashboard_icon.svg'
import iconImgCustomer from '@/assets/svg/customer_dashboard_icon.svg'
import iconImgDeliveryAgent from '@/assets/svg/delivery_agent_dashboard_icon.svg'
import iconImgProduct from '@/assets/svg/products_dashboard_icon.svg'
import iconImgOrders from '@/assets/svg/orders_dashboard_icon.svg'
import iconImgAdmin from '@/assets/svg/manage_admin_dashboard_icon.svg'
import iconImgZone from '@/assets/svg/zone_icon.svg'
import iconImgDelivery from '@/assets/svg/deliveries_navIcon.svg'
import iconImgUnit from '@/assets/svg/unit_icon.svg'
import iconImgTransaction from '@/assets/svg/transaction_dashboard_icon.svg'
import iconImgReport from '@/assets/svg/report_admin_dashboard_icon.svg'
import iconImgSettings from '@/assets/svg/settings_dashboard_icon.svg'
import iconImgManufacture from '@/assets/svg/manfacture.svg'
import iconInventoryStock from '@/assets/svg/inventory-stock.svg'

const sidenavType = computed(() => {
  return navStore.sidenavType === "bg-white" ? "text-dark" : "text-white";
});
const getRoute = computed(() => {
  const route = useRoute();
  return route.path.split("/")[1];
});
defineProps({
  isRTL: {
    type: Boolean,
    default: false,
  },
});

function getUserInfo() {
  AuthStore.pageLoadedORRefreshed().then(() => {
     
  })
}

onMounted(() => {
  getUserInfo()
   
})

</script>