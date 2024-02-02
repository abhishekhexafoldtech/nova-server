<template>
    <div class="container-area">
      <div class="cd_header">
        <div class="header_inner">
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305"
            alt="Profile"
          />
          <div class="h_right">
            <div class="h_name">
              <h4>MG gas ltd</h4>
              <el-switch
              disabled
              v-model="value5"
              class="ml-2"
              inline-prompt
              style="--el-switch-on-color: #0A7B37; --el-switch-off-color: #ff4949"
              active-text="Active"
              inactive-text="In-active"
            />
            </div>
            <div class="h_info">
              <div>
                <p>Manufacturer name</p>
                <p>Manufacturer code:<span>101</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="cd_header_tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Company details" name="c_detail"></el-tab-pane>
            <el-tab-pane label="Manufacturer Product" name="m_product"></el-tab-pane>
            <el-tab-pane label="All Order" name="all_orders"></el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <!-- conditional rendering -->
      <h4 class="page_heading mt-4 mb-3">{{ tableName }}</h4>
      <div>
        <ManufacturerDetails v-if="activeName === 'c_detail'" />
        <ManufacturerProduct v-if="activeName === 'm_product'" />       
        <ManufacturerAllOrder v-if="activeName === 'all_orders'" />       
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";  
  import ManufacturerDetails from "@/components/manufacturer/ManufacturerDetails.vue";
  import ManufacturerProduct from "@/components/manufacturer/ManufacturerProduct.vue";
  import ManufacturerAllOrder from "@/components/manufacturer/ManufacturerAllOrder.vue";
  
  const activeName = ref("c_detail");
  const tableName = ref("");
  const value5 = ref(true);

  //change component after calling
  const handleClick = (tab, event) => {
    activeName.value=tab.props.name
    };
  </script>
  