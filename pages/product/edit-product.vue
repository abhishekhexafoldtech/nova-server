<template>
    <section class="edit_mang_wrap">
      <div class="mang_inner add_admin pb-1 mb-4">
        <div class="mang_title">
          <h3>Edit Product Details</h3>
          <p>Edit details of product.</p>
        </div>
        <el-form label-position="top" label-width="100px" :model="formData" :rules="formValidationRules" ref="formRef"
          @submit.prevent="" v-if="formData">
          <el-row :gutter="50">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="fieldrow">
                <el-form-item label="Product Name" prop="product_name">
                  <el-input v-model="formData.product_name" placeholder="Product Name" />
                </el-form-item>
              </div>
              <div class="fieldrow">
                <el-form-item label="Product Subcategory" prop="product_subcategory">
                  <el-select v-model="formData.product_subcategory" filterable placeholder="Select Product Subcategory">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="fieldrow big_textarea">
                <el-form-item label="Description" prop="desc">
                  <el-input v-model="formData.desc" type="textarea" placeholder="Description" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <div class="perm_footer">
            <button class="btn btn-default" @click="handleCancel">Cancel</button>
            <button class="btn btn-primary" @click.prevent="handleSave">Save</button>
        </div>
        </el-form>
      </div>
    </section>
  </template>
  <script setup>
  import { reactive, onMounted } from "vue";
  import { nameRule, selectBoxRule } from "@/rules/all-rules";
  import Table from "@/components/tables/Table.vue";
  import { useRouter } from "vue-router";
  import { flashNotification } from "@/composables/useNotification.js";
  import { useNavStore } from "@/stores/NavStore";
  const navStore = useNavStore();
  const router = useRouter();
  
  //form data
  const formData = reactive({
    product_name: "",
    desc: "",
  });
  const options = [
    {
      value: "Option1",
      label: "Option1",
    },
    {
      value: "Option2",
      label: "Option2",
    },
    {
      value: "Option3",
      label: "Option3",
    },
    {
      value: "Option4",
      label: "Option4",
    },
    {
      value: "Option5",
      label: "Option5",
    },
  ];
  
 
  
  //validation rules
  const formValidationRules = reactive({
    product_name: nameRule("product name"),
    desc: nameRule("description"),
    product_subcategory: selectBoxRule(""),
  });
  
  //call api with form data
  const handleSave = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === null || value === undefined) {
        flashNotification("warning", "Please fill all the fields");
        return false;
      }
  
      // Check for an empty object
      if (typeof value === "object" && Object.keys(value).length === 0) {
        flashNotification("warning", "Please fill all the fields");
        return false;
      }
  
      // Check for an empty string
      if (typeof value === "string" && value.trim() === "") {
        flashNotification("warning", "Please fill all the fields");
        return false;
      }
  
      // Check for false
      if (value === false) {
        flashNotification("warning", "Please fill all the fields");
        return false;
      }
    }
  
    flashNotification("success", `${formData.product_name} details requested.`);
    // router.push("/product");
  };
  
  const handleCancel = () => {
    router?.push("/product/product-details");
  };
  

  
  onMounted(() => {
    navStore.setBreadCrumbs('Product / Add-product')
  })
  </script>
    
  <style scoped lang="scss">
  .edit_mang_wrap .mang_inner {
    min-height: auto;
  }
  
  .fieldrow {
    margin-bottom: 25px;
  }
  
  .all_heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    padding-bottom: 20px;
  
    .page_heading {
      padding-top: 10px;
    }
  
    button {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      padding: 8px 20px;
      padding-bottom: 6px;
      gap: 8px;
    }
  }
  
  .edit_mang_wrap .mang_inner .perm_footer {
    margin-top: 50px;
  
    button {
      height: 41px;
      padding: 8px;
    }
  }
  </style>
    