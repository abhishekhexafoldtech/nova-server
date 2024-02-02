<template>
  <div id="sidenav-collapse-main" class="collapse navbar-collapse">
    <ul class="navbar-nav">
      <li class="nav-item">
        <SidenavItem to="/dashboards" text="Dashboards" :icon-img="iconImgDashboard" icon="ri-dashboard-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/distributor" text="Distributor" :icon-img="iconImgDistributor" icon="ri-group-2-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/customers" text="Customers" :icon-img="iconImgCustomer" icon="ri-group-line" />
      </li>
      <!-- <li class="nav-item">
        <SidenavItem to="/delivery" text="Delivery Agents" :icon-img="iconImgDeliveryAgent" icon="ri-truck-line" />
      </li> -->
      <li class="nav-item">
        <SidenavItem to="/manufacturer" text="Manufacturer" :icon-img="iconImgManufacture" icon="ri-truck-line" />
      </li>
    </ul>

    <h4 class="menu_title">Analytics</h4>
    <ul class="navbar-nav">
      <li class="nav-item">
        <SidenavItem to="/reports" text="Reports" :icon-img="iconImgReport" icon="ri-file-chart-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/transactions" text="Transactions" :icon-img="iconImgTransaction" icon="ri-secure-payment-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/inventory-stock" text="Inventory & Stock" :icon-img="iconInventoryStock" icon="ri-secure-payment-line" />
      </li>
    </ul>

    <h4 class="menu_title">Manage</h4>
    <ul class="navbar-nav">
      <li class="nav-item">
        <SidenavItem to="/product" text="Products" :icon-img="iconImgProduct" icon="ri-shopping-bag-3-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/orders" text="Orders" :icon-img="iconImgOrders" icon="ri-shopping-bag-3-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/deliveries" text="Deliveries" :icon-img="iconImgDelivery" icon="ri-shopping-bag-3-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/zones" text="Zones" :icon-img="iconImgZone" icon="ri-map-pin-5-line" />
      </li>
      <li class="nav-item">
        <SidenavItem to="/units" text="Units" :icon-img="iconImgUnit" icon="ri-map-pin-5-line" />
      </li>
      <li class="nav-item">
        <SidenavCollapse collapse-ref="dashboardsExamples" nav-text="Support System"
          :class="getRoute === 'support-system' ? 'active' : ''" :icon-img="iconImgCollapseSupportSystem"
          icon="ri-group-2-line">
          <template #list>
            <ul class="sub_menu">
              <SidenavItem to="/support" text="Default" :icon-img="iconImgDefault" icon="ri-group-2-line" />
            </ul>
          </template>
        </SidenavCollapse>
      </li>
    </ul>

    <h4 class="menu_title">Super Admin</h4>
    <ul class="navbar-nav">
      <li class="nav-item">
        <SidenavItem to="/onboarding" text="Manage Admins" :icon-img="iconImgAdmin" icon="ri-shield-user-line" />
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